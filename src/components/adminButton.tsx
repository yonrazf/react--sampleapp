import { AdminPortal } from "@frontegg/react";
import { useCallback } from "react";

export default function AdminButton({
  setPortalOpen,
}: {
  setPortalOpen: (val: boolean) => void;
}) {
  const handleClick = useCallback(() => {
    AdminPortal.show();
    setPortalOpen(true);
  }, []);

  return (
    <button className="btn-primary" onClick={handleClick}>
      Settings
    </button>
  );
}
