import AdminButton from "./adminButton";
import LogoutBtn from "./logoutButtton";
import SwitchTenantDropDown from "./switchTenant";

export default function UserActions({
  setPortalOpen,
}: {
  setPortalOpen: (val: boolean) => void;
}) {
  return (
    <div className="actions">
      <div style={{ margin: "1rem" }}>
        <SwitchTenantDropDown />
      </div>
      <AdminButton setPortalOpen={setPortalOpen} />
      <LogoutBtn />
    </div>
  );
}
