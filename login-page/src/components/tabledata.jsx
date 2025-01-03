import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    grade: "",
    minAge: "",
    maxAge: "",
  });
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/students", {
        params: {
          ...filters,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      });
      setStudents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#444" }}>Students List</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <option value="">Filter by Department</option>
          <option value="ComputerScience">Computer Science</option>
          <option value="Electrical and Electronic">Electrical and Electronic</option>
          <option value="Agriculture">Agriculture</option>
          <option value="ECE">ECE</option>
          <option value="Information technology">Information Technology</option>
        </select>

        <select
          name="grade"
          value={filters.grade}
          onChange={handleFilterChange}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
        >
          <option value="">Grade</option>
          <option value="A">A</option>
          <option value="A+">A+</option>
          <option value="O">O</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <input
          name="minAge"
          type="number"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "150px",
          }}
        />

        <input
          name="maxAge"
          type="number"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "150px",
          }}
        />

        <button
          onClick={fetchStudents}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Apply Filters
        </button>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          onClick={() => handleSort("Grade")}
          style={{
            padding: "10px",
            margin: "0 10px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort by Grade
        </button>
        <button
          onClick={() => handleSort("Age")}
          style={{
            padding: "10px",
            margin: "0 10px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort by Age
        </button>
        <button
          onClick={() => handleSort("Cgpa")}
          style={{
            padding: "10px",
            margin: "0 10px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Sort by CGPA
        </button>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Department
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Grade</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>CGPA</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Phone No
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Department}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Grade}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Cgpa}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Phone_no}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {student.Age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
