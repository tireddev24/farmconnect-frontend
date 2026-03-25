import { Toaster, toaster } from "components/ui/toaster";
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
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};

export default Sessionexpired;
