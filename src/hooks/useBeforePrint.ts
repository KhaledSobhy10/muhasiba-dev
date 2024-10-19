import React, { useEffect, useState } from "react";

export function useBeforePrint() {
  const [onBeforePrintFired, setonBeforePrintFired] = useState(false);

  const handleBeforePrint = () => {
    // Perform any actions needed before printing
    console.log("Before print");
    setonBeforePrintFired(true);
  };

  useEffect(() => {
    window.addEventListener("beforeprint", handleBeforePrint);
    return () => window.removeEventListener("beforeprint", handleBeforePrint);
  }, []);

  return { onBeforePrintFired };
}
