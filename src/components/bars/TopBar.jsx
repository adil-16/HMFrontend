import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/sidebar/threeLines.png";
import { AuthContext } from "../../App";

const TopBar = ({ title }) => {
  const { hideSidebar, setHideSidebar, changeUser } = useContext(AuthContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [changeUser]);

  const [url] = useState(import.meta.env.VITE_API_URL);
  return (
    <div className="flex flex-row p-2 xm:items-center xm:justify-between bg-black width-full shadow-md border-b border-b-white">
      {hideSidebar && (
        <div
          className="block md:hidden flex justify-center items-center"
          onClick={() => setHideSidebar(false)}
        >
          <img src={Logo} alt="logo" className="h-5 w-5 object-cover" />
        </div>
      )}

      <div className="xm:flex-1">
        <div className="flex items-center">
          <p className="font-Nunitoo font-medium text-orange text-14 sm:text-16 md:text-24 p-1">
            {title}
          </p>
        </div>
      </div>
      <div className="xm:flex-1">
        <div className="flex items-center justify-end">
          <div className="flex flex-col">
            <p className="font-Nunitoo text-gray2 font-medium text-12  sm:text-14 md:text-16">
              {user.name}
            </p>
            <p className="font-Nunitoo font-medium  text-10 sm:text-12 text-darkGray">
              {user.email}
            </p>
          </div>
          {/* profile pic */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full mx-3">
            <img
              src={`${url}${user.image}`}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
