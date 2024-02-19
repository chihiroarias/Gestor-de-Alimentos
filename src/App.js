import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import { Provider } from 'react-redux';
import { store } from "./Store/store";
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>

      <hr/>
        <Login />
        <Dashboard />
      <hr/>
     
    </Provider>
  );
}

export default App;
//   <Registro />
// 
//     
/*<Router>
<Routes>
<Route path="/" element={<Dashboard />}/> 
</Routes>
</Router>*/