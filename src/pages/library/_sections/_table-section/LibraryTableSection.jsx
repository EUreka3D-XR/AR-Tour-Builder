import Table from "@/components/table/Table";
import useDashboardParams from "../../../../hooks/useDashboardParams";
import AssetActionsCell from "./_cells/AssetActionsCell";
import AssetTypeCell from "./_cells/AssetTypeCell";
import AssetURLCell from "./_cells/AssetUrlCell";

const columns = [
  { label: "Title", value: "title", width: 250, wrap: true },
  {
    label: "Type",
    value: "type",
    width: 120,
    disableSorting: true,
    renderCell: (row) => <AssetTypeCell type={row.type} />,
  },
  {
    label: "URL",
    value: "url",
    width: 300,
    disableSorting: true,
    renderCell: (row) => <AssetURLCell url={row.url} />,
  },
  {
    label: "Filename",
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
];

function LibraryTableSection({ assets = [], total, fetchState }) {
  const { filterParams, updateParams } = useDashboardParams();
  return (
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
  );
}

export default LibraryTableSection;
