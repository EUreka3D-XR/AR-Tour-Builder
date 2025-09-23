import Table from "@/components/table/Table";

const columns = [
  { label: "Title", value: "title" },
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
  return <Table rows={assets} columns={columns} fetchState={fetchState} />;
}

export default LibraryTableSection;
