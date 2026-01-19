import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import { Checkbox, Divider, Typography } from "@mui/material";

import CoordinatesInput from "@/components/coordinates-input/CoordinatesInput";
import FormInput from "@/components/form/FormInput";
import NumberInput from "@/components/number-input/NumberInput";
import SwitchToggle from "@/components/switch/SwitchToggle";
import {
  FormControlLabelStyled,
  SubGroup,
} from "../../_common/CommonFormComponents";
import AssetFormLinkedAudio from "../linked-audio/AssetFormLinkedAudio";

function AssetFormModelAttributes({ isPoiAsset }) {
  const { t } = useTranslation();
  const assetType = useWatch({ name: "type" });
  const isGeoreferenced = useWatch({ name: "isGeoreferenced" });
  const isARShown = useWatch({ name: "viewInAr" });

  if (assetType !== "model3d") {
    return null;
  }

  return (
    <>
      <Divider />
      <Typography variant="h5">
        {t("asset.form.section.model_attributes")}
      </Typography>
      <div className="models-details">
        <FormInput
          name="isGeoreferenced"
          render={({ field }) => (
            <FormControlLabelStyled
              control={
                <Checkbox
                  checked={Boolean(field.value)}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label={
                <div className="checkbox-label">
                  <Typography variant="body2">
                    {t("asset.form.field.georeferenced")}
                  </Typography>
                  <Typography variant="caption">
                    {t("asset.form.help.georeferenced_description")}
                  </Typography>
                </div>
              }
            />
          )}
        />
        {isGeoreferenced && (
          <SubGroup>
            <CoordinatesInput name="georeference" showMap mapHeight={300} />
          </SubGroup>
        )}
        {isPoiAsset && (
          <>
            <FormInput
              name="viewInAr"
              render={({ field }) => (
                <FormControlLabelStyled
                  control={
                    <Checkbox
                      checked={Boolean(field.value)}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={
                    <div className="checkbox-label">
                      <Typography variant="body2">
                        {t("asset.form.field.view_in_ar")}
                      </Typography>
                      <Typography variant="caption">
                        {t("asset.form.help.view_in_ar_description")}
                      </Typography>
                    </div>
                  }
                />
              )}
            />
            {isARShown && (
              <>
                <SubGroup>
                  <div className="grid">
                    <div className="col-1">
                      <FormInput
                        name="spawnRadius"
                        render={({ field }) => (
                          <NumberInput
                            {...field}
                            iconName="radius"
                            endAdornmentText="m"
                            sx={{ maxWidth: "140px" }}
                          />
                        )}
                      />
                    </div>
                    <div className="col-2">
                      <div className="checkbox-label">
                        <Typography variant="body2">
                          {t("asset.form.field.spawn_radius")}
                        </Typography>
                        <Typography variant="caption">
                          {t("asset.form.help.spawn_radius_description")}
                        </Typography>
                      </div>
                    </div>
                    <div className="col-1">
                      <FormInput
                        name="isGroundPlaced"
                        render={({ field }) => (
                          <SwitchToggle
                            value={Boolean(field.value)}
                            options={[
                              {
                                label: t(
                                  "asset.form.ground_placed_options.free",
                                ),
                                value: "air",
                              },
                              {
                                label: t(
                                  "asset.form.ground_placed_options.ground",
                                ),
                                value: "ground",
                                actAsChecked: true,
                              },
                            ]}
                            onChange={(newValue) => field.onChange(newValue)}
                          />
                        )}
                      />
                    </div>
                    <div className="col-2">
                      <div className="checkbox-label">
                        <Typography variant="body2">
                          {t("asset.form.field.ground_placed")}
                        </Typography>
                        <Typography variant="caption">
                          {t("asset.form.help.ground_placed_description")}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </SubGroup>
              </>
            )}
          </>
        )}
      </div>
      {isPoiAsset && <AssetFormLinkedAudio />}
    </>
  );
}

export default AssetFormModelAttributes;
