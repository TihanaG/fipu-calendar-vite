import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            FIPU <span>Calendar</span> App
          </h1>
          <p>Studentica: Tihana Glavaš, 0303010993</p>
          <p>
            Naslov diplomskog rada: Izrada web aplikacije za upravljanje
            kalendarom djelatnika fakulteta
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="Calendar" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
