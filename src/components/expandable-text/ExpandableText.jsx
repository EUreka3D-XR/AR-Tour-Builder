import { useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";

import Button from "../button/Button";

const ExpandableText = ({ children, lines = 1 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    console.log(el);
    if (!el) return;

    // Temporarily remove clamp to measure full height
    el.style.display = "-webkit-box";
    el.style.webkitLineClamp = "unset";
    el.style.webkitBoxOrient = "vertical";
    el.style.overflow = "visible";

    const overflowing = el.scrollWidth > el.clientWidth;

    setIsOverflowing(overflowing);

    // Reapply clamp if not expanded
    if (!expanded) {
      el.style.overflow = "hidden";
      el.style.display = "-webkit-box";
      el.style.webkitLineClamp = lines;
      el.style.webkitBoxOrient = "vertical";
    } else {
      el.style.overflow = "visible";
      el.style.webkitLineClamp = "unset";
    }
  }, [children, expanded, lines]);

  return (
    <Stack
      direction="row"
      alignItems={expanded ? "flex-end" : "center"}
      justifyContent="space-between"
      gap={1}
    >
      <Typography
        ref={textRef}
        variant="body2"
        sx={
          {
            // flex: 1,
            // overflow: "hidden",
            // display: "-webkit-box",
            // WebkitBoxOrient: "vertical",
            // WebkitLineClamp: expanded ? "unset" : lines,
            // transition: "all 0.2s ease",
          }
        }
      >
        {children}
      </Typography>

      {isOverflowing && (
        <Button
          size="small"
          variant="text"
          disableGutters
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
