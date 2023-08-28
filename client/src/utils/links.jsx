import { FaBusinessTime, FaCalendarAlt } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "Calendar",
    path: "",
    icon: <FaCalendarAlt />,
  },
  {
    id: 2,
    text: "reports",
    path: "reports",
    icon: <IoBarChartSharp />,
  },
  {
    id: 3,
    text: "profile",
    path: "profile",
    icon: <MdManageAccounts />,
  },
  {
    id: 4,
    text: "vacation request",
    path: "vacation-request",
    icon: <FaBusinessTime />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
  {
    id: 4,
    text: "all vacation requests",
    path: "all-vacation-requests",
    icon: <FaBusinessTime />,
  },
];

export default links;
