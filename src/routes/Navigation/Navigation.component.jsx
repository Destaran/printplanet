import { NavDiv, Header, NavBar, NavLink } from "./Navigation.styles";
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";
import { signOutAuthUser } from '../../utils/firestore/firestore';

const Navigation = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOutAuthUser();
        navigate('/login');
    }

    const { currentUser } = useContext(UserContext);
    return (
        <>
            <NavDiv>
                <Header>PrintPlanet</Header>
                <NavBar>
                    {currentUser ? (
                        <>
                            <NavLink as='span' onClick={handleLogout}>
                                Logout
                            </NavLink>
                            <NavLink to='/profile'>Profile</NavLink>
                        </>
                    ) : (
                        <NavLink to='/login'>Login</NavLink>
                    )}
                    <NavLink to='/calculator'>Calculator</NavLink>
                    <NavLink to='/blueprints'>Blueprints</NavLink>
                </NavBar>
            </NavDiv>
            <Outlet />
        </>
    )
}

export default Navigation;