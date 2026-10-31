import { readFileSync, writeFileSync } from "node:fs";
import { securityHeaders } from "../server/security-headers.js";

const vercelUrl = new URL("../vercel.json", import.meta.url);
const vercel = JSON.parse(readFileSync(vercelUrl, "utf8"));
vercel.headers = [{ source: "/(.*)", headers: Object.entries(securityHeaders).map(([key, value]) => ({ key, value })) }];
writeFileSync(vercelUrl, JSON.stringify(vercel, null, 2) + "\n");
writeFileSync(new URL("../public/_headers", import.meta.url), "/*\n" + Object.entries(securityHeaders).map(([key, value]) => `  ${key}: ${value}`).join("\n") + "\n");
writeFileSync(new URL("../public/.htaccess", import.meta.url), `# Deploy only the contents of dist/ to an Apache-compatible document root.
Options -Indexes
<IfModule mod_headers.c>
${Object.entries(securityHeaders).map(([key, value]) => `  Header always set ${key} "${value}"`).join("\n")}
</IfModule>
<FilesMatch "(?i)^(?:\\.env(?:\\..*)?|package(?:-lock)?\\.json|.*\\.map)$">
  Require all denied
</FilesMatch>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule (^|/)\\.(?!well-known/) - [F,L]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^api(?:/|$) - [R=404,L]
  RewriteRule ^ index.html [L]
</IfModule>
`);
console.log("Security headers synchronized for Vercel, Netlify and Apache.");
