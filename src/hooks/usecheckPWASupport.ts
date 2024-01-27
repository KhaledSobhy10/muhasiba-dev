import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function useCheckPWASupport() {
  const { toast } = useToast();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // PWA features are supported
      console.log("PWAs are supported on this browser.");
      toast({
        title: "Info",
        description: "You can install app",
      });
    } else {
      // PWA features are not supported

      console.log("PWAs are not supported on this browser.");
      toast({
        title: "Warning",
        description: "PWAs are not supported on this browser.",
      });
    }
  }, []);
}
