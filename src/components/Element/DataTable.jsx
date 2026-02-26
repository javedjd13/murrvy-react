const DataTables = ({ data = [], columns = [] }) => {
  const rows = Array.isArray(data) ? data : [];
  const cols = Array.isArray(columns) ? columns : [];

  if (!rows.length || !cols.length) {
    return null;
  }

  return (
    <table className="table product-table">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={row?.id ?? rowIndex}>
            {cols.map((column, columnIndex) => {
              const cellValue =
                typeof column?.selector === "function"
                  ? column.selector(row)
                  : "";

              return <td key={`${row?.id ?? rowIndex}-${columnIndex}`}>{cellValue}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTables;
