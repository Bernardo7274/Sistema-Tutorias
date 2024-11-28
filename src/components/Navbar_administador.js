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

const nav = {
  display: "flex",
  gap: "20px",
};

const navButton = {
  backgroundColor: "#ffffff",
  border: "2px solid #FF8C00",
  borderRadius: "10px",
  padding: "10px",  // Se ajusta para que los botones sean más pequeños si solo tienen iconos
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const navIcon = {
  width: "24px",  // Ajuste el tamaño del icono
  height: "24px",  // Ajuste el tamaño del icono
};

export default Navbar;
