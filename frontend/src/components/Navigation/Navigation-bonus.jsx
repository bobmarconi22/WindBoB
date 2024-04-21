import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const redirect = useNavigate()
  const createNewSpot = () => {
    redirect('/spots/new')
  }

  return (
    <>
    <div id='nav-spacer'></div>
    <nav>
        <NavLink to="/"><img id='logo' src="/windbob.png" alt="windbob logo"/></NavLink>
        <button id='new-spot-btn' onClick={createNewSpot}>New Spot</button>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
    </nav>
    </>

  );
}

export default Navigation;
