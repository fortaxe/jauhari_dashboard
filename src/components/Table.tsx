import React from "react";

interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return <div>No columns provided</div>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data provided</div>;
  }

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-white">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="border-none p-4 text-left text-[#145DA1] text-base font-normal rounded-[15px_15px_0px_0px]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-[#f9fafb]" : "bg-white"}`}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="border-none p-4">
                    {row[column] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
