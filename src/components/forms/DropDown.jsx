import React, { useState } from "react";
import Avatar from "../../assets/Avatar.svg";

const DropdownMenu = ({users, selectedUser, setSelectedUser}) => {


  const handleSelectChange = (e) => {
    console.log("in select change", e.target.value)
    const selectedUserId = e.target.value; // Convert value to integer (assuming user IDs are numbers)
    const selectedUser = users.find((user) => user.name == selectedUserId); // Find user object based on selected ID
    setSelectedUser(selectedUser); // Update selectedUser with the selected user object
  };

  return (
    <select
      value={selectedUser ? selectedUser._id : ""}
      onChange={handleSelectChange}
      className="rounded-lg p-3"
    >
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          <div className="flex gap-x-1">
            <img src={Avatar} alt={"abb"} className="h-10 w-10" />
            <p>{user.name}</p>
          </div>
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
