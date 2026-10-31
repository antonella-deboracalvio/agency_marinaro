export const normalize=q=>{const n=Math.hypot(...q)||1;return q.map(v=>v/n);};
export const multiply=(a,b)=>normalize([a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]]);
export const axisAngle=(axis,angle)=>{const n=Math.hypot(...axis)||1;const s=Math.sin(angle/2)/n;return [axis[0]*s,axis[1]*s,axis[2]*s,Math.cos(angle/2)];};
export const initialRotation=()=>multiply(axisAngle([1,0,0],-.36),axisAngle([0,1,0],-.5));
export function ballPoint(x,y,rect){const radius=Math.min(rect.width,rect.height)*.45;const px=(x-rect.left-rect.width/2)/radius,py=(y-rect.top-rect.height/2)/radius;const r=px*px+py*py;return r<=1?[px,py,Math.sqrt(1-r)]:[px/Math.sqrt(r),py/Math.sqrt(r),0];}
export function between(a,b){const cross=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=Math.max(-1,Math.min(1,a.reduce((s,v,i)=>s+v*b[i],0)));if(dot<-.99999){const axis=Math.abs(a[0])<.8?[0,-a[2],a[1]]:[-a[1],a[0],0];return axisAngle(axis,Math.PI);}return normalize([...cross,1+dot]);}
export function matrix(q){const [x,y,z,w]=normalize(q);return `matrix3d(${[1-2*(y*y+z*z),2*(x*y+z*w),2*(x*z-y*w),0,2*(x*y-z*w),1-2*(x*x+z*z),2*(y*z+x*w),0,2*(x*z+y*w),2*(y*z-x*w),1-2*(x*x+y*y),0,0,0,0,1].join(',')})`;}
