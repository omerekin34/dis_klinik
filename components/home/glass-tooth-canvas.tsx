"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

export type ToothMode = "showcase" | "orbit";

type CanvasProps = {
  mode: ToothMode;
  onReady?: () => void;
  speedRef: RefObject<number>;
  activeRef: RefObject<number | null>;
  labelRefs: RefObject<(HTMLButtonElement | null)[]>;
};

const NODES = [
  { ring: 0, angle: 0.4 },
  { ring: 0, angle: 2.5 },
  { ring: 0, angle: 4.55 },
  { ring: 1, angle: 1.05 },
  { ring: 1, angle: 3.65 },
] as const;

const RINGS = [
  { radius: 0.92, speed: 0.17, tiltX: 1.05, tiltZ: 0.22, opacity: 0.72 },
  { radius: 1.16, speed: -0.11, tiltX: 0.62, tiltZ: -0.28, opacity: 0.5 },
  { radius: 1.36, speed: 0.06, tiltX: 1.22, tiltZ: 0.42, opacity: 0.28 },
] as const;

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function buildTooth() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.9);
  shape.bezierCurveTo(0.14, 0.9, 0.24, 1.12, 0.45, 1.12);
  shape.bezierCurveTo(0.72, 1.12, 0.9, 0.98, 0.9, 0.7);
  shape.bezierCurveTo(0.9, 0.42, 0.62, 0.1, 0.58, -0.22);
  shape.bezierCurveTo(0.55, -0.5, 0.56, -0.92, 0.5, -1.04);
  shape.bezierCurveTo(0.47, -1.1, 0.41, -1.1, 0.39, -1.02);
  shape.bezierCurveTo(0.35, -0.7, 0.3, -0.2, 0.2, -0.04);
  shape.bezierCurveTo(0.14, 0.04, -0.14, 0.04, -0.2, -0.04);
  shape.bezierCurveTo(-0.3, -0.2, -0.35, -0.7, -0.39, -1.02);
  shape.bezierCurveTo(-0.41, -1.1, -0.47, -1.1, -0.5, -1.04);
  shape.bezierCurveTo(-0.56, -0.92, -0.55, -0.5, -0.58, -0.22);
  shape.bezierCurveTo(-0.62, 0.1, -0.9, 0.42, -0.9, 0.7);
  shape.bezierCurveTo(-0.9, 0.98, -0.72, 1.12, -0.45, 1.12);
  shape.bezierCurveTo(-0.24, 1.12, -0.14, 0.9, 0, 0.9);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.05,
    bevelSegments: 10,
    curveSegments: 28,
  });
  geometry.scale(0.9, 0.9, 1);
  geometry.center();
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const position = geometry.attributes.position;
  const vertex = new THREE.Vector3();
  const minY = box?.min.y ?? -1;
  const height = box ? box.max.y - box.min.y : 2;

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);
    const yn = (vertex.y - minY) / height;
    const crown = smoothstep(0.46, 0.78, yn);
    const root = 1 - smoothstep(0.18, 0.55, yn);
    const sign = Math.sign(vertex.z) || 1;
    let z = Math.abs(vertex.z) * (0.72 + crown * 0.45 - root * 0.12);
    if (sign > 0) z += crown * 0.045;
    vertex.z = z * sign;
    vertex.x *= 1.04;
    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

const toothGeometry = buildTooth();

function ToothSculpture({
  mode,
  speedRef,
  reduce,
}: {
  mode: ToothMode;
  speedRef: RefObject<number>;
  reduce: boolean;
}) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const camera = state.camera;
    const showcase = mode === "showcase";
    const pace = reduce ? 0 : speedRef.current;
    const goalZ = showcase ? 4.55 : 6.35;
    const goalY = showcase ? 0.04 : 0.16;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, goalZ, 2.05, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, goalY, 2.05, delta);
    camera.lookAt(0, 0.02, 0);

    if (spin.current) {
      spin.current.rotation.y += delta * (showcase ? 0.38 : 0.2) * pace;
    }

    if (!tilt.current) return;
    const leanX = reduce ? 0.18 : 0.18 + pointer.current.y * -0.2;
    const leanZ = reduce ? 0 : pointer.current.x * 0.16;
    tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, leanX, 3.4, delta);
    tilt.current.rotation.z = THREE.MathUtils.damp(tilt.current.rotation.z, leanZ, 3.4, delta);

    const goalScale = showcase ? 1.22 : 0.68;
    const next = THREE.MathUtils.damp(tilt.current.scale.x, goalScale, 2.05, delta);
    tilt.current.scale.setScalar(next);
  });

  return (
    <group ref={tilt} scale={1.22}>
      <group ref={spin} rotation={[0, 0.28, 0]}>
        <mesh geometry={toothGeometry} scale={[0.48, 0.3, 0.36]} position={[0, 0.3, 0]}>
          <meshPhysicalMaterial
            color="#f4e4c4"
            roughness={0.4}
            metalness={0}
            transmission={0.42}
            thickness={0.4}
            ior={1.42}
            attenuationColor="#e6c27a"
            attenuationDistance={0.55}
            clearcoat={0.2}
            envMapIntensity={0.7}
          />
        </mesh>
        <mesh geometry={toothGeometry}>
          <meshPhysicalMaterial
            color="#fbf8f3"
            roughness={0.05}
            metalness={0}
            transmission={0.98}
            thickness={0.85}
            ior={1.48}
            attenuationColor="#f7f1e4"
            attenuationDistance={2.4}
            clearcoat={1}
            clearcoatRoughness={0.06}
            specularIntensity={1}
            envMapIntensity={1.15}
            iridescence={0.18}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 380]}
            sheen={0.28}
            sheenColor="#f3e7c8"
            sheenRoughness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function OrbitRig({
  mode,
  speedRef,
  activeRef,
  labelRefs,
  reduce,
}: {
  mode: ToothMode;
  speedRef: RefObject<number>;
  activeRef: RefObject<number | null>;
  labelRefs: RefObject<(HTMLButtonElement | null)[]>;
  reduce: boolean;
}) {
  const rings = useRef<(THREE.Group | null)[]>([]);
  const dots = useRef<(THREE.Mesh | null)[]>([]);
  const materials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const reveal = useRef(0);
  const world = useMemo(() => new THREE.Vector3(), []);
  const view = useMemo(() => new THREE.Vector3(), []);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const showing = mode === "orbit" && !reduce;
    reveal.current = THREE.MathUtils.damp(reveal.current, showing ? 1 : 0, 2.4, delta);
    const pace = reduce ? 0 : speedRef.current;

    if (light.current) {
      const t = state.clock.elapsedTime;
      light.current.position.set(Math.sin(t * 0.5) * 2.5, 1.05 + Math.sin(t * 0.32) * 0.35, Math.cos(t * 0.5) * 1.7 + 0.8);
      light.current.intensity = 14 + Math.sin(t * 0.8) * 3;
    }

    rings.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.y += delta * RINGS[index].speed * pace * (showing ? 1 : 0.35);
      const material = materials.current[index];
      if (material) material.opacity = RINGS[index].opacity * reveal.current;
    });

    const active = activeRef.current;
    dots.current.forEach((dot, index) => {
      if (!dot) return;
      const hovered = active === index;
      const scale = THREE.MathUtils.damp(dot.scale.x, hovered ? 1.7 : 1, 8, delta);
      dot.scale.setScalar(scale);
      const material = dot.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = THREE.MathUtils.damp(material.emissiveIntensity, hovered ? 2.6 : 0.55, 8, delta);

      const label = labelRefs.current[index];
      if (!label) return;
      if (reveal.current < 0.05) {
        label.style.opacity = "0";
        return;
      }

      dot.getWorldPosition(world);
      view.copy(world).applyMatrix4(state.camera.matrixWorldInverse);
      projected.copy(world).project(state.camera);
      const x = (projected.x * 0.5 + 0.5) * state.size.width;
      const y = (-projected.y * 0.5 + 0.5) * state.size.height;
      const dx = x - state.size.width / 2;
      const dy = y - state.size.height / 2;
      const reach = Math.hypot(dx, dy) || 1;
      const labelX = THREE.MathUtils.clamp(x + (dx / reach) * 18, 78, state.size.width - 78);
      const labelY = THREE.MathUtils.clamp(y + (dy / reach) * 14, 18, state.size.height - 18);
      const behind = view.z < -state.camera.position.z - 0.08;
      const fade = behind ? 0.28 : 1;
      label.style.transform = `translate3d(${labelX}px, ${labelY}px, 0) translate(-50%, -50%)`;
      label.style.opacity = String(reveal.current * fade);
      label.style.pointerEvents = behind ? "none" : "auto";
      label.style.zIndex = behind ? "1" : "4";
      label.dataset.side = x > state.size.width * 0.5 ? "left" : "right";
      label.dataset.v = y < state.size.height * 0.3 ? "below" : y > state.size.height * 0.7 ? "above" : "mid";
    });
  });

  return (
    <>
      <pointLight ref={light} color="#f3e0b0" intensity={14} distance={9} decay={2} />
      {RINGS.map((ring, ringIndex) => (
        <group
          key={ring.radius}
          ref={(node) => {
            rings.current[ringIndex] = node;
            if (node && node.userData.tilted !== true) {
              node.rotation.set(ring.tiltX, 0, ring.tiltZ);
              node.userData.tilted = true;
            }
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, ringIndex === 2 ? 0.0035 : 0.006, 12, 180]} />
            <meshBasicMaterial
              ref={(material) => {
                materials.current[ringIndex] = material;
              }}
              color="#e8d5a3"
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          {NODES.map((node, nodeIndex) =>
            node.ring === ringIndex ? (
              <group key={nodeIndex} rotation={[0, node.angle, 0]}>
                <mesh
                  ref={(mesh) => {
                    dots.current[nodeIndex] = mesh;
                  }}
                  position={[ring.radius, 0, 0]}
                  raycast={() => null}
                >
                  <sphereGeometry args={[0.026, 24, 24]} />
                  <meshStandardMaterial
                    color="#fff8ec"
                    emissive="#e8d5a3"
                    emissiveIntensity={0.55}
                    roughness={0.22}
                    metalness={0.45}
                  />
                </mesh>
              </group>
            ) : null,
          )}
        </group>
      ))}
    </>
  );
}

function Scene({ mode, speedRef, activeRef, labelRefs, onReady }: CanvasProps) {
  const reduce = useReducedMotion() ?? false;

  return (
    <>
      <ToothSculpture mode={mode} speedRef={speedRef} reduce={reduce} />
      <OrbitRig mode={mode} speedRef={speedRef} activeRef={activeRef} labelRefs={labelRefs} reduce={reduce} />
      <ambientLight intensity={0.35} color="#d5e2ee" />
      <spotLight position={[2.6, 3.4, 4.4]} angle={0.5} penumbra={0.9} intensity={28} color="#fff8ef" />
      <spotLight position={[-3.2, 1.2, -1.6]} angle={0.62} penumbra={1} intensity={18} color="#e8d5a3" />
      <directionalLight position={[0.4, -1.6, 2.8]} intensity={0.35} color="#f3e7c8" />
      <Environment resolution={256} frames={1} background={false} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={3.2} color="#fff8ef" position={[0, 2.2, 4]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#f0d59a" position={[-4, 1, 1]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#d4bc7d" position={[4, -0.4, -2]} scale={[2.4, 5, 1]} />
        <Lightformer form="ring" intensity={1.4} color="#fffaf2" position={[0, 3.2, -1]} scale={3.2} />
      </Environment>
      <Ready onReady={onReady} />
    </>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

export function GlassToothCanvas(props: CanvasProps) {
  const mobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  }, []);

  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
      dpr={mobile ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [0, 0.04, 4.55], fov: 28, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
        gl.domElement.style.background = "transparent";
      }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
