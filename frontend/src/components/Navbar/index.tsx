import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getTokenData, isAuthenticated } from '../../util/auth';
import history from '../../util/history';
import { removeAuthData } from '../../util/storage';
import './styles.css';

const Navbar = () =>{

    const { authContextData, setAuthContextData } = useContext(AuthContext);
    useEffect(() =>{
        if(isAuthenticated()){
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData()
                
            });           
        }
        else{
            setAuthContextData({
                authenticated: false
            })
        }
    }, [setAuthContextData]);

    const handleLogOutClick = (event: React.MouseEvent<HTMLAnchorElement>)  =>{
        event.preventDefault();
        removeAuthData();
        setAuthContextData({
            authenticated: false,
        });
        history.replace('/');
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark  main-nav"> 
            <div className="container-fluid"> 
                <Link to="/" className="nav-logo-text"> 
                    <h4>MovieFlix</h4> 
                </Link> 
                {authContextData.authenticated ? (
                    <>
                    <div className="nav-login-logout">
                        <a href="#logout" onClick={handleLogOutClick}>SAIR</a>
                    </div> 
                    </>
                ):
                (
                    <>
                    <Link to="/movie/auth/login" />
                    </>
                )}
                
            </div> 
        </nav>
    );
};

export default Navbar;