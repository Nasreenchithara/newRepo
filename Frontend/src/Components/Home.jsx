
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import config from "../Config";
import StudentForm from "./StudentForm";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get(`${config.apiURL}/auth/getemail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmail(response.data.email);
      } catch (err) {
        setError("Failed to fetch email");
        console.error(err);
      }
    };

    fetchUserEmail();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/students/allstudents`);
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    }
  };

  const handleStudentAdded = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents(students.map((student) => (student._id === updatedStudent._id ? updatedStudent : student)));
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student); // Pass student details to the form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiURL}/students/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Welcome to My Project</h1>
        <button onClick={fetchStudents}>Task Details</button>
        <a href="/" className="navbar-link" onClick={toggleSidebar}>Login</a>
      </nav>

      {sidebarOpen && (
        <div className="sidebar">
          <a href="/register" className="sidebar-link">Register</a>
          <button className="close-btn" onClick={toggleSidebar}>X</button>
        </div>
      )}

      <div className="content">
        {error && <p className="error">{error}</p>}
        {email ? <p>Logged in as: {email}</p> : <p>Loading email...</p>}
      </div>

      {/* Student Registration Form */}
      <StudentForm studentToEdit={editingStudent} onStudentAdded={handleStudentAdded} onStudentUpdated={handleStudentUpdated} />

      <div className="content">
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.age} years - {student.className} - {student.email}
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No task found. Click "Task Details" to load.</p>
        )}
      </div>
    </div>
  );
}

export default Home;