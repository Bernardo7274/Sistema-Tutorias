// components/Navbar.js
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
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
          aria-label="Ir a inicio"
        >
          <img src="/notificacion.png" alt="Inicio" style={navIcon} />
        </button>
        <button
          style={navButton}
          onClick={() => handleRedirect("/inicio")}
          aria-label="Ir a inicio"
        >
          <img src="/edit_perfil_admin.png" alt="Inicio" style={navIcon} />
        </button>
      </nav>
    </header>
  );
};

// Estilos CSS modificados

const header = {
  width: "100%",
  backgroundColor: "#FF8C00",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  position: "fixed",  // Fija el navbar en la parte superior
  top: 0,  // Asegura que esté en la parte superior de la página
  left: 0,  // Alinea a la izquierda de la pantalla
  right: 0,  // Alinea a la derecha de la pantalla
  zIndex: 1000,  // Asegura que el navbar esté por encima de otros elementos
};

const logo = {
  height: "60px",
};

const nav = {
  display: "flex",
  gap: "20px",
};

const navButton = {
  backgroundColor: "#ffffff",
  border: "2px solid #FF8C00",
  borderRadius: "10px",
  padding: "10px", 
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const navIcon = {
  width: "24px", 
  height: "24px",  
};

export default Navbar;
