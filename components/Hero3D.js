"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

function LaptopModel() {
  const group = useRef();
  const [drag, setDrag] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const reduceMotion = useReducedMotion();
  useFrame((_, delta) => {
    if (group.current && !drag && !reduceMotion) {
      group.current.rotation.y += (0.16 - group.current.rotation.y) * Math.min(1, delta * 0.7);
      group.current.rotation.y += Math.sin(Date.now() * 0.0004) * delta * 0.025;
    }
    if (group.current && drag) group.current.rotation.y += (rotation - group.current.rotation.y) * 0.18;
  });
  return <group ref={group} rotation={[-0.12, 0.16, 0]} onPointerDown={e => {e.stopPropagation();setDrag(true);setLastX(e.clientX);e.target.setPointerCapture?.(e.pointerId);}} onPointerMove={e => {if(drag){setRotation(r=>r+(e.clientX-lastX)*0.008);setLastX(e.clientX);}}} onPointerUp={() => setDrag(false)}>
    <mesh position={[0,0.12,-0.42]} rotation={[-0.12,0,0]}><boxGeometry args={[2.45,1.55,0.075]}/><meshStandardMaterial color="#182c32" metalness={0.8} roughness={0.25}/></mesh>
    <mesh position={[0,0.12,-0.375]} rotation={[-0.12,0,0]}><planeGeometry args={[2.22,1.32]}/><meshStandardMaterial color="#155b66" emissive="#e36414" emissiveIntensity={0.25} roughness={0.35}/></mesh>
    <mesh position={[0,-0.72,0.22]} rotation={[-0.12,0,0]}><boxGeometry args={[2.65,0.12,1.72]}/><meshStandardMaterial color="#c3d0cc" metalness={0.75} roughness={0.3}/></mesh>
    <mesh position={[0,-0.65,0.22]} rotation={[-0.12,0,0]}><boxGeometry args={[0.65,0.012,0.42]}/><meshStandardMaterial color="#71878a" metalness={0.5}/></mesh>
    {Array.from({length:5}).map((_,row)=>Array.from({length:13}).map((__,col)=><mesh key={`${row}-${col}`} position={[-1.08+col*0.18,-0.647,-0.25+row*0.14]}><boxGeometry args={[0.13,0.018,0.09]}/><meshStandardMaterial color="#52696d" metalness={0.3}/></mesh>))}
  </group>;
}
export default function Hero3D() {
  const reduceMotion = useReducedMotion();
  return <div className="hero-art" aria-label="Interactive three-dimensional laptop illustration" style={{touchAction:"pan-y"}}>
    <Canvas camera={{position:[0,0,4.8],fov:38}} dpr={[1,1.5]} fallback={<div className="laptop-3d"><div className="screen"/><div className="base"/></div>}>
      <Suspense fallback={null}><ambientLight intensity={1.2}/><directionalLight position={[3,4,5]} intensity={2}/><pointLight position={[-3,1,2]} color="#e36414" intensity={2}/><LaptopModel/></Suspense>
    </Canvas>
  </div>;
}
