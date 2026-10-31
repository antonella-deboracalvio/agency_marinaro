import {useEffect,useRef} from 'react';
import './StudioOrb.css';

const vertex=`attribute vec2 p;
varying vec2 uv;
void main(){uv=p;gl_Position=vec4(p,0.,1.);}`;
const fragment=`precision mediump float;
varying vec2 uv;
uniform float time;
void main(){
  float r=dot(uv,uv);
  if(r>1.)discard;
  float z=sqrt(1.-r);
  vec3 n=vec3(uv,z);
  float a=time*.16;
  vec3 surface=vec3(n.x*cos(a)+n.z*sin(a),n.y,-n.x*sin(a)+n.z*cos(a));
  float flow=.5+.5*sin(surface.x*3.5+surface.y*1.7+sin(surface.z*4.)*1.2);
  vec3 c=mix(vec3(.73,.62,.86),vec3(.87,.79,.95),smoothstep(.08,.92,flow));
  float pearl=pow(.5+.5*sin(surface.x*6.+surface.z*4.+surface.y),12.);
  c=mix(c,vec3(.93,.89,.97),pearl*.08);
  float light=.95+.05*max(dot(n,normalize(vec3(-.5,.65,1.))),0.);
  float shine=pow(max(dot(n,normalize(vec3(-.5,.65,1.))),0.),30.);
  gl_FragColor=vec4(c*light+shine*.025,1.-smoothstep(.98,1.,r));
}`;

export default function StudioOrb(){
  const root=useRef(null),canvas=useRef(null),gaze=useRef(null);
  useEffect(()=>{
    const el=root.current,c=canvas.current;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,visible=false,context,gl,program,buffer,timeUniform,last=0;
    let x=0,y=0,tx=0,ty=0;
    const shaders=[];
    try{
      context=c.getContext('webgl',{alpha:true,antialias:true});
      gl=context;
      if(gl){
        const compile=(type,source)=>{
          const shader=gl.createShader(type);
          shaders.push(shader);
          gl.shaderSource(shader,source);
          gl.compileShader(shader);
          if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('shader');
          return shader;
        };
        program=gl.createProgram();
        gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
        gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('link');
        gl.useProgram(program);
        buffer=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
        const p=gl.getAttribLocation(program,'p');
        gl.enableVertexAttribArray(p);
        gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
        timeUniform=gl.getUniformLocation(program,'time');
        c.width=c.height=240;
        gl.viewport(0,0,240,240);
        el.classList.add('studio-orb--ready');
      }
    }catch{gl=null;}
    function paint(now=0){
      if(gl){
        gl.uniform1f(timeUniform,media.matches?0:now*.001);
        gl.drawArrays(gl.TRIANGLES,0,6);
      }
      const ease=last?1-Math.exp(-Math.min(now-last,50)/120):1;
      last=now;
      x+=(tx-x)*ease;y+=(ty-y)*ease;
      if(gaze.current)gaze.current.style.transform=`translate(${x}px,${y}px)`;
      if(visible&&!document.hidden&&!media.matches)frame=requestAnimationFrame(paint);
    }
    function sync(){
      cancelAnimationFrame(frame);frame=0;last=0;
      if(media.matches)tx=ty=x=y=0;
      if(visible&&!document.hidden)paint();
    }
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();});
    io.observe(el);
    const move=e=>{
      if(!visible||media.matches)return;
      const r=el.getBoundingClientRect();
      const dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;
      const len=Math.hypot(dx,dy)||1,amount=Math.min(len/15,15);
      tx=dx/len*amount;ty=dy/len*amount*.7;
    };
    const reset=()=>{tx=ty=0;};
    const lost=e=>{e.preventDefault();gl=null;el.classList.remove('studio-orb--ready');};
    c.addEventListener('webglcontextlost',lost);
    window.addEventListener('pointermove',move,{passive:true});
    document.documentElement.addEventListener('pointerleave',reset);
    document.addEventListener('visibilitychange',sync);
    media.addEventListener('change',sync);
    return()=>{
      cancelAnimationFrame(frame);io.disconnect();
      c.removeEventListener('webglcontextlost',lost);
      window.removeEventListener('pointermove',move);
      document.documentElement.removeEventListener('pointerleave',reset);
      document.removeEventListener('visibilitychange',sync);
      media.removeEventListener('change',sync);
      el.classList.remove('studio-orb--ready');
      if(context){
        if(buffer)context.deleteBuffer(buffer);
        shaders.forEach(s=>context.deleteShader(s));
        if(program)context.deleteProgram(program);
      }
    };
  },[]);
  return <div className="studio-orb" ref={root} aria-hidden="true">
    <canvas ref={canvas}/>
    <div className="studio-orb__eyes" ref={gaze}><i/><i/></div>
  </div>;
}
