import { useAuth, useTenantsState, useAuthActions } from "@frontegg/react";

export default function SwitchTenantV2() {
  const { user, isAuthenticated } = useAuth();
  const { switchTenant } = useAuthActions();
  const { tenants } = useTenantsState();
  const switchTenantFromDropdown = (e: any) => {
    const selectedIndex = e.target.selectedIndex;
    const newTenantId = tenants[selectedIndex].tenantId;
    const newTenantName = tenants[selectedIndex].name;
    console.log(
      `\\n\\n----\\nSelected index:\\n${selectedIndex}\\n\\nTenant name:\\n${newTenantName}\\n\\nTenant ID:\\n${newTenantId}`
    );
    switchTenant({ tenantId: newTenantId });
  };
  return (
    <select className="tenant-selector" onChange={switchTenantFromDropdown}>
      {tenants.map((option: any, index: number) =>
        option.tenantId === user?.tenantId ? (
          <option key={index} value={option.name} selected={true}>
            {option.name}
          </option>
        ) : (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        )
      )}
    </select>
  );
}
//...
