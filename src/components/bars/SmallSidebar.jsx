import React, { useState, useContext, useEffect } from "react";
import Logo from "../../assets/sidebar/arrow.png";
import { NavLink } from "react-router-dom";
import DashRoutes from "../../constants/sidebarRoutes";
import { AuthContext } from "../../App";

const SmallSidebar = () => {
  const [Dash, setDash] = useState(DashRoutes);
  
  const { setHideSidebar } = useContext(AuthContext);


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
    <div className={`fixed h-screen bg-black px-3 flex flex-col w-18 border-r border-r-white`}>
      <div className="flex justify-center mt-4 p-2 items-center"
      onClick={()=> setHideSidebar(true)}>
        <img src={Logo} alt="logo" width={30} />
      </div>

      <div className="flex flex-col justify-between mt-12 w-full">
        {Dash.map((val, ind) => (
          <div key={ind}>
            <NavLink to={val.link}>
              <div
                className={`flex rounded-md  w-full p-3 mt-2 ${
                  val.select && "bg-orange"
                } cursor-pointer`}
                onClick={(e) => {
                  changeRoute(ind);
                }}
              >
                <div className="flex ml-3">
                  <img src={val.icon} alt={val.name} width={18} />
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

export default SmallSidebar;
