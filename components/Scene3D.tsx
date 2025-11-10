import dynamic from "next/dynamic";

const Scene3DClient = dynamic(() => import("./Scene3D.client"), { ssr: false });

export default function Scene3D() {
  return <Scene3DClient />;
}