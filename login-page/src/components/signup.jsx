import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
  

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(" http://127.0.0.1:8000/signup", { name, email, password });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };const styles = {
    parentcont:{
      marginTop:'100px'
    },
    container: {
      display: 'flex',
      width: '900px',
      margin: '50px auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      // boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    },
    box: {
      display: "flex",
      width: "800px",
      height: "400px",
      backgroundColor: "#ffffff",
      // boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      overflow: "hidden",
    },
    left: {
      flex: 1,
      background: "linear-gradient(120deg, #6A1E55, #CB9DF0)",
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      textAlign: 'center',
    },
    right: {
      flex: 1,
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    switchButton: {
      backgroundColor: '#fff',
      color: '#1e3c72',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
   button: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: 'none',
      backgroundColor: '#7A1CAC',
      color: '#fff',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  
  };



return (
  <div style={{
    backgroundImage: `url('./src/assets/purple.jpg')`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
  <div style={styles.parentcont}>
  <div style={styles.container}>
    <div style={styles.box}>
      <div style={styles.left}>
        <h2>Welcome!</h2>
        <p>Already have an account?</p>
      <button style={styles.switchButton} onClick={() => navigate('/')}>
      LOGIN
    </button>
    </div>
      <div style={styles.right}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            style={styles.input}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
      </div>
    </div>
  </div>
  </div>
  </div>
);
}

export default Signup;




