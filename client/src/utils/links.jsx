import { FaBusinessTime, FaCalendarAlt } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import { IoBarChartSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";

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
    text: "vacation request",
    path: "vacation-request",
    icon: <GiPalmTree />,
  },
  {
    id: 4,
    text: "my requests",
    path: "my-requests",
    icon: <FaBusinessTime />,
  },
  {
    id: 5,
    text: "monthly report",
    path: "monthly-report",
    icon: <IoBarChartSharp />,
  },
  {
    id: 6,
    text: "vacation requests",
    path: "vacation-requests",
    icon: <FaBusinessTime />,
  },
  {
    id: 7,
    text: "profile",
    path: "profile",
    icon: <MdManageAccounts />,
  },
];

export default links;
