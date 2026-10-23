// Original Dark Veil-inspired folds with flowing aurora highlights.
// A few layered Bézier paths share the existing small canvas and animation clock.
// No shader, image download, additional render loop or dependency is needed.
export function drawVeilAurora(context, width, height, elapsed) {
  const t = elapsed * .00022;
  const drift = Math.sin(t) * .085;
  const sway = Math.sin(t * .73 + 1.2) * .075;

  const paths = [
    {
      width: .58, opacity: .86,
      colors: ["86, 31, 199", "153, 78, 246", "60, 136, 218"],
      start: [-.22 + drift, -.08],
      curves: [
        [.40 + drift, .10, -.12 + sway, .22, .26 + drift, .34],
        [.67 + sway, .47, .28 - drift, .57, -.08 + sway, .70],
        [-.34, .88, .27 + drift, 1.02, .79, 1.10],
      ],
    },
    {
      width: .32, opacity: .75,
      colors: ["79, 87, 230", "80, 188, 224", "131, 84, 231"],
      start: [1.23, -.10],
      curves: [
        [.48 + sway, .16, 1.29 - drift, .28, .90 - sway, .44],
        [.53 + drift, .59, .76 + sway, .72, 1.17, .83],
        [1.30, .98, .85, 1.04, .61, 1.18],
      ],
    },
    {
      width: .22, opacity: .50,
      colors: ["125, 93, 224", "152, 143, 237", "203, 95, 162"],
      start: [-.19, .54 + sway],
      curves: [
        [.22, .72 - drift, .44 + sway, .85, 1.17, .66 + drift],
        [1.23, .82, .77 - sway, 1.06, .20, 1.13],
      ],
    },
  ];

  context.save();
  context.globalCompositeOperation = "screen";
  context.lineCap = "round";
  context.lineJoin = "round";

  for (const ribbon of paths) {
    const glow = context.createLinearGradient(0, 0, width, height);
    glow.addColorStop(0, `rgba(${ribbon.colors[0]}, .10)`);
    glow.addColorStop(.24, `rgba(${ribbon.colors[0]}, .95)`);
    glow.addColorStop(.54, `rgba(${ribbon.colors[1]}, 1)`);
    glow.addColorStop(.82, `rgba(${ribbon.colors[2]}, .85)`);
    glow.addColorStop(1, `rgba(${ribbon.colors[2]}, .12)`);

    context.beginPath();
    context.moveTo(ribbon.start[0] * width, ribbon.start[1] * height);
    for (const curve of ribbon.curves) {
      context.bezierCurveTo(curve[0] * width, curve[1] * height,
        curve[2] * width, curve[3] * height, curve[4] * width, curve[5] * height);
    }
    context.strokeStyle = glow;
    // Wide translucent folds, then a narrower luminous seam. The surface's
    // single CSS blur blends the layers; no per-stroke shadow blur is required.
    for (const [spread, strength] of [[1.7, .055], [1.25, .08], [1, .13], [.72, .17], [.38, .24], [.13, .35], [.026, .46]]) {
      context.lineWidth = Math.max(1, width * ribbon.width * spread);
      context.globalAlpha = strength * ribbon.opacity;
      context.stroke();
    }
  }

  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  // A dark veil over the upper edge protects the introductory text. The
  // colored folds remain visible through the glass further down the form.
  const shade = context.createLinearGradient(0, 0, 0, height);
  shade.addColorStop(0, "rgba(4, 5, 12, .64)");
  shade.addColorStop(.23, "rgba(4, 5, 12, .08)");
  shade.addColorStop(.63, "rgba(4, 5, 12, 0)");
  shade.addColorStop(1, "rgba(4, 5, 12, .27)");
  context.fillStyle = shade;
  context.fillRect(0, 0, width, height);
  context.restore();
}
