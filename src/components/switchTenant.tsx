import { useAuthActions } from "@frontegg/react";
import { useAuth } from "@frontegg/react";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

interface User {
  tenantId: string;
  name: string;
}

export default function SwitchTenantDropDown() {
  const { switchTenant } = useAuthActions();
  const { user } = useAuth();
  const [tenantId, setTenantId] = useState("");

  const [tenantIdToNameMap, setTenantIdToNameMap] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    async function fetchTenants() {
      const token = await getToken();

      const response = await fetch(
        "https://api.frontegg.com/tenants/resources/tenants/v2",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("error fetching tenant data");
      }

      const data = await response.json();

      const idToNameMap = data.items.reduce(
        (acc: Record<string, string>, obj: User) => {
          acc[obj.tenantId] = obj.name;
          return acc;
        },
        {}
      );

      setTenantIdToNameMap(idToNameMap);
    }
    fetchTenants();
  }, []);

  const handleSwitchTenant = () => {
    if (tenantId === "") return;
    switchTenant({ tenantId });
  };

  return (
    <div>
      <div>
        <label htmlFor="tenantDropdown">Switch Accounts</label>
      </div>
      <select
        id="tenantDropdown"
        value={tenantId}
        style={{
          fontSize: "Larger",
          width: "140px",
          borderRadius: "5px",
          fontWeight: 500,
        }}
        onChange={(e) => setTenantId(e.target.value)}
      >
        <option value={""}>Select option</option>
        {user?.tenantIds.map((id) => (
          <option key={id} value={id}>
            {id === user.tenantId
              ? tenantIdToNameMap[id] + " (current)"
              : tenantIdToNameMap[id]}
          </option>
        ))}
      </select>
      <div>
        <button
          className="tenant-select-btn btn-primary"
          onClick={handleSwitchTenant}
        >
          Select Account
        </button>
      </div>
    </div>
  );
}
