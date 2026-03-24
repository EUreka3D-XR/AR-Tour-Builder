import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAllUsers } from "@/services/usersService";

function MemberUserAutocomplete({ members, onChange }) {
  const { t } = useTranslation();
  const { data: allUsers, fetchState } = useAllUsers();

  const memberIds = new Set(members?.map((m) => m.id) ?? []);
  const options = (allUsers ?? []).filter((u) => !memberIds.has(u.id));

  const getLabel = (user) =>
    user.name || user.username || user.email || user.id;

  return (
    <Autocomplete
      fullWidth
      openOnFocus
      autoHighlight
      loading={fetchState.isLoading}
      options={options}
      getOptionLabel={getLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          autoFocus
          placeholder={t("projectSettings.members.add")}
        />
      )}
      onChange={(_, value) => onChange(value)}
    />
  );
}

export default MemberUserAutocomplete;
