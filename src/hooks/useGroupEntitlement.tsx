import { getToken } from "@/utils/getToken";
import {
  useAuth,
  useEntitlementsActions,
  useFeatureEntitlements,
} from "@frontegg/react";
import { useEffect, useState } from "react";

interface GroupsResponse {
  groupIds: string[];
  tenantId: string;
  userId: string;
  vendorId: string;
}

export default function useGroupEntitlements(featureKey: string) {
  const { isEntitledTo } = useEntitlementsActions();
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const { user } = useAuth();

  const getUserGroups = async () => {
    const token = await getToken();
    const response = await fetch(
      `https://api.frontegg.com/identity/resources/users/v3/groups?ids=${user?.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          ["frontegg-tenant-id"]: user!.tenantId,
        },
      }
    );
    const userGroups: GroupsResponse[] = await response.json();
    console.log(userGroups[0]);
    setUserGroups(userGroups[0].groupIds);
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  const { isEntitled, justification } = useFeatureEntitlements(featureKey, {
    groupId: userGroups.toString(),
  });

  if (isEntitled) {
    console.log("is entitled to test-feature");
  } else {
    console.log("is not entitled to test-feature");
  }

  return { isEntitled, justification };
}
