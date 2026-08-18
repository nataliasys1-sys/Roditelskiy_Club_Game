import { Html, Line } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { ReactNode } from "react";
import type { Vec3 } from "../../data/types";

export function TopicHotspot({
  id,
  label,
  position,
  active,
  hovered,
  detailLevel,
  onHover,
  onSelect,
  children,
}: {
  id: string;
  label: string;
  position: Vec3;
  active: boolean;
  hovered: boolean;
  detailLevel: "map" | "territory";
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  children: ReactNode;
}) {
  const pointed = active || hovered;
  const onClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(id);
  };

  return (
    <group
      position={position}
      onClick={detailLevel === "territory" ? onClick : undefined}
      onPointerOver={
        detailLevel === "territory"
          ? (event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              onHover(id);
            }
          : undefined
      }
      onPointerOut={
        detailLevel === "territory"
          ? () => {
              document.body.style.cursor = "auto";
              onHover(null);
            }
          : undefined
      }
    >
      <group scale={pointed && detailLevel === "territory" ? 1.08 : 1}>{children}</group>
      {detailLevel === "territory" && (
        <>
          <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.22, 0.3, 24]} />
            <meshStandardMaterial
              color="#f28a16"
              transparent
              opacity={pointed ? 0.55 : 0.16}
              emissive="#f28a16"
              emissiveIntensity={pointed ? 0.4 : 0.08}
              roughness={0.5}
            />
          </mesh>
          <Html
            position={[0, 0.92, 0]}
            center
            distanceFactor={4.6}
            zIndexRange={[8, 0]}
            occlude={false}
            style={{ pointerEvents: "none" }}
          >
            <div className={`zone-label${active ? " is-active" : ""}`}>{label}</div>
          </Html>
        </>
      )}
    </group>
  );
}

export function GlowPath({ points, visible }: { points: Vec3[]; visible: boolean }) {
  if (!visible || points.length < 2) return null;
  return (
    <Line
      points={points}
      color="#f28a16"
      lineWidth={2.5}
      transparent
      opacity={0.9}
    />
  );
}
