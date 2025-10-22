import { useRef, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Chip, IconButton, styled, TextField, Tooltip } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";
import LabeledInput from "../labeled-input/LabeledInput";
import Link from "../link/Link";
import Spacer from "../spacer/Spacer";

const ContainerStyled = styled("div")(({ theme }) => ({
  "& .input-area-wrapper": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    "& .input-area": {
      flex: 1,
    },
  },
  "& .items-display": {
    marginTop: theme.spacing(4),
  },
  "& .items-chips": {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  "& .items-list": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    " & .item-row": {
      width: "100%",
      display: "flex",
      gap: theme.spacing(2),
      alignItems: "center",
      "& .item-value": {
        flex: 1,
      },
      "& .actions": {
        flexShrink: 0,
      },
    },
  },
}));

export default function FormArray({ children }) {
  return <ContainerStyled>{children}</ContainerStyled>;
}

function FormArrayTextInput({ name, label, placeholder }) {
  const inputRef = useRef(null);
  const { insert } = useFieldArray({
    name,
  });

  const handleInsert = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      console.log("value", value);
      if (value.trim() !== "") {
        insert(0, value);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <FormArrayInputWrapper onAdd={handleInsert}>
      <LabeledInput label={label}>
        <TextField placeholder={placeholder} inputRef={inputRef} fullWidth />
      </LabeledInput>
    </FormArrayInputWrapper>
  );
}

function FormArrayURLInput({
  name,
  label,
  labelPlaceholder,
  urlPlaceholder,
  isLabelRequired,
}) {
  const [errors, setErrors] = useState({});
  const [submits, setSubmits] = useState(0);

  const labelRef = useRef(null);
  const urlRef = useRef(null);
  const { insert } = useFieldArray({
    name,
  });

  const labelPlaceholderText = isLabelRequired
    ? labelPlaceholder
    : labelPlaceholder + " (Optional)";

  const handleInsert = () => {
    setSubmits((prev) => prev + 1);

    const newErrors = {};

    if (!labelRef.current || !urlRef.current) {
      return;
    }

    const labelValue = labelRef.current?.value ?? "";
    if (isLabelRequired) {
      if (!labelValue || labelValue.trim() === "") {
        newErrors.label = "Label is required";
      }
    }

    const urlValue = urlRef.current.value;
    if (!urlValue || urlValue.trim() === "") {
      newErrors.url = "URL is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const value = { label: labelValue, url: urlValue };

    insert(0, value);
    labelRef.current.value = "";
    urlRef.current.value = "";
  };

  const validateLabel = (e) => {
    if (submits === 0) return;

    const value = e.target.value;
    if (isLabelRequired && (!value || value.trim() === "")) {
      setErrors((prev) => ({ ...prev, label: "Label is required" }));
    } else {
      setErrors((prev) => ({ ...prev, label: null }));
    }
  };
  const validateURL = (e) => {
    const value = e.target.value;
    if (!value || value.trim() === "") {
      setErrors((prev) => ({ ...prev, url: "URL is required" }));
    } else {
      setErrors((prev) => ({ ...prev, url: null }));
    }
  };

  return (
    <LabeledInput label={label}>
      <FormArrayInputWrapper onAdd={handleInsert}>
        <TextField
          placeholder={labelPlaceholderText}
          inputRef={labelRef}
          fullWidth
          helperText={errors.label}
          error={!!errors.label}
          required={isLabelRequired}
          onChange={validateLabel}
        />
        <Spacer size={2}></Spacer>
        <TextField
          inputRef={urlRef}
          placeholder={urlPlaceholder}
          type="url"
          fullWidth
          helperText={errors.url}
          error={!!errors.url}
          onChange={validateURL}
        />
      </FormArrayInputWrapper>
    </LabeledInput>
  );
}

function FormArrayInputWrapper({ children, onAdd, isDisabled }) {
  return (
    <div className="input-area-wrapper">
      <div className="input-area">{children}</div>
      <IconButton
        onClick={onAdd}
        sx={{ height: "fit-content" }}
        disabled={isDisabled}
      >
        <EurekaIcon name="add" />
      </IconButton>
    </div>
  );
}

function FormArrayDisplay({
  name,
  renderItems,
  displayMode = "list",
  variant = "text",
}) {
  const items = useWatch({ name });
  const arrayMethods = useFieldArray({
    name,
  });

  const { remove } = arrayMethods;

  if (typeof renderItems === "function") {
    return renderItems(arrayMethods);
  }

  return (
    <div className="items-display">
      {displayMode === "list" && (
        <FormArray.List items={items} onDelete={remove} />
      )}
      {displayMode === "chips" && (
        <FormArray.Chips items={items} onDelete={remove} variant={variant} />
      )}
    </div>
  );
}

function FormArrayList({ items, onDelete }) {
  return (
    <div className="items-list">
      {items.map((item, index) => (
        <div key={item} className="item-row">
          <div className="item-value">{item}</div>
          <div className="actions">
            <IconButton onClick={() => onDelete(index)}></IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

function FormArrayChips({ items, variant, onDelete }) {
  const isUrlVariant = variant === "url";

  return (
    <div className="items-chips">
      {items.map((item, index) => {
        if (isUrlVariant) {
          return (
            <Tooltip key={item.url} title={item.url}>
              <Chip
                label={item.label}
                variant="outlined"
                icon={
                  <EurekaIcon
                    name="link"
                    fontSize="small"
                    sx={{ transform: "rotate(45deg)" }}
                  />
                }
                clickable
                component={Link}
                to={item.url}
                openInNewTab
                onDelete={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(index);
                }}
              />
            </Tooltip>
          );
        }
        return (
          <Chip key={item} label={item} onDelete={onDelete} variant={variant} />
        );
      })}
    </div>
  );
}

FormArray.TextInput = FormArrayTextInput;
FormArray.URLInput = FormArrayURLInput;
FormArray.Display = FormArrayDisplay;
FormArray.List = FormArrayList;
FormArray.Chips = FormArrayChips;
