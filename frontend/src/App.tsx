import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';

const App = () => {

  // atualiza a autenticaação na tela de todos o contexto global..
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });
    return (
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
      </AuthContext.Provider>
  );
 }

export default App;
