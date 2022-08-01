//core
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';
//user defined
import {
  AddTodoPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
  NotFound,
} from './components/pages';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />}></Route>
            <Route path="/loguser" element={<LoginPage />}></Route>
            <Route path="/reguser" element={<RegisterPage />}></Route>
            <Route path="/addtodo" element={<AddTodoPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
