import React from "react";

interface TableProps {
  headers: {
    key: string;
    label: string;
  }[];
  data: any[];
}

export function Table({ headers, data }: TableProps) {

  const renderHeaders = headers.map((header) => {
    return (
      <th 
        key={header.key}
        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
      >
        {header.label}
      </th>
    );
  });

  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              {renderHeaders}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data}
          </tbody>
        </table>
      </div>
    </div>
  );
}