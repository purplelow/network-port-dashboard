import { useEffect } from "react";

export default function useKeyEscClose(closeThing: any) {
  useEffect(() => {
    const escKeyModalClose = (e: any) => {
      if (e.keyCode === 27) {
        closeThing();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydonw", escKeyModalClose);
  }, []);
}
