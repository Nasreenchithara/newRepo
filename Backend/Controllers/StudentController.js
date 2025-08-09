
const mongoose = require("mongoose");
const Student = require("../models/Student"); 


exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};


exports.addStudent = async (req, res) => {
  const { name, age, className, email } = req.body;

  if (!name || !age || !className || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Student({ name, age, className, email });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};


exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, className, email } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, className, email },
      { new: true }
    );
    
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};


exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
