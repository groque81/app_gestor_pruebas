import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Nombre, setUsername] = useState("");
  const [Clave, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Datos enviados:", { Nombre, Clave });  // Verifica lo que estás enviando

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nombre, Clave }), // Enviamos los datos como JSON
      });

      if (response.ok) {
        const message = await response.text();
        console.log("Login exitoso:", message);
        Navigate("/dashboard")
        // Aquí puedes redirigir al usuario o manejar la sesión
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Ocurrió un error. Intenta nuevamente.");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="Nombre">Usuario:</label>
        <input
          type="text"
          id="Nombre"
          value={Nombre}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
          style={styles.input}
        />

        <label style={styles.label} htmlFor="Clave">Contraseña:</label>
        <input
          type="password"
          id="Clave"
          value={Clave}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Ingresar</button>
      </form>

      {error && <p style={styles.error}>{error}</p>} {/* Muestra un error si ocurre */}
    </div>
  );
}

// Estilos en línea (inline CSS)
const styles = {
  loginContainer: {
    backgroundColor: "#fff",
    padding: "300px",
    borderRadius: "30px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "30px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
  signupLink: {
    marginTop: "20px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};
export {Login};