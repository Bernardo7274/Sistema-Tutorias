import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");
    const storedcorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedRol && storedcorreoElectronico) {
      setNombre(storedNombre);
      setRol(storedRol);
      setcorreoElectronico(storedcorreoElectronico);
    }
  }, []);

  return (
    <div style={container}>
      <Navbar />
      <NavbarHamburguesa />
      <main style={main}>
        <h1 style={welcomeText}>
          Bienvenido {nombre} con rol {rol}
        </h1>
      </main>
    </div>
  );
}

// Estilos CSS existentes

const navStyle = {
  position: "fixed",
  left: 0,
  top: "80.4px",
  width: "60px",
  height: "100%",
  backgroundColor: "#FF8C00",
  transition: "width 0.3s ease",
  paddingTop: "20px",
  overflow: "hidden",
};

const navListStyle = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  color: "#000",
  cursor: "pointer",
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease",
  whiteSpace: "nowrap",
};

const iconStyle = {
  width: "50px",
  height: "50px",
  marginRight: "10px",
};

const container = {
  fontFamily: "'Montserrat', sans-serif",
  backgroundColor: "#f0f0f0",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const main = {
  textAlign: "center",
  paddingTop: "90px",
};

const welcomeText = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#000000",
};
