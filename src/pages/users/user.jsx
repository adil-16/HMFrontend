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
  

  const [customerAdded, setCustomerAdded] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [tableHeader, setTableHeader] = useState([
    "User",
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


  return (
    <div className="w-full">
      <TopBar title="Users" />
      {/* body */}
      <div className="p-1 sm:p-4 py-6">
        <TableTop
          selectedNo={selectedNo}
          setData={setData}
          type="Customers"
          button="Add User"
          setShowPopup={setShowPopup}
          search="user"
        />
        <div className="mx-1">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No users to show</p>
          ) : (
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
            />
          )}
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
    </div>
  );
};

export default User;
