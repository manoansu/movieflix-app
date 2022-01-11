import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import Form from './Movies/Form';
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
            
            { authContextData.authenticated ? (
                <Form />
            ) : (
                <Redirect to="/" />
            )}
            
        </div>
    );
};

export default Member;