import { styled } from "@mui/material";

import FormArray from "@/components/form/FormArray";
import InputLocale from "@/components/input-locale/InputLocale";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));

function PoiExternalLinksTab() {
  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <InputLocale name="quizLinks" hideLocaleIndicators>
        {({ name: localizedName }) => (
          <FormArray>
            <FormArray.URLInput
              name={localizedName}
              label="Quiz Links"
              labelPlaceholder="Quiz Name"
              urlPlaceholder="URL: ex. https://quiz-platform.com/quiz/123"
            />
            <FormArray.Display
              name={localizedName}
              displayMode="chips"
              variant="url"
            />
          </FormArray>
        )}
      </InputLocale>
      <InputLocale name="externalLinks" hideLocaleIndicators>
        {({ name: localizedName }) => (
          <FormArray>
            <FormArray.URLInput
              name={localizedName}
              label="External Links"
              labelPlaceholder="Name"
              urlPlaceholder="URL: ex. https://some-blog.com/page"
            />
            <FormArray.Display
              name={localizedName}
              displayMode="chips"
              variant="url"
            />
          </FormArray>
        )}
      </InputLocale>
    </ContainerStyled>
  );
}

export default PoiExternalLinksTab;
