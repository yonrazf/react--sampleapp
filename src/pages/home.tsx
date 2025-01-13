import UserDetails from "../components/userDetails";
import UserActions from "../components/userActions";
import { useEffect, useState } from "react";
import {
  AuthorizedContent,
  useApplicationsState,
  useAuth,
  // useFeatureEntitlements,
} from "@frontegg/react";
import "./home.css";
import BulkInvite from "../components/bulkInvite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getGenericBackendCall } from "@/utils/getToken";
import SwitchTenantV2 from "@/components/switchTenantV2";
import { useApplicationsActions } from "@frontegg/react";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [portalOpen, setPortalOpen] = useState(false);
  const width = window.innerWidth / 2;
  const applicationsActions = useApplicationsActions();
  const appliactionsState = useApplicationsState();

  const getApps = async () => {
    const apps = await applicationsActions.loadAccountApplications();

    console.log(apps);
    return apps;
  };

  // const sf = useFeatureEntitlements("sso");

  useEffect(() => {
    // console.log(sf);
    getApps();
    console.log(appliactionsState);
  }, []);

  const { user } = useAuth();
  return (
    <div>
      <div className="nav">
        <div>
          {/* <img
            className="pfp"
            src={user?.profilePictureUrl ?? ""}
            style={{
              zIndex: "1",
              borderRadius: "50%",
              cursor: "pointer",
              objectFit: "cover",
            }}
            // onClick={() => setShowModal((prev) => !prev)}
            width={60}
            height={60}
            alt={user?.name}
          /> */}

          <Dialog
            modal={false}
            open={showModal}
            onOpenChange={(val) => {
              const adminBox = document.getElementById("admin-box");
              if (!adminBox) setShowModal(val);
            }}
          >
            <DialogTrigger className=" w-0 p-0  border-0">
              <img
                className="pfp"
                src={user?.profilePictureUrl ?? ""}
                style={{
                  zIndex: "1",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                // onClick={() => setShowModal((prev) => !prev)}
                width={60}
                height={60}
                alt={user?.name}
              />
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                if (portalOpen) {
                  // e.preventDefault();
                }
              }}
            >
              {/* <div className="container"> */}
              {/* <button
            className="btn-close"
            onClick={onClose}
            style={{ color: "white" }}
          >
            x
          </button> */}
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  <UserDetails />
                  <UserActions setPortalOpen={setPortalOpen} />
                </DialogDescription>
              </DialogHeader>
              {/* </div> */}
            </DialogContent>
          </Dialog>
        </div>

        <h1 id="page-title">Sample app</h1>
      </div>
      <div>
        <AuthorizedContent requiredRoles={["Admin"]}>
          <SwitchTenantV2 />
          <div>
            <h1>Call the backend</h1>
            <button
              onClick={() => {
                getGenericBackendCall(
                  "http://localhost:3001/api/products",
                  user?.tenantId || "",
                  user?.id || ""
                );
              }}
            >
              call
            </button>
          </div>
          <BulkInvite />
        </AuthorizedContent>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: width - 200,
        }}
      >
        {/* {showModal && <UserModal onClose={() => setShowModal(false)} />} */}
      </div>
    </div>
  );
}

function UserModal({
  setOpen,
  user,
}: {
  user: any;
  setOpen: (val: boolean) => void;
}) {
  const [portalOpen, setPortalOpen] = useState(false);
  return (
    <div>
      <DialogTrigger>
        <img
          className="pfp"
          src={user?.profilePictureUrl ?? ""}
          style={{
            zIndex: "1",
            borderRadius: "50%",
            cursor: "pointer",
            objectFit: "cover",
          }}
          // onClick={() => setShowModal((prev) => !prev)}
          width={60}
          height={60}
          alt={user?.name}
        />
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (portalOpen) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        }}
      >
        {/* <div className="container"> */}
        {/* <button
            className="btn-close"
            onClick={onClose}
            style={{ color: "white" }}
          >
            x
          </button> */}
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <UserDetails />
          <DialogDescription>
            <UserActions setPortalOpen={setPortalOpen} />
          </DialogDescription>
        </DialogHeader>
        {/* </div> */}
      </DialogContent>
    </div>
  );
}
