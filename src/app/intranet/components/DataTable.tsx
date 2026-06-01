export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

export default function DataTable<T extends { id: number | string }>({
  columns,
  data,
  actions,
}: {
  columns: Column<T>[];
  data: T[];
  actions?: (row: T) => React.ReactNode;
}) {
  if (data.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        Nu există înregistrări.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={String(col.header)} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-3 font-semibold">Acțiuni</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row) => (
            <tr key={row.id} className="bg-white hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={String(col.header)} className="px-4 py-3 text-gray-700">
                  {typeof col.accessor === "function"
                    ? col.accessor(row)
                    : String(row[col.accessor] ?? "")}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
