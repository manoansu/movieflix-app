import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import './styles.css';


const Member = () =>{

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

    return (
        <div className="movie-container">
            <div className="movie-content">
                <h1>Tela listagem de filmes</h1>
                { authContextData.authenticated ? (
                <>
                    <Link to="/movies/1">
                        <div className="movie-content-link">
                            <h6>Acessar/movies/1</h6>
                        </div>
                    </Link>
                    <Link to="/movies/2">
                        <div className="movie-content-link-2">
                            <h6>Acessar/movies/2</h6>
                        </div>
                    </Link>
                </>
                ) : (
                    <Redirect to="/" />
                )}
            </div>
        </div>
    );
};

export default Member;