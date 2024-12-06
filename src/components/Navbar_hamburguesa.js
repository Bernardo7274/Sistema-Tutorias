import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const NavbarHamburguesa = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarColor, setSidebarColor] = useState("#FF8C00");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRedirect = (path) => {
    router.push(path);
  };

  const isActive = (path) => {
    return router.pathname === path;
  };

  useEffect(() => {
    const storedSidebarColor = localStorage.getItem("hamburgerSidebarColor");
    if (storedSidebarColor) {
      setSidebarColor(storedSidebarColor);
    }
  }, []);

  const handleSidebarColorChange = (event) => {
    const color = event.target.value;
    setSidebarColor(color);
    localStorage.setItem("hamburgerSidebarColor", color);
  };

  return (
    <nav
      style={{
        ...navStyle,
        width: menuOpen ? "250px" : "100px",
        backgroundColor: sidebarColor,
      }}
    >
      <ul style={navListStyle}>
        <div style={navItemStyle} onClick={toggleMenu}>
          <img src="/path-to-menu-icon.png" alt="Menu" style={iconStyle} />
        </div>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/dashboard") ? "#A2641B" : "transparent",
          }}
          onClick={() => handleRedirect("/dashboard")}
        >
          <img src="/inicio-hamburguesa.png" alt="Inicio" style={iconStyle} />
          {menuOpen && <span>Inicio</span>}
        </li>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/usuarios") ? "#A2641B" : "transparent",
          }}
          onClick={() => handleRedirect("/usuarios")}
        >
          <img src="/path-to-user-icon.png" alt="Usuarios" style={iconStyle} />
          {menuOpen && <span>Usuarios</span>}
        </li>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/informes") ? "#A2641B" : "transparent",
          }}
          onClick={() => handleRedirect("/informes")}
        >
          <img
            src="/path-to-reports-icon.png"
            alt="Informes"
            style={iconStyle}
          />
          {menuOpen && <span>Informes</span>}
        </li>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/resumenGeneral")
              ? "#A2641B"
              : "transparent",
          }}
          onClick={() => handleRedirect("/resumenGeneral")}
        >
          <img
            src="/path-to-summary-icon.png"
            alt="Resumen General"
            style={iconStyle}
          />
          {menuOpen && <span>Resumen General</span>}
        </li>
        {/* Icono para cambiar el color */}
        <li
          style={{
            ...navItemStyle,
            padding: "10px 20px",
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <label htmlFor="sidebarColorPicker" style={colorIconButton}>
            <img
              src="/cambio_color.png"
              alt="Cambiar color"
              style={{ ...colorIcon, width: "50px", height: "50px" }} // Aquí ajustas el tamaño
            />
          </label>

          <input
            id="sidebarColorPicker"
            type="color"
            value={sidebarColor}
            onChange={handleSidebarColorChange}
            style={colorInput}
          />
        </li>
        {/* Botón rectangular con bordes redondeados al final */}
        <li
          style={{
            ...navItemStyle,
            position: "absolute",
            bottom: "90px",
            width: "100%",
            padding: "0",
          }}
          onClick={() => handleRedirect("/")}
        >
          <div
            style={{
              width: "100%",
              padding: "10px 0",
              backgroundColor: "#007BFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FF8C00";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#007BFF";
            }}
          >
            {menuOpen ? (
              <>
                <img
                  src="/cerrar_perfil.png"
                  alt="Nuevo Botón"
                  style={{
                    width: "20px",
                    height: "20px",
                    filter: "invert(1)",
                  }}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  Salir
                </span>
              </>
            ) : (
              <img
                src="/cerrar_perfil.png"
                alt="Nuevo Botón"
                style={{
                  width: "25px",
                  height: "25px",
                  filter: "invert(1)",
                }}
              />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

// Estilos CSS existentes

const navStyle = {
  position: "fixed",
  left: 0,
  top: "80.4px",
  width: "60px",
  height: "calc(100% - 80.4px)",
  backgroundColor: "#FF8C00",
  transition: "width 0.3s ease",
  paddingTop: "20px",
  overflow: "hidden",
  zIndex: 1000,
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

const colorIconButton = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const colorIcon = {
  width: "30px", // Tamaño del icono
  height: "30px",
};

const colorInput = {
  display: "none",
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default NavbarHamburguesa;
