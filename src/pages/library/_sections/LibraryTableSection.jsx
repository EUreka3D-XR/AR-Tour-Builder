import Table from "@/components/table/Table";
import useDashboardParams from "../_utils/useDashboardParams";

const columns = [
  { label: "Title", value: "title", width: 250 },
  { label: "Type", value: "type", disableSorting: true },
  { label: "Url", value: "url", disableSorting: true },
  {
    label: "Filename",
    value: "filename",
    disableSorting: true,
  },
  { label: "Source", value: "source", disableSorting: true },
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
