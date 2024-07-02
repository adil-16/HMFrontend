import React, { useEffect, useState } from "react";
import TopBar from "../../components/bars/TopBar";
import Table from "../../components/table/Table";
import TableTop from "../../pages/Hotel/TableTopHotel";
import AddUser from "../../components/popup/addUser";
import DeleteUser from "../../components/popup/DeleteUser";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");

  const [customerAdded, setCustomerAdded] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [tableHeader, setTableHeader] = useState([
    "User",
    "Phone Number",
    "Role",
  ]);

  const [selectedNo, setSelectedNo] = useState(0);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/user/getUsers")
        .then((res) => {
          const allUsers = res.data.data.user;
          setCustomers(allUsers.filter((user) => user.role === "customer"));
          setSuppliers(allUsers.filter((user) => user.role === "supplier"));
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getUsers();
  }, [customerAdded]);

  return (
    <div className="w-full">
      <TopBar title="Users" />
      {/* body */}
      <div className="p-1 sm:p-6 py-6">
        <div className="mb-6">
          <p className="text-24 font-Nunitoo">Customers</p>
          <TableTop
            selectedNo={selectedNo}
            setData={setData}
            type="Customers"
            button="Add Customer"
            setShowPopup={() => {
              setSelectedRole("customer");
              setShowPopup(true);
            }}
            search="user"
          />
          {customers.length === 0 ? (
            <p className="text-center text-gray-500">No customers to show</p>
          ) : (
            <Table
              tableHeader={tableHeader}
              data={customers}
              setData={setCustomers}
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

        <div>
          <p className="text-24 font-Nunitoo">Suppliers</p>
          <TableTop
            selectedNo={selectedNo}
            setData={setData}
            type="Suppliers"
            button="Add Supplier"
            setShowPopup={() => {
              setSelectedRole("supplier");
              setShowPopup(true);
            }}
            search="user"
          />
          {suppliers.length === 0 ? (
            <p className="text-center text-gray-500">No suppliers to show</p>
          ) : (
            <Table
              tableHeader={tableHeader}
              data={suppliers}
              setData={setSuppliers}
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
          heading={
            selectedRole === "customer" ? "Add Customer" : "Add Supplier"
          }
          setAdded={setCustomerAdded}
          role={selectedRole}
        />
      )}

      {showEditPopup && (
        <AddUser
          onClose={() => setShowEditPopup(false)}
          heading="Update User"
          setAdded={setCustomerAdded}
          updateData={updateData}
        />
      )}

      {showDeletePopup && (
        <DeleteUser
          onClose={() => setShowDeletePopup(false)}
          heading="Delete User"
          setAdded={setCustomerAdded}
          id={updateData.id}
        />
      )}
    </div>
  );
};

export default User;
