import React, { useEffect, useState } from "react";
import TopBar from "../../components/bars/TopBar";
import Table from "../../components/table/Table";
import TableTop from "../../pages/Hotel/TableTopHotel";
import AddBank from "../../components/popup/AddBank";
import DeleteBank from "../../components/popup/DeleteBank";
import axios from "../../axios";

const Bank = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bankAdded, setBankAdded] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [tableHeader, setTableHeader] = useState([
    "Bank Name",
    "Address",
    "Contact Number",
  ]);

  const [data, setData] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const getBanks = async () => {
      setIsLoading(true);
      await axios
        .get("/bank/getBanks")
        .then((res) => {
          setBanks(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getBanks();
  }, [bankAdded]);

  return (
    <div className="w-full">
      <TopBar title="Banks" />
      <div className="p-1 sm:p-6 py-6">
        <div className="mb-6">
          <TableTop
            setData={setData}
            type="Banks"
            button="Add Bank"
            setShowPopup={() => setShowPopup(true)}
            search="bank"
          />
          {isLoading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : banks.length === 0 ? (
            <p className="text-center text-gray-500">No suppliers to show</p>
          ) : (
            <Table
              tableHeader={tableHeader}
              data={banks}
              setData={setBanks}
              cell2={null}
              cell3="address"
              cell4="contactNumber"
              selectedNo={0}
              setShowPopup={setShowPopup}
              setShowEditPopup={setShowEditPopup}
              setUpdateData={setUpdateData}
              setShowDeletePopup={setShowDeletePopup}
              isUser={false}
            />
          )}
        </div>
      </div>

      {showPopup && (
        <AddBank
          onClose={() => setShowPopup(false)}
          heading="Add Bank"
          setAdded={setBankAdded}
        />
      )}

      {showEditPopup && (
        <AddBank
          onClose={() => setShowEditPopup(false)}
          heading="Update Bank"
          setAdded={setBankAdded}
          updateData={updateData}
        />
      )}

      {showDeletePopup && (
        <DeleteBank
          onClose={() => setShowDeletePopup(false)}
          heading="Delete Bank"
          setAdded={setBankAdded}
          id={updateData.id}
        />
      )}
    </div>
  );
};

export default Bank;
