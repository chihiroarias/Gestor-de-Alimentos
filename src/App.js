import './App.css';
import Registro from './componentes/Registro';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import { Provider } from 'react-redux';
import { store } from "./Store/store";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './componentes/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Registro" element={<Registro />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>   
     
    </Provider>
  );
}

export default App;
