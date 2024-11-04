import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");

    if (storedNombre && storedRol) {
      setNombre(storedNombre);
      setRol(storedRol);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div style={container}>
      <header style={header}>
        <img
          src="/logo.png"
          alt="Universidad Politécnica de Quintana Roo"
          style={logo}
        />
        <nav style={nav}>
          <button
            style={navButton}
            onClick={() => handleRedirect("/inicio")}
          >
            <img src="/icon_inicio.png" alt="Inicio" style={navIcon} />
            <span style={navText}>Inicio</span>
          </button>
          <button
            style={navButton}
            onClick={() => handleRedirect("/inicio")}
          >
            <img src="/icon_inicio.png" alt="Inicio" style={navIcon} />
            <span style={navText}>Inicio</span>
          </button>
        </nav>
      </header>

      <nav style={{ ...navStyle, width: menuOpen ? "250px" : "100px" }}>
        <ul style={navListStyle}>
          <div style={navItemStyle} onClick={toggleMenu}>
            <img src="/path-to-menu-icon.png" alt="Menu" style={iconStyle} />
          </div>
          <li
            style={{ ...navItemStyle }}
            onClick={() => handleRedirect("/usuarios")}
          >
            <img
              src="/path-to-user-icon.png"
              alt="Usuarios"
              style={iconStyle}
            />
            {menuOpen && <span>Usuarios</span>}
          </li>
          <li style={navItemStyle} onClick={() => handleRedirect("/dashboard")}>
            <img
              src="/path-to-reports-icon.png"
              alt="Informes"
              style={iconStyle}
            />
            {menuOpen && <span>Informes</span>}
          </li>
          <li style={navItemStyle} onClick={() => handleRedirect("/resumen_general")}>
            <img
              src="/path-to-summary-icon.png"
              alt="Resumen General"
              style={iconStyle}
            />
            {menuOpen && <span>Resumen General</span>}
          </li>
        </ul>
      </nav>

      <main style={main}>
        <h1 style={welcomeText}>
          Bienvenido {nombre} con rol {rol}
        </h1>
      </main>
    </div>
  );
}

// Estilos CSS existentes

const header = {
  width: "100%",
  backgroundColor: "#FF8C00",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
};

const logo = {
  height: "60px",
};

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

const nav = {
  display: "flex",
  gap: "20px",
};

const navButton = {
  backgroundColor: "#ffffff",
  border: "2px solid #FF8C00",
  borderRadius: "10px",
  padding: "10px 20px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const navIcon = {
  width: "20px",
  height: "20px",
  marginRight: "10px",
};

const navText = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
};
