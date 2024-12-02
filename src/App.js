import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import './App.css';




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<EmployeeForm />} />
                <Route path="/employees/edit/:id" element={<EmployeeForm />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                
            </Routes>
        </Router>
    );
}

export default App;