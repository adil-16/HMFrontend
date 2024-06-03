import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashRoutes from "../../constants/sidebarRoutes";

const Sidebar = () => {
  const [Dash, setDash] = useState([]);

  useEffect(() => {
    const storedDash = localStorage.getItem('dash');
    if (!storedDash) {
      localStorage.setItem('dash', JSON.stringify(DashRoutes));
      setDash(DashRoutes);
    } else {
      setDash(JSON.parse(storedDash));
    }
  }, []);

  const changeRoute = (index) => {
    setDash((prevDash) => {
      const newDash = prevDash.map((item, i) => ({
        ...item,
        select: i === index,
      }));

      // Update local storage
      localStorage.setItem('dash', JSON.stringify(newDash));

      // Return new state
      return newDash;
    });
  };

  return (
    <div className={`fixed h-screen bg-black px-3 flex flex-col w-60 border-r border-r-white`}>
      <div className="flex justify-center mt-8 p-2 items-center">
      <p
          className={`font-Nunitoo text-center ml-2 font-semibold text-orange text-24`}
        >
          Hotel Room Booking
        </p>
      </div>

      <div className="flex flex-col justify-between mt-6 w-full">
        {Dash.map((val, ind) => (
          <div key={ind}>
            <NavLink to={val.link}>
              <div
                className={`flex ${
                  val.select ? "rounded-md bg-orange" : ""
                } w-full p-3 mt-1.5 cursor-pointer`}
                onClick={(e) => {
                  changeRoute(ind);
                }}
              >
                <div className="flex ml-3">
                  <img src={val.icon} alt={val.name} width={18} />
                  <p
                    className={`font-Nunitoo text-center ml-2 font-semibold text-white text-opacity-60 text-16`}
                  >
                    {val.name}
                  </p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div></div>

     
    </div>
  );
};

export default Sidebar;
