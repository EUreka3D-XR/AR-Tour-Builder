import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <InputLocale name="quizLinks" hideLocaleIndicators>
        {({ name: localizedName }) => (
          <FormArray name={localizedName}>
            {({ insert, remove, fields: items }) => (
              <>
                <FormArray.URLInput
                  label={t("poiSidebar.externalLinksTab.quizLinks")}
                  labelPlaceholder={t(
                    "poiSidebar.externalLinksTab.quizNamePlaceholder",
                  )}
                  urlPlaceholder={t(
                    "poiSidebar.externalLinksTab.quizUrlPlaceholder",
                  )}
                  insert={insert}
                />
                <FormArray.Display
                  displayMode="chips"
                  variant="url"
                  items={items}
                  remove={remove}
                />
              </>
            )}
          </FormArray>
        )}
      </InputLocale>
      <InputLocale name="externalLinks" hideLocaleIndicators>
        {({ name: localizedName }) => (
          <FormArray name={localizedName}>
            {({ insert, remove, fields: items }) => (
              <>
                <FormArray.URLInput
                  label={t("poiSidebar.externalLinksTab.externalLinks")}
                  labelPlaceholder={t(
                    "poiSidebar.externalLinksTab.namePlaceholder",
                  )}
                  urlPlaceholder={t(
                    "poiSidebar.externalLinksTab.externalUrlPlaceholder",
                  )}
                  insert={insert}
                />
                <FormArray.Display
                  displayMode="chips"
                  variant="url"
                  items={items}
                  remove={remove}
                />
              </>
            )}
          </FormArray>
        )}
      </InputLocale>
    </ContainerStyled>
  );
}

export default PoiExternalLinksTab;
