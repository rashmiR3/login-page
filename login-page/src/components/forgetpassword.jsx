import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forgot-password", { email });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to send reset link!");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#FFC107",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
