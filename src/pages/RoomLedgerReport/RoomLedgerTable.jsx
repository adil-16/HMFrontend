import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LedgerTable = ({ tableHeader, data = [], setData }) => {
  const navigate = useNavigate();
  console.log(data);

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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalCost = currentItems.reduce(
    (acc, item) => acc + (item.cost || 0),
    0
  );
  const totalSellingPrice = currentItems.reduce(
    (acc, item) => acc + (item.sellingPrice || 0),
    0
  );

  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto"
        style={{ minWidth: "350px", overflowX: "auto" }}
      >
        <table className="w-full">
          <thead className="bg-white3 p-4 bg-orange">
            <tr className="font-sans p-6">
              <th className="p-2 text-center w-8 lg:w-20">
                <div onClick={selectAllData}>
                  {/* <CheckboxLabel check={selectAll} bg="white" /> */}
                </div>
              </th>
              {tableHeader.map((val, ind) => (
                <th
                  className="text-left sm:ml-4 font-Nunitoo text-12 text-medium text-white2 p-6"
                  key={ind}
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="border-b border-blue5" key={index}>
                <td className="p-2 text-left w-8 lg:w-20">
                  <div onClick={() => selectData(index)}>
                    {/* <CheckboxLabel check={item.isSelected} bg="white" /> */}
                  </div>
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-12 whitespace-nowrap">
                  {item?.date}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                  {item?.cost}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-2">
                  {item?.sellingPrice}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-2">
                  {item?.profit}
                </td>
                <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-2">
                  {item?.booking}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-sans p-6">
              <td className="p-2 text-left w-8 lg:w-20"></td>
              <td className="p-2 text-left w-8 lg:w-20"></td>
              <td className="p-2 text-left w-8 lg:w-20"></td>
              <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left">
                Total Cost: {totalCost}
              </td>
              <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left">
                Total Selling Price: {totalSellingPrice}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-between my-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2 border border-white rounded-lg bg-orange focus:outline-none hover:border-gray2"
          >
            <p className="font-Nunitoo text-white text-12 md:text-16">
              Previous
            </p>
          </button>
          <div className="flex justify-center my-2">
            <p className="font-Nunitoo text-white text-10 md:text-14 font-medium">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= data.length}
            className="px-4 py-2 border border-gray2 rounded-lg bg-orange focus:outline-none hover:border-white"
          >
            <p className="font-Nunitoo text-white text-12 md:text-16">Next</p>
          </button>
        </div>
      </div>
    </div>
  );
};
