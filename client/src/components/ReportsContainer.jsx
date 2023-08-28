import ReportItem from "./ReportItem";
import {
  FaSuitcaseRolling,
  FaHome,
  FaCalendarCheck,
  FaFirstAid,
} from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import { BsAirplaneFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ReportsContainer";

const ReportsContainer = ({ defaultReports }) => {
  const reports = [
    {
      title: "Rad",
      count: defaultReports?.rad || 0,
      icon: <FaSuitcaseRolling />,
      color: "#647acb",
      bcg: "#e7ecff",
    },
    {
      title: "Rad od kuće",
      count: defaultReports?.rad_od_kuce || 0,
      icon: <FaHome />,
      color: "#a26ad6",
      bcg: "#f3e6ff",
    },
    {
      title: "Bolovanje",
      count: defaultReports?.bolovanje || 0,
      icon: <FaFirstAid />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
    {
      title: "Službeni put",
      count: defaultReports?.sluzbeni_put || 0,
      icon: <BsAirplaneFill />,
      color: "#67b3d6",
      bcg: "#e0e8f9",
    },
    {
      title: "Godišnji",
      count: defaultReports?.godisnji || 0,
      icon: <GiPalmTree />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
  ];

  return (
    <Wrapper>
      {reports.map((item, index) => {
        return <ReportItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default ReportsContainer;
