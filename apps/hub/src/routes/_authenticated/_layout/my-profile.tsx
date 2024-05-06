import { createFileRoute } from "@tanstack/react-router";
import * as Layout from "@/domains/user/layouts/profile-layout";
import { UserAvatarSettingsCard } from "@/domains/user/components/user-avatar-settings-card";
import { UserNameSettingsCard } from "@/domains/user/components/user-name-settings-card";
import { AccountDeletionCard } from "@/domains/user/components/account-deletion-card";

function MyProfileRoute() {
  return (
    <Layout.Root>
      <UserNameSettingsCard />
      <UserAvatarSettingsCard />
      <AccountDeletionCard />
    </Layout.Root>
  );
}

export const Route = createFileRoute("/_authenticated/_layout/my-profile")({
  component: MyProfileRoute,
});
