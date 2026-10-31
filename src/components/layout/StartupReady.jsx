import {useLayoutEffect} from 'react';
export default function StartupReady(){
  useLayoutEffect(()=>{window.__marinaroBoot?.mounted();},[]);
  return null;
}
