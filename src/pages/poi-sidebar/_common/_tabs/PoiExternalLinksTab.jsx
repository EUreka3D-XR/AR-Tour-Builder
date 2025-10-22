import { styled } from "@mui/material";

import FormArray from "@/components/form/FormArray";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));

function PoiExternalLinksTab() {
  return (
    <ContainerStyled>
      <FormArray>
        <FormArray.URLInput
          name="quizLinks"
          label="Quiz Links"
          labelPlaceholder="Quiz Name"
          isLabelRequired
          urlPlaceholder="URL: ex. https://quiz-platform.com/quiz/123"
        />
        <FormArray.Display name="quizLinks" displayMode="chips" variant="url" />
      </FormArray>
      <FormArray>
        <FormArray.URLInput
          name="externalLinks"
          label="External Links"
          labelPlaceholder="Name"
          urlPlaceholder="URL: ex. https://some-blog.com/page"
        />
        <FormArray.Display
          name="externalLinks"
          displayMode="chips"
          variant="url"
        />
      </FormArray>
    </ContainerStyled>
  );
}

export default PoiExternalLinksTab;
