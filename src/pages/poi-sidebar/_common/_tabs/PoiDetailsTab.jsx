import { styled, TextField } from "@mui/material";

import FormInputMultilingual from "@/components/form/FormInputMultilingual";
import ImageInput from "@/components/image-input/ImageInput";
import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));
function PoiDetailsTab() {
  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <FormInputMultilingual
        name="title"
        render={({ field }) => (
          <LabeledInput label="Title" isMultilingual>
            <TextField {...field} placeholder="Enter title" fullWidth />
          </LabeledInput>
        )}
      />
      <FormInputMultilingual
        name="description"
        render={({ field }) => (
          <LabeledInput label="Description" isMultilingual>
            <TextField
              {...field}
              placeholder="Enter description"
              fullWidth
              multiline
              rows={4}
            />
          </LabeledInput>
        )}
      />
      {/* <FormInput
        name="thumbnail"
        render={({ field }) => ( */}
      <LabeledInput label="Cover Photo">
        <ImageInput placeholderText="Click to upload photo" maxFileSize={5} />
      </LabeledInput>
      {/* )}
      /> */}
    </ContainerStyled>
  );
}

export default PoiDetailsTab;
