import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Popover, styled, Typography } from "@mui/material";

import { allowedFileExtensions } from "@/utils/fileExtensions";

function UrlHelperText() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const source = useMemo(() => Object.entries(allowedFileExtensions || {}), []);

  return (
    <>
      <span>
        {t("file_formats.helper.text")}
        <HelperSpanButton onClick={handleClick}>{t("file_formats.helper.link_text")}</HelperSpanButton>.
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <PopoverContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {t("file_formats.title")}
          </Typography>

          {source.map(([key, list]) => (
            <div key={key} className="file-type-section">
              <div className="file-type-title">{key}</div>
              <ul className="file-type-list">
                {list.map((ext) => (
                  <li key={ext.value}>
                    <code>{ext.value}</code>
                    <span>{ext.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default UrlHelperText;

const HelperSpanButton = styled("span")(() => ({
  cursor: "pointer",
  fontWeight: 600,
  textDecoration: "underline",
}));

const PopoverContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "480px",
  maxHeight: "400px",
  "& .file-type-section": {
    marginBottom: theme.spacing(1.5),
    "& .file-type-title": {
      textTransform: "capitalize",
      fontWeight: 500,
      marginBottom: theme.spacing(0.5),
    },
    "& .file-type-list": {
      margin: 0,
      paddingLeft: theme.spacing(0.5),
      listStyle: "none",
      "& li": {
        marginBottom: theme.spacing(0.5),
        "& code": {
          fontWeight: 600,
          marginRight: theme.spacing(1),
        },
      },
    },
  },
}));
