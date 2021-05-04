import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CrudForm from './components/CrudForm';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [usr, setUsr] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route 
          exact path='/'
          render={(props) => (
            <LoginForm {...props} 
            setEmail={setEmail}
            setUsr={setUsr} />
          )}
        />
        <Route 
          path='/cadastro'
          render={(props) => (
            <CrudForm {...props} 
            newProfile={true} />
          )}
        />
        <Route 
          path='/perfil'
          render={(props) => (
            <CrudForm {...props} 
            newProfile={false}
            email={email}
            usr={usr} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/**
 * CORS SOLUTIONS 
 * 1
 * Right click on desktop, add new shortcut.
 * Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp.
 * Click OK. 
 * 
 * 2
 * Wrap the data api, using CORS on node.js backend * 
 * 
 */
