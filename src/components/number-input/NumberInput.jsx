import { useCallback, useEffect, useRef, useState } from "react";
import { styled, TextField } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";

/**
 * @typedef {'natural' | 'integer' | 'floating' | 'scientific'} Mode
 */

/** @enum {Mode} */
const Modes = {
  natural: "natural",
  integer: "integer",
  floating: "floating",
  scientific: "scientific",
};

const patternMapping = {
  [Modes.natural]: "(?:0|[1-9]\\d*)",
  [Modes.integer]: "[+\\-]?(?:0|[1-9]\\d*)",
  [Modes.floating]: "[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?",
  [Modes.scientific]: "[+\\-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+\\-]?\\d+)?",
};

// Partial/incomplete patterns allow typing in-progress values (e.g. "-", "1.", "1e")
const partialPatternMapping = {
  [Modes.natural]: /^(?:0|[1-9]\d*)$/,
  [Modes.integer]: /^[+-]?(?:0|[1-9]\d*)?$/,
  [Modes.floating]: /^[+-]?(?:0|[1-9]\d*)?\.?\d*$/,
  [Modes.scientific]: /^[+-]?(?:0|[1-9]\d*)?\.?\d*(?:[eE][+-]?\d*)?$/,
};

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  label: "number-input",
  "& input": {
    textAlign: "end",
  },
  "& .input-adornment": {
    color: theme.palette.text.secondary,
    "&.end-adornment": {
      paddingLeft: theme.spacing(1),
    },
  },
}));

const DragHandle = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "ew-resize",
  userSelect: "none",
  touchAction: "none",
  color: theme.palette.text.secondary,
}));

/**
 * NumberInput component
 * Accepts the same props as MUI's TextField.
 * @param {import('@mui/material/TextField').TextFieldProps & { iconName?: string, mode?: Mode, step?: number, endAdornmentText?: string, onChange?: (value: number) => void, min?: number, max?: number, decimals?: number, draggable?: boolean, scrubSensitivity?: number }} props
 * @returns {JSX.Element}
 */
function NumberInput({
  iconName,
  mode = Modes.floating,
  endAdornmentText,
  onChange,
  min,
  max,
  step = 1,
  decimals = 7,
  value: externalValue,
  draggable = false,
  scrubSensitivity = 2,
  ...props
}) {
  const format = useCallback(
    (num) =>
      decimals !== undefined ? Number(num).toFixed(decimals) : String(num),
    [decimals],
  );

  const [internalValue, setInternalValue] = useState(
    externalValue !== undefined ? format(externalValue) : "",
  );

  // Sync when external value changes (e.g. arrow key increment, store update)
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(format(externalValue));
    }
  }, [externalValue, format]);

  const pattern = patternMapping[mode] || patternMapping[Modes.floating];
  const partialPattern =
    partialPatternMapping[mode] || partialPatternMapping[Modes.floating];

  const handleBlur = useCallback(() => {
    const num = parseFloat(internalValue);
    if (!isNaN(num)) setInternalValue(format(num));
  }, [internalValue, format]);

  const handleChange = useCallback(
    (e) => {
      const raw = e.target.value;
      if (raw !== "" && !partialPattern.test(raw)) return;
      setInternalValue(raw);
      const num = parseFloat(raw);
      if (!isNaN(num)) onChange?.(num);
    },
    [partialPattern, onChange],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowUp") {
        const nextValue = Number(internalValue || 0) + step;
        if (nextValue <= max) {
          setInternalValue(String(nextValue));
          onChange?.(nextValue);
        }
      }
      if (e.key === "ArrowDown") {
        const nextValue = Number(internalValue || 0) - step;
        if (nextValue >= min) {
          setInternalValue(String(nextValue));
          onChange?.(nextValue);
        }
      }
    },
    [internalValue, max, min, onChange, step],
  );

  // Scrubber state
  const dragState = useRef(null);

  const clamp = useCallback(
    (num) => {
      if (min !== undefined && num < min) return min;
      if (max !== undefined && num > max) return max;
      return num;
    },
    [min, max],
  );

  const handleDragPointerDown = useCallback(
    (e) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startValue: parseFloat(internalValue) || 0,
        accumulated: 0,
      };
    },
    [internalValue],
  );

  const handleDragPointerMove = useCallback(
    (e) => {
      if (!dragState.current) return;
      const deltaX = e.clientX - dragState.current.startX;
      const steps = Math.trunc(deltaX / scrubSensitivity);
      const next = clamp(
        parseFloat(
          (dragState.current.startValue + steps * step).toFixed(decimals),
        ),
      );
      setInternalValue(format(next));
      onChange?.(next);
    },
    [scrubSensitivity, step, decimals, clamp, format, onChange],
  );

  const handleDragPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  const dragHandleProps = draggable
    ? {
        onPointerDown: handleDragPointerDown,
        onPointerMove: handleDragPointerMove,
        onPointerUp: handleDragPointerUp,
      }
    : {};

  const startAdornment = draggable ? (
    <DragHandle {...dragHandleProps}>
      <EurekaIcon name="arrowRange" fontSize="small" />
    </DragHandle>
  ) : iconName ? (
    <EurekaIcon name={iconName} fontSize="small" className="input-adornment" />
  ) : null;

  return (
    <TextFieldStyled
      {...props}
      value={internalValue}
      inputMode="decimal"
      slotProps={{
        input: {
          startAdornment,
          endAdornment: endAdornmentText ? (
            <span className="input-adornment end-adornment">
              {endAdornmentText}
            </span>
          ) : null,
        },
        htmlInput: {
          autoComplete: "off",
          min,
          max,
          pattern,
        },
      }}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default NumberInput;
