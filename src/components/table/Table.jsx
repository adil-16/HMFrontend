import React, { useState } from "react";
import { CheckboxLabel } from "../checkbox/CheckBoxWhite";
import Avatar from "../../assets/Avatar.svg";
import bin from "../../assets/bin.svg";
import pen from "../../assets/pen.svg";
import { useNavigate } from "react-router-dom";

const Table = ({
  tableHeader,
  data = [],
  setData,
  cell2,
  cell3,
  cell4,
  setSelectedNo,
  link,
  setShowEditPopup,
  setUpdateData,
  setShowDeletePopup,
  setShowLedgerPopup,
}) => {
  const navigate = useNavigate();
  const [url] = useState(import.meta.env.VITE_API_URL);

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const selectAllData = () => {
    let dataCopy = [...data];
    data.map((val, index) => {
      if (!selectAll) {
        dataCopy[index].isSelected = true;
        setData(dataCopy); // Update the state with the modified data
        setSelectedNo(dataCopy.length);
      } else {
        dataCopy[index].isSelected = false;
        setData(dataCopy); // Update the state with the modified data
        setSelectedNo(0);
      }
    });

    setSelectAll((prev) => !prev);
  };
  const navigateToInventory = ({ value }) => {
    navigate(link, { state: { name: value } });
  };

  const selectData = (index) => {
    let dataCopy = [...data]; // Make a shallow copy of data
    dataCopy[index].isSelected = !dataCopy[index].isSelected;
    setData(dataCopy); // Update the state with the modified data
    setSelectedNo((prev) => (dataCopy[index].isSelected ? prev + 1 : prev - 1));
    if (link) {
      console.log("in if", dataCopy[index].name);
      navigateToInventory({ value: dataCopy[index].name }); // Pass an object with 'value' property
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!data) {
    return null; // Or some loading indicator
  }
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto"
        style={{ minWidth: "350px", overflowX: "auto" }} // Add this style
      >
        <table className="w-full">
          <thead className="bg-white3 ml-2 p-4 bg-orange">
            <tr className="font-sans p-6 ">
              <th className="p-2 text-center w-8 lg:w-20">
                <div onClick={() => selectAllData()}>
                  <CheckboxLabel check={selectAll} bg="white" />
                </div>
              </th>
              {tableHeader.map((val, ind) => {
                return (
                  <th
                    className="text-left ml-2 sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 "
                    key={ind}
                  >
                    {val}
                  </th>
                );
              })}
              <th className="font-Nunitoo text-12 text-medium text-white2 ml-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {currentItems.map((val, ind) => {
              const dataIndex = indexOfFirstItem + ind;
              return (
                <tr className="border-b border-blue5" key={dataIndex}>
                  <td className="p-2 text-left w-8 lg:w-20">
                    <div onClick={() => selectData(dataIndex)}>
                      <CheckboxLabel check={val.isSelected} bg="white" />
                    </div>
                  </td>
                  {/* cell 2 */}
                  <td className="w-auto sm:60 md:w-80">
                    <div className="flex justify-left py-2">
                      {/* profile pic */}
                      {/* {val.image && ( */}
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray rounded-full ">
                        {val.image == null ? (
                          <img
                            src={Avatar}
                            className="object-cover w-full h-full rounded-full"
                            alt=""
                          />
                        ) : (
                          <img
                            src={`${url}${val.image}`}
                            className="object-cover w-full h-full rounded-full"
                            alt=""
                          />
                        )}
                      </div>
                      {/* )} */}

                      <div className="flex flex-col  justify-center ml-1 lg:ml-3">
                        <p className="font-Nunitoo text-12 lg:text-15 text-medium text-white">
                          {val.name}
                        </p>
                        <p className="font-Nunitoo text-10 lg:text-14 text-medium text-orange">
                          {val[cell2]}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* 3rd cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                    {val[cell3]}
                  </td>
                  {/* 4th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val[cell4]}
                  </td>
                  {/* 5th cell */}
                  <td className="font-Nunitoo text-16 text-medium text-white py-2 text-center">
                    <div className="flex items-center justify-center ml-2">
                      <div className="mr-0.2 sm:mr-2">
                        <img
                          src={bin}
                          alt=""
                          className="cursor-pointer"
                          onClick={() => {
                            setUpdateData(val);
                            setShowDeletePopup(true);
                          }}
                        />
                      </div>
                      <img
                        src={pen}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          setUpdateData(val);
                          setShowEditPopup(true);
                        }}
                      />
                      <button
                        className="bg-orange text-white py-1 px-2 rounded-md ml-6"
                        onClick={() => {
                          setUpdateData(val);
                          setShowLedgerPopup(true);
                        }}
                      >
                        Show Ledger
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between my-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2  border border-white rounded-lg bg-orange focus:outline-none hover:border-gray2"
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
            className="px-4 py-2 border border-gray2 rounded-lg bg-orange focus:outline-none  hover:border-white"
          >
            <p className="font-Nunitoo text-white text-12 md:text-16">Next</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

export const LedgerTable = ({ tableHeader, data = [], setData }) => {
  const navigate = useNavigate();

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const selectAllData = () => {
    let dataCopy = [...data];
    data.map((val, index) => {
      if (!selectAll) {
        dataCopy[index].isSelected = true;
        setData(dataCopy); // Update the state with the modified data
        setSelectedNo(dataCopy.length);
      } else {
        dataCopy[index].isSelected = false;
        setData(dataCopy); // Update the state with the modified data
        setSelectedNo(0);
      }
    });

    setSelectAll((prev) => !prev);
  };
  const navigateToInventory = ({ value }) => {
    navigate(link, { state: { name: value } });
  };

  const selectData = (index) => {
    let dataCopy = [...data]; // Make a shallow copy of data
    dataCopy[index].isSelected = !dataCopy[index].isSelected;
    setData(dataCopy); // Update the state with the modified data
    setSelectedNo((prev) => (dataCopy[index].isSelected ? prev + 1 : prev - 1));
    if (link) {
      console.log("in if", dataCopy[index].name);
      navigateToInventory({ value: dataCopy[index].name }); // Pass an object with 'value' property
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!data) {
    return null; // Or some loading indicator
  }
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full">
      <div
        className="rounded-lg border border-solid border-gray border-opacity-20 bg-black overflow-x-auto"
        style={{ minWidth: "350px", overflowX: "auto" }} // Add this style
      >
        <table className="w-full">
          <thead className="bg-white3 ml-2 p-4 bg-orange">
            <tr className="font-sans p-6 ">
              <th className="p-2 text-center w-8 lg:w-20">
                <div onClick={() => selectAllData()}>
                  <CheckboxLabel check={selectAll} bg="white" />
                </div>
              </th>
              {tableHeader.map((val, ind) => {
                return (
                  <th
                    className="text-left ml-2 sm:ml-4 font-Nunitoo text-12 text-medium text-white2 ml-2 "
                    key={ind}
                  >
                    {val}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {currentItems.map((val, ind) => {
              const dataIndex = indexOfFirstItem + ind;
              return (
                <tr className="border-b border-blue5" key={dataIndex}>
                  <td className="p-2 text-left w-8 lg:w-20">
                    <div onClick={() => selectData(dataIndex)}>
                      <CheckboxLabel check={val.isSelected} bg="white" />
                    </div>
                  </td>
                  {/* cell 2 */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                    {val.date}
                  </td>
                  {/* 3rd cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left pr-0.5">
                    {val.type}
                  </td>
                  {/* 4th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.trans}
                  </td>
                  {/* 5th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.particulars}
                  </td>
                  {/* 6th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.inv}
                  </td>
                  {/* 7th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.cheque}
                  </td>
                  {/* 8th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.debit}
                  </td>
                  {/* 9th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.credit}
                  </td>
                  {/* 10th cell */}
                  <td className="font-Nunitoo text-12 lg:text-16 text-medium text-white py-2 text-left ml-2">
                    {val.balance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between my-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-4 py-2  border border-white rounded-lg bg-orange focus:outline-none hover:border-gray2"
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
            className="px-4 py-2 border border-gray2 rounded-lg bg-orange focus:outline-none  hover:border-white"
          >
            <p className="font-Nunitoo text-white text-12 md:text-16">Next</p>
          </button>
        </div>
      </div>
    </div>
  );
};
