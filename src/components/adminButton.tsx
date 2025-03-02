import { AdminPortal } from "@frontegg/react";
import { useCallback } from "react";
import { Button } from "./ui/button";

export default function AdminButton({
  setPortalOpen,
}: {
  setPortalOpen: (val: boolean) => void;
}) {
  const handleClick = useCallback(() => {
    AdminPortal.openHosted();
    setPortalOpen(true);
  }, []);

  const openEmbedded = () => {
    AdminPortal.show();
  };

  return (
    <>
      <Button className="btn-primary" onClick={handleClick}>
        Settings
      </Button>
      <Button className="btn-primary" onClick={openEmbedded}>
        Settings (embedded)
      </Button>
    </>
  );
}

const obj = {
  fronteggtraceid: "0aa37c88df1340aec6ac84b6eaeb78d8",
  "schemaErrors.0": {
    children: [],
    constraints: {
      isBoolean: "continue must be a boolean value",
    },
    property: "continue",
    target: {
      error: {},
      response: {
        claims: {},
      },
    },
  },
  "schemaErrors.1": {
    children: [
      {
        target: {
          claims: {},
        },
        value: {},
        children: [
          {
            property: "tenantId",
            target: {},
            children: [],
            constraints: {
              isNotEmpty: "tenantId should not be empty",
              isString: "tenantId must be a string",
            },
          },
        ],
        property: "claims",
      },
    ],
    property: "response",
    target: {
      error: {},
      response: {
        claims: {},
      },
    },
    value: {
      claims: {},
    },
  },
};
