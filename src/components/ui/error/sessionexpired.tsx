import { Toaster } from "@/components/ui/toaster";
import { toaster } from "@/hooks/useUI";
import { useAuth } from "context/AuthContext";
import { useEffect } from "react";

const Sessionexpired = () => {
  const { logout } = useAuth();

  useEffect(() => {
    toaster.create({
      type: "warning",
      title: "Session Expired",
      description: "Rerouting to login...",
    });

    setTimeout(() => {
      logout();
      window.location.replace("../login");
    }, 1000);
  }, [logout]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default Sessionexpired;
