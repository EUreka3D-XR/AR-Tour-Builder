import { useProfile } from "@/services/profileService";
import UserSettingsForm from "./_form/UserSettingsForm";

function UserSettingsPage() {
  const { data: profile, fetchState } = useProfile();

  if (fetchState.isError) {
    return <div>Error loading user data.</div>;
  }
  if (fetchState.isLoading || !profile) {
    return <div>Loading...</div>;
  }

  const defaultValues = {
    name: profile.name || "",
    username: profile.username || "",
    email: profile.email || "",
  };

  return (
    <UserSettingsForm defaultValues={defaultValues} email={profile.email} />
  );
}

export default UserSettingsPage;
