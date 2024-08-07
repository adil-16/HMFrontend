import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LedgerTable = ({ tableHeader, data = [], setData, loading }) => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const selectAllData = () => {
    const dataCopy = data.map((item) => ({
      ...item,
      isSelected: !selectAll,
    }));
    setData(dataCopy);
    setSelectAll(!selectAll);
  };

  const selectData = (index) => {
    const dataCopy = [...data];
    dataCopy[index].isSelected = !dataCopy[index].isSelected;
    setData(dataCopy);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const handleGoToStart = () => {
    setCurrentPage(1);
  };

  const handleGoToEnd = () => {
    setCurrentPage(totalPages);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <p className="text-white font-Nunitoo text-16">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto"
        style={{ minWidth: "350px", overflowX: "auto" }}
      >
        <table className="w-full">
          <thead className="bg-white3 bg-orange">
            <tr className="font-sans p-6">
              <th className="p-2 text-center w-8 lg:w-20">
                <div onClick={selectAllData}>
                  {/* <CheckboxLabel check={selectAll} bg="white" /> */}
                </div>
              </th>
              {tableHeader.map((val, ind) => (
                <th
                  className="text-left sm:ml-4 font-Nunitoo text-12 text-lg py-8"
                  key={ind}
                >
                  {val === "Profit/(Loss)" ? (
                    <>
                      Profit/
                      <span style={{ color: "red" }}>(Loss)</span>
                    </>
                  ) : (
                    val
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr className="border-b border-blue5" key={index}>
                  <td className="p-6 text-left w-8 lg:w-20">
                    <div onClick={() => selectData(index)}>
                      {/* <CheckboxLabel check={item.isSelected} bg="white" /> */}
                    </div>
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-12 whitespace-nowrap">
                    {item?.date}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-0.5">
                    {item?.cost?.toFixed(2)}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-2">
                    {item?.sellingPrice?.toFixed(2)}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-2">
                    {item?.profit?.toFixed(2)}
                  </td>
                  <td className="font-Nunitoo text-12 lg:text-lg text-white py-2 text-left pr-2">
                    {item?.booking}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between my-2">
          <div className="flex gap-2">
            <button
              onClick={handleGoToStart}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 border border-white rounded-lg bg-orange focus:outline-none hover:border-gray2"
            >
              <p className="font-Nunitoo text-white text-12 md:text-16">
                Go to Start
              </p>
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-white rounded-lg bg-orange focus:outline-none hover:border-gray2"
            >
              <p className="font-Nunitoo text-white text-12 md:text-16">
                Previous
              </p>
            </button>
          </div>
          <div className="flex justify-center my-2">
            <p className="font-Nunitoo text-white text-10 md:text-14 font-medium">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              className="px-4 py-2 border border-gray2 rounded-lg bg-orange focus:outline-none hover:border-white"
            >
              <p className="font-Nunitoo text-white text-12 md:text-16">Next</p>
            </button>
            <button
              onClick={handleGoToEnd}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray2 rounded-lg bg-orange focus:outline-none hover:border-white"
            >
              <p className="font-Nunitoo text-white text-12 md:text-16">
                Go to End
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
