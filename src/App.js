import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CrudForm from './components/CrudForm';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route 
          path='/login'
          component={LoginForm}
        />
        <Route 
          path='/dados'
          component={CrudForm}
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
 * Wrap the data api, using CORS on node.js backend
 * 
 * 
 */
