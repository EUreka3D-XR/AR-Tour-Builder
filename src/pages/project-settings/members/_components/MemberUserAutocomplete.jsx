import { useTranslation } from "react-i18next";
import { Autocomplete, TextField } from "@mui/material";

import { useAllUsers } from "@/services/usersService";
import { getUserDisplayName } from "@/utils/user";

function MemberUserAutocomplete({ members, onChange }) {
  const { t } = useTranslation();
  const { data: allUsers, fetchState } = useAllUsers();

  const memberIds = new Set(members?.map((m) => m.id) ?? []);
  const options = (allUsers ?? []).filter((u) => !memberIds.has(u.id));

  return (
    <Autocomplete
      fullWidth
      openOnFocus
      autoHighlight
      loading={fetchState.isLoading}
      options={options}
      getOptionLabel={getUserDisplayName}
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
