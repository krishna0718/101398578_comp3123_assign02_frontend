import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]); 
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };
        fetchEmployees();
    }, []);

    // Delete an employee by ID
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployees(employees.filter((emp) => emp._id !== id)); 
                alert('Employee deleted successfully');
            } catch (err) {
                console.error('Error deleting employee:', err);
            }
        }
    };

    
    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const headingStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const tableHeaderStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px',
        textAlign: 'left',
    };

    const tableCellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };

    const buttonStyle = {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        margin: '0 5px',
        transition: 'background-color 0.3s',
    };

    const addButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#4CAF50',
    };

    const viewButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#2196F3',
    };

    const updateButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#FF9800',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#F44336',
    };

    const noEmployeesMessageStyle = {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#888',
        padding: '20px 0',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Employee List</h2>
            <button
                style={addButtonStyle}
                onClick={() => navigate('/employees/add')}
            >
                Add Employee
            </button>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Department</th>
                        <th style={tableHeaderStyle}>Position</th>
                        <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td style={tableCellStyle}>{employee.name}</td>
                                <td style={tableCellStyle}>{employee.department}</td>
                                <td style={tableCellStyle}>{employee.position}</td>
                                <td style={tableCellStyle}>
                                   
                                    <button
                                        style={viewButtonStyle}
                                        onClick={() => navigate(`/employees/${employee._id}`)}
                                    >
                                        View
                                    </button>

                                   
                                    <button
                                        style={updateButtonStyle}
                                        onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                    >
                                        Update
                                    </button>

                                    
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={noEmployeesMessageStyle}>
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
