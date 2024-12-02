import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    // Inline CSS styles
    const containerStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
    };

    const titleStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        overflow: 'hidden',
    };

    const thStyle = {
        padding: '12px',
        textAlign: 'left',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#4CAF50',
    };

    const tdStyle = {
        padding: '12px',
        textAlign: 'left',
        fontSize: '1rem',
        color: '#555',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
    };

    const rowHoverStyle = {
        backgroundColor: '#f1f1f1',
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Employee Details</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Field</th>
                        <th style={thStyle}>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={rowHoverStyle}>
                        <td style={tdStyle}>Name</td>
                        <td style={tdStyle}>{employee.name}</td>
                    </tr>
                    <tr style={rowHoverStyle}>
                        <td style={tdStyle}>Department</td>
                        <td style={tdStyle}>{employee.department}</td>
                    </tr>
                    <tr style={rowHoverStyle}>
                        <td style={tdStyle}>Position</td>
                        <td style={tdStyle}>{employee.position}</td>
                    </tr>
                    <tr style={rowHoverStyle}>
                        <td style={tdStyle}>salary</td>
                        <td style={tdStyle}>{employee.salary}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDetails;
