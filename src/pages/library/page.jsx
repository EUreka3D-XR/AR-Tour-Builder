import { styled } from "@mui/material";

import FiltersSection from "./_sections/LibraryFiltersSection";
import HeaderSection from "./_sections/LibraryHeaderSection";
import TableSection from "./_sections/LibraryTableSection";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

function LibraryPage() {
  return (
    <ContainerStyled>
      <HeaderSection />
      <FiltersSection />
      <TableSection />
    </ContainerStyled>
  );
}

export default LibraryPage;
