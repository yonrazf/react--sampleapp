import { AdminPortal } from "@frontegg/react";
import { useCallback } from "react";

export default function AdminButton() {
  const handleClick = useCallback(() => {
    AdminPortal.show();
  }, []);

  return (
    <button className="btn-primary" onClick={handleClick}>
      Settings
    </button>
  );
}
