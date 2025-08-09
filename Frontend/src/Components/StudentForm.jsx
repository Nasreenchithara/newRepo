import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";  // Ensure the correct path for your config file

function StudentForm({ studentToEdit, onStudentAdded, onStudentUpdated }) {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    className: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  // If a student is selected for editing, populate the form
  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  // Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage(""); // Clear previous messages

      // Basic validation
      if (!student.name || !student.age || !student.className || !student.email) {
        setMessage("Please fill in all fields.");
        return;
      }

      let response;
      if (student._id) {
        // Update student
        response = await axios.put(`${config.apiURL}/students/students/${student._id}`, student);
        setMessage("Student updated successfully!");
        onStudentUpdated(response.data);
      } else {
        // Add new student
        response = await axios.post(`${config.apiURL}/students/studentspost`, student);
        setMessage("Student added successfully!");
        onStudentAdded(response.data);
      }

      // Clear form after submission
      setStudent({ name: "", age: "", className: "", email: "" });
    } catch (err) {
      setMessage("Error processing request.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{student._id ? "Edit Student" : "Add Task"}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter the Title"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="age"
          placeholder="Description"
          value={student.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="className"
          placeholder="Status"
          value={student.className}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {student._id ? "Update Student" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
