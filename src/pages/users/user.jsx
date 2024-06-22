import React, { useEffect, useState } from "react";
import TopBar from "../../components/bars/TopBar";
import Table from "../../components/table/Table";
import TableTop from "../../components/TableTop/TableTop";
import AddUser from "../../components/popup/addUser";
import DeleteUser from "../../components/popup/DeleteUser";
import axios from "../../axios";
import ShowLedgerPopup from "../../components/popup/ShowLedger";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLedgerPopup, setShowLedgerPopup] = useState(false);

  const [customerAdded, setCustomerAdded] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [tableHeader, setTableHeader] = useState([
    "Customer",
    "Phone Number",
    "Role",
  ]);

  const [selectedNo, setSelectedNo] = useState(0);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/user/getUsers")
        .then((res) => {
          setData(res.data.data.user);
        })
        .catch((err) => {
          // Handle error
          console.error(err);
        });
    };
    getUsers();
  }, [customerAdded]);

  const handleShowLedger = (fromDate, toDate) => {
    console.log("Show Ledger for dates:", fromDate, toDate);

    axios
      .get(`ledger/filterLedger/${selectedUserId}`, {
        params: {
          from: fromDate,
          to: toDate,
        },
      })
      .then((res) => {
        console.log("Filtered Ledger Data: ", res.data);
        const totalBalance = res.data.ledgers.length > 0 ? res.data.ledgers[0].totalBalance : 0;
        navigate("/admin/ledger", { 
          state: {
            ledgerData: res.data.ledgers,
            userName: selectedUser, 
            totalBalance,
            fromDate,
            toDate,
          },
        });
        console.log("res data", res.data.ledgers)
        console.log("balance", totalBalance)
      })
      .catch((err) => {
        console.error(err);
      });
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
            setShowLedgerPopup={(id, name, role) => {
              setSelectedUserId(id);
              setSelectedUser(name);
              setSelectedRole(role);
              setShowLedgerPopup(true);
            }}
          />
        </div>
      </div>

      {showPopup && (
        <AddUser
          onClose={() => setShowPopup(false)}
          heading="Add Customer"
          setAdded={setCustomerAdded}
          guest={false}
        />
      )}

      {showEditPopup && (
        <AddUser
          onClose={() => setShowEditPopup(false)}
          heading="Update Customer"
          setAdded={setCustomerAdded}
          updateData={updateData}
        />
      )}

      {showDeletePopup && (
        <DeleteUser
          onClose={() => setShowDeletePopup(false)}
          heading="Delete Customer"
          setAdded={setCustomerAdded}
          id={updateData.id}
        />
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
