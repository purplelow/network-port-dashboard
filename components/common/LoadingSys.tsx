import { SuperBalls } from "@uiball/loaders";
import AlertAdminReq from "containers/management/systemmanage/fragment/AlertAdminReq";
import { useEffect } from "react";

export default function LoadingSys() {
  const { data }: any = AlertAdminReq;
  useEffect(() => {}, [data]);
  return (
    <div className="h-screen w-screen bg-slate-600 bg-opacity-50">
      <SuperBalls size={45} speed={1.4} color="black" />;
    </div>
  );
}
