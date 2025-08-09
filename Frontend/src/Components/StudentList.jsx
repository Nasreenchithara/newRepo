import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../Config";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${config.apiURL}/students/studentspost`).then((res) => {
      setStudents(res.data);
    });
  }, []);
 
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.age} - {student.className}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
