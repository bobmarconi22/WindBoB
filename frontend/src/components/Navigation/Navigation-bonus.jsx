import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navigate = useNavigate();
  const createNewSpot = () => {
    navigate("/spots/new");
  };

  return (
    <>
      <div id="nav-spacer"></div>
      <nav style={{ zIndex: 1001 }}>
        <NavLink to="/">
          <img id="logo" src="/windbob.png" alt="windbob logo" />
        </NavLink>
        {sessionUser && (
          <button id="new-spot-btn" onClick={createNewSpot}>
            Create A New Spot
          </button>
        )}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </nav>
    </>
  );
}

export default Navigation;
