import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import Table from "@/components/table/Table";
import useDashboardParams from "@/hooks/useDashboardParams";
import AssetActionsCell from "./_cells/AssetActionsCell";
import AssetTypeCell from "./_cells/AssetTypeCell";
import AssetURLCell from "./_cells/AssetUrlCell";

function LibraryTableSection({ assets = [], total, fetchState }) {
  const { t } = useTranslation();
  const { filterParams, updateParams } = useDashboardParams();

  const columns = useMemo(
    () => [
      {
        label: t("library.table.columns.title"),
        value: "title",
        width: 350,
        wrap: true,
      },
      {
        label: t("library.table.columns.type"),
        value: "type",
        width: 160,
        disableSorting: true,
        renderCell: (row) => <AssetTypeCell type={row.type} />,
      },
      {
        label: t("library.table.columns.url"),
        value: "contentUrl",
        width: 300,
        disableSorting: true,
        renderCell: (row) => <AssetURLCell url={row.contentUrl} />,
      },
      {
        label: t("library.table.columns.filename"),
        value: "filename",
        minWidth: 300,
        disableSorting: true,
      },
      {
        label: "",
        value: "action",
        disableSorting: true,
        width: 150,
        renderCell: (asset) => {
          return <AssetActionsCell assetId={asset.id} />;
        },
      },
    ],
    [t],
  );

  return (
    <Box sx={{ flex: 1 }}>
      <Table
        rows={assets}
        columns={columns}
        page={filterParams.page || 0}
        total={total ?? 0}
        pageSize={filterParams.pageSize || 10}
        fetchState={fetchState}
        onChangePage={(page) => updateParams({ page })}
        onChangePageSize={(pageSize) => updateParams({ pageSize, page: 0 })}
      />
    </Box>
  );
}

export default LibraryTableSection;
