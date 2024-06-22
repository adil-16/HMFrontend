
import Dashboard from '../assets/sidebar/dashIcon.svg'
import User from "../assets/sidebar/userIcon.svg"
import Store from '../assets/sidebar/storeIcon.svg'
import Setting from '../assets/sidebar/settingsIcon.svg'
import Logout from '../assets/sidebar/logout.svg'

export default [
 
    {
      name: "Dashboard",
      link: "/admin",
      icon: Dashboard,
      select: true,
    },
    {
      name: "Users",
      link: "/admin/user",
      icon: User,
      select: false,
    },
    {
      name: "Hotels",
      link: "/admin/hotel",
      icon: Store,
      select: false,
    },
    {
      name: "Settings",
      link: "/admin/settings",
      icon: Setting,
      select: false,
    },
    {
      name: "Logout",
      link: "/",
      icon: Logout,
      select: false,
    }
  ];
  