import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeForm() {
    const [employee, setEmployee] = useState({
        name: '',
        department: '',
        position: '',
        salary: '',
    });
    const { id } = useParams(); // for editing, gets the employee ID from the URL
    const navigate = useNavigate();

    // Fetch employee data if editing an existing employee
    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then((response) => setEmployee(response.data))
                .catch((error) => console.error('Error fetching employee:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = id
                ? await axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                  })
                : await axios.post('http://localhost:5000/api/employees', employee, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                  });

            alert(`Employee ${id ? 'updated' : 'added'} successfully`);
            navigate('/employees'); // Navigate to the employee list page
        } catch (error) {
            console.error('Error saving employee:', error);
            alert('Error saving employee');
        }
    };

    // Inline CSS styles
    const formContainerStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '1.2rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={headingStyle}>{id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    placeholder="Position"
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                    {id ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
}

export default EmployeeForm;
