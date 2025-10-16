import {
  Card,
  ClickAwayListener,
  FormControl,
  MenuItem,
  Popper,
  Select,
  styled,
  Typography,
} from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";

const FilterCardStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  minWidth: "400px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  borderRadius: theme.spacing(1.5),
  "& .title-row": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  "& .filters-list": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
}));

function FiltersPopper({
  isOpen,
  anchorEl,
  onClose,
  onChange,
  onReset,
  filters,
}) {
  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement="bottom-end"
      style={{ zIndex: 1300 }}
    >
      <ClickAwayListener
        onClickAway={(e) => {
          if (
            e.target.style.overflowX === "hidden" ||
            e.target.style.overflowY === "hidden" ||
            e.target.className === "inside-menu"
          ) {
            return;
          }
          onClose();
        }}
      >
        <FilterCardStyled>
          <div className="title-row">
            <Typography variant="h6" fontWeight={600}>
              Filter
            </Typography>
            <Button
              onClick={onReset}
              startIcon={
                <EurekaIcon
                  name="reset"
                  fontSize="small"
                  color="text.secondary"
                />
              }
            >
              Reset
            </Button>
          </div>

          <div className="filters-list">
            {/* Tour Type Filter */}
            <div>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Tour Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={filters.tourType}
                  classes={{
                    root: "some-class",
                  }}
                  MenuProps={{
                    slotProps: {
                      backdrop: {
                        className: "inside-menu",
                      },
                    },
                  }}
                  onChange={(e) => onChange("tourType")(e.target.value)}
                >
                  <MenuItem value="all" className="inside-menu">
                    All Types
                  </MenuItem>
                  <MenuItem value="guided" className="inside-menu">
                    Guided
                  </MenuItem>
                  <MenuItem value="free-roam" className="inside-menu">
                    Free Roam
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Status Filter */}
            <div>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Status
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={filters.status}
                  MenuProps={{
                    slotProps: {
                      backdrop: {
                        className: "inside-menu",
                      },
                    },
                  }}
                  onChange={(e) => onChange("status")(e.target.value)}
                >
                  <MenuItem value="all" className="inside-menu">
                    All Status
                  </MenuItem>
                  <MenuItem value="published" className="inside-menu">
                    Published
                  </MenuItem>
                  <MenuItem value="draft" className="inside-menu">
                    Draft
                  </MenuItem>
                  <MenuItem value="archived" className="inside-menu">
                    Archived
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </FilterCardStyled>
      </ClickAwayListener>
    </Popper>
  );
}

export default FiltersPopper;
