import React, { useEffect, useState } from "react";
import TopBar from "../../components/bars/TopBar";
import Table from "../../components/table/Table";
import TableTop from "../../components/TableTop/TableTop";
import AddUser from "../../components/popup/addUser";
import DeleteUser from "../../components/popup/DeleteUser";
import axios from "../../axios";
import ShowLedgerPopup from "../../components/popup/ShowLedger";

const User = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLedgerPopup, setShowLedgerPopup] = useState(false);

  const [customerAdded, setCustomerAdded] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [tableHeader, setTableHeader] = useState([
    "Customer",
    "Phone Number",
    "Role",
  ]);

  const [selectedNo, setSelectedNo] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/user/getUsers")
        .then((res) => {
          setData(res.data.data.user);
        })
        .catch((err) => {
          // //   setCategoryapi(true)
          // setLoader(false)
          //   setError(err.response.data.data.error);
        });
    };
    getUsers();
  }, [customerAdded]);

  const handleShowLedger = (fromDate, toDate) => {
    console.log("Show Ledger for dates:", fromDate, toDate);
    // You can navigate to the ledger page or fetch data here
  };

  return (
    <div className="w-full">
      <TopBar title="Users" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6">
        <TableTop
          selectedNo={selectedNo}
          setData={setData}
          type="Customers"
          button="+ Add Customer"
          setShowPopup={setShowPopup}
          search="user"
        />
        <div className="mx-1">
          <Table
            tableHeader={tableHeader}
            data={data}
            setData={setData}
            cell2="email"
            cell3="phone"
            cell4="role"
            selectedNo={selectedNo}
            setSelectedNo={setSelectedNo}
            setShowPopup={setShowPopup}
            setShowEditPopup={setShowEditPopup}
            setUpdateData={setUpdateData}
            setShowDeletePopup={setShowDeletePopup}
            setShowLedgerPopup={setShowLedgerPopup}
          />
        </div>
      </div>

      {showPopup && (
        <>
          <AddUser
            onClose={() => setShowPopup(false)}
            heading="Add Customer"
            setAdded={setCustomerAdded}
            guest={false}
          />
        </>
      )}

      {showEditPopup && (
        <>
          <AddUser
            onClose={() => setShowEditPopup(false)}
            heading="Update Customer"
            setAdded={setCustomerAdded}
            updateData={updateData}
          />
        </>
      )}

      {showDeletePopup && (
        <>
          <DeleteUser
            onClose={() => setShowDeletePopup(false)}
            heading="Delete Customer"
            setAdded={setCustomerAdded}
            id={updateData.id}
          />
        </>
      )}

      {showLedgerPopup && (
        <ShowLedgerPopup
          onClose={() => setShowLedgerPopup(false)}
          onSubmit={handleShowLedger}
        />
      )}
    </div>
  );
};

export default User;
