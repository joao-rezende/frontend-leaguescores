import React from "react";
import PropTypes from "prop-types";

// components

export default function CardTable({ color, titleTable, columns, lines, Line }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-gray-800 text-white")
        }
      >

        <div className={"rounded-t mb-0 px-4 py-3 border-0 " + (!titleTable ? "hidden" : "")}>
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {titleTable ?? ""}
              </h3>
            </div>
          </div>
        </div>
        <div className={"block w-full overflow-x-auto " + (!titleTable ? "rounded-t" : "")}>
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {columns.map((column, key) => (
                  <th
                    key={key} className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-gray-700 text-white border-gray-600")
                    }
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lines.map((line, key) => (
                <Line key={key} data={line} color={color} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "dark",
  columns: [],
  lines: [],
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
