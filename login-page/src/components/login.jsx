import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/logindetails", {
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Login failed!");
    }
  };

  const styles = {
    parentcont: { 
      marginTop: "80px" },
    container: {
      display: "flex",
      width: "900px",
      margin: "50px auto",
      backgroundColor: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
    left: {
      flex: 1,
      background: "linear-gradient(120deg, #6A1E55, #CB9DF0)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      textAlign: "center",
    },
    right: {
      flex: 1,
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "25px",
      backgroundColor: "#7A1CAC",
      color: "#fff",
      fontSize: "16px",
      borderRadius: "25px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#1e3c72",
      color: "#fff",
      padding: "10px",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
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
        <div style={styles.left}>
          <h2>Welcome Back!</h2>
          <p>Don't have an account? Sign Up Now.</p>
          <button style={styles.button} onClick={() => navigate("/signup")}>
            SIGNUP
          </button>
        </div>
        <div style={styles.right}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              plac                    eholder="Password"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.button} onClick={() => navigate("/tabledata")} >
              Sign In
            </button>
          </form>
          <button
            onClick={() => navigate("/forgot-password")}
            style={styles.button}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      
        </div>
        </div>
  );
}

export default Login;