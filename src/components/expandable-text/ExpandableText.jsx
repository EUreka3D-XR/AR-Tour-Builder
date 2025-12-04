import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";

import Button from "../button/Button";

const ExpandableText = ({ children, lines = 1, props }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [children, expanded, lines]);

  const showButton = isOverflowing || expanded;

  return (
    <Stack
      direction="row"
      alignItems={expanded ? "flex-end" : "center"}
      justifyContent="space-between"
    >
      <Typography
        ref={textRef}
        sx={{
          whiteSpace: expanded ? "wrap" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          flex: 1,
          display: expanded ? "-webkit-box" : "block",
          WebkitBoxOrient: expanded ? "vertical" : "horizontal",
          WebkitLineClamp: expanded ? "unset" : lines,
          transition: "all 0.2s ease",
        }}
        {...props}
      >
        {children}
      </Typography>

      {showButton && (
        <Button
          size="small"
          variant="text"
          disableGutters
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? t("components.expandable_text.show_less") : t("components.expandable_text.show_more")}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
