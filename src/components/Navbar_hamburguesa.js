import React, { useState } from "react";
import { useRouter } from "next/router";

const NavbarHamburguesa = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRedirect = (path) => {
    router.push(path);
  };

  // Función para verificar si la ruta actual es la misma que el path de un ítem
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <nav style={{ ...navStyle, width: menuOpen ? "250px" : "100px" }}>
      <ul style={navListStyle}>
        <div style={navItemStyle} onClick={toggleMenu}>
          <img src="/path-to-menu-icon.png" alt="Menu" style={iconStyle} />
        </div>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/dashboard") ? "#A2641B" : "transparent", // Cambia el color si está activo
          }}
          onClick={() => handleRedirect("/dashboard")}
        >
          <img src="/inicio-hamburguesa.png" alt="Inicio" style={iconStyle} />
          {menuOpen && <span>Inicio</span>}
        </li>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/usuarios") ? "#A2641B" : "transparent", // Cambia el color si está activo
          }}
          onClick={() => handleRedirect("/usuarios")}
        >
          <img src="/path-to-user-icon.png" alt="Usuarios" style={iconStyle} />
          {menuOpen && <span>Usuarios</span>}
        </li>
        <li
          style={{
            ...navItemStyle,
            backgroundColor: isActive("/informes") ? "#A2641B" : "transparent", // Cambia el color si está activo
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
              : "transparent", // Cambia el color si está activo
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

        {/* Botón rectangular con bordes redondeados al final */}
        <li
          style={{
            ...navItemStyle,
            position: "absolute",
            bottom: "50px", // Mueve el botón un poco más arriba (ajusta este valor según lo necesites)
            width: "100%",
            padding: "0", // Elimina el padding para que ocupe todo el ancho
          }}
          onClick={() => handleRedirect("/")}
        >
          {/* Botón rectangular con imagen */}
          <div
            style={{
              width: "100%", // Ocupa todo el ancho
              padding: "10px 0", // Ajusta la altura
              backgroundColor: "#007BFF", // Fondo oscuro
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px", // Bordes redondeados
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FF8C00"; // Hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#007BFF"; // Vuelve al color original
            }}
          >
            {menuOpen ? (
              <>
                <img
                  src="/cerrar_perfil.png"
                  alt="Nuevo Botón"
                  style={{
                    width: "20px", // Ícono más pequeño
                    height: "20px",
                    filter: "invert(1)", // Hace el ícono blanco
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
                  width: "25px", // Ícono solo
                  height: "25px",
                  filter: "invert(1)", // Hace el ícono blanco
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
  position: "fixed", // Fija el menú en su posición
  left: 0,
  top: "80.4px", // Asegúrate de que no sobrepase el encabezado si hay uno
  width: "60px", // Ancho mínimo del menú
  height: "calc(100% - 80.4px)", // Calcula la altura restante de la ventana
  backgroundColor: "#FF8C00",
  transition: "width 0.3s ease",
  paddingTop: "20px",
  overflow: "hidden", // Evita que el contenido se desborde
  zIndex: 1000, // Coloca el menú encima de otros elementos
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

export default NavbarHamburguesa;
