import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import { Provider } from 'react-redux';
import { store } from "./Store/store";

function App() {
  return (
    <Provider store={store}>

      <hr/>
      <Registro />
      <hr/>
     
    </Provider>
  );
}

export default App;
// <Dashboard />
// <Login />
//    