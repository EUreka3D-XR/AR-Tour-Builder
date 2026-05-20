import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { styled } from "@mui/material";

import Button from "../button/Button";
import EurekaIcon from "../icon/EurekaIcon";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "legal-container",
  width: "100vw",
  "& .inner": {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("sm")]: {
      maxWidth: 600,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 900,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1200,
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 1200,
    },
    "& .back-button": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}));

export default function LegalPageTemplate({ file }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then(setContent);
  }, [file]);

  return (
    <ContainerStyled>
      <div className="inner">
        <Button
          variant="text"
          onClick={handleBack}
          startIcon={<EurekaIcon name="back" />}
          className="back-button"
        >
          {t("legal.backToApp")}
        </Button>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </ContainerStyled>
  );
}
