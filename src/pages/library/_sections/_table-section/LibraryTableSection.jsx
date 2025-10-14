import Table from "@/components/table/Table";
import useDashboardParams from "../../../../hooks/useDashboardParams";
import AssetActionsCell from "./_cells/AssetActionsCell";
import AssetTypeCell from "./_cells/AssetTypeCell";
import AssetURLCell from "./_cells/AssetUrlCell";

const columns = [
  { label: "Title", value: "title", width: 250, wrap: true },
  {
    label: "Type",
    width: 120,
    disableSorting: true,
    renderCell: (row) => <AssetTypeCell type={row.type} />,
  },
  {
    label: "URL",
    width: 300,
    disableSorting: true,
    renderCell: (row) => <AssetURLCell url={row.url} />,
  },
  {
    label: "Filename",
    value: "filename",
    disableSorting: true,
  },
  {
    label: "",
    disableSorting: true,
    renderCell: () => {
      return <AssetActionsCell />;
    },
  },
];

function LibraryTableSection({ assets = [], fetchState }) {
  const { filterParams, updateParams } = useDashboardParams();
  return (
    <Table
      rows={assets}
      columns={columns}
      page={filterParams.page || 0}
      pageSize={filterParams.pageSize || 10}
      fetchState={fetchState}
      onChangePage={(page) => updateParams({ page })}
      onChangePageSize={(pageSize) => updateParams({ pageSize, page: 0 })}
    />
  );
}

export default LibraryTableSection;
