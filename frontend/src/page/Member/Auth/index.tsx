import './styles.css';
import { Route, Switch } from 'react-router-dom';

import Login from '../Login';

const Auth = () =>{

    return(
        <div className="auth-container">
            <div className="auth-form-container">
                <Switch>
                    <Route path="/movie/auth/login">
                        <Login />
                    </Route>
                    <Route path="/movie/auth/signup">
                        <h1>Card de SignUp</h1>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Auth;