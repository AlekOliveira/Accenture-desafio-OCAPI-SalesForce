import logo from './logo.svg';
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
