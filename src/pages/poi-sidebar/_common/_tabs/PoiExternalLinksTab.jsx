import { styled } from "@mui/material";

import useFormLocale from "@/stores/useFormLocale";
import FormArray from "@/components/form/FormArray";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));

function PoiExternalLinksTab() {
  const { locale } = useFormLocale();
  return (
    <ContainerStyled>
      <FormArray>
        <FormArray.URLInput
          name="quizLinks"
          label="Quiz Links"
          labelPlaceholder="Quiz Name"
          urlPlaceholder="URL: ex. https://quiz-platform.com/quiz/123"
        />
        <FormArray.Display
          name="quizLinks"
          displayMode="chips"
          variant="url"
          locale={locale}
        />
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
          locale={locale}
        />
      </FormArray>
    </ContainerStyled>
  );
}

export default PoiExternalLinksTab;
