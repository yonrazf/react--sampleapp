import AdminButton from "./adminButton";
import LogoutBtn from "./logoutButtton";
import SwitchTenantDropDown from "./switchTenant";

export default function UserActions() {
  return (
    <div className="actions">
      <div style={{ margin: "1rem" }}>
        <SwitchTenantDropDown />
      </div>
      <AdminButton />
      <LogoutBtn />
    </div>
  );
}
