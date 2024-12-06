import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [navbarColor, setNavbarColor] = useState("#FF8C00");

  useEffect(() => {
    // Leer el color desde el localStorage al cargar la página
    const storedColor = localStorage.getItem("navbarColor");
    if (storedColor) {
      setNavbarColor(storedColor);
    }
  }, []);

  const handleColorChange = (event) => {
    const color = event.target.value;
    setNavbarColor(color);
    // Guardar el color seleccionado en localStorage
    localStorage.setItem("navbarColor", color);
  };

  return (
    <header style={{ ...header, backgroundColor: navbarColor }}>
      <img
        src="/logo.png"
        alt="Universidad Politécnica de Quintana Roo"
        style={logo}
      />
      <nav style={nav}>
        {/* Botón para mostrar el selector de color */}
        <label htmlFor="sidebarColorPicker" style={colorIconButton}>
          <img
            src="/cambio_color.png"
            alt="Cambiar color"
            style={{ ...colorIcon, width: "50px", height: "50px" }} // Aquí ajustas el tamaño
          />
        </label>
        <input
          id="colorPicker"
          type="color"
          value={navbarColor}
          onChange={handleColorChange}
          style={colorInput}
        />
      </nav>
    </header>
  );
};

// Estilos CSS
const header = {
  width: "100%",
  backgroundColor: "#FF8C00",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
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
};

const colorIconButton = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const colorInput = {
  display: "none",
  position: "absolute",
  top: "10px",
  right: "10px",
};

const colorIcon = {
  width: "30px", // Tamaño del icono
  height: "30px",
};

const navIcon = {
  width: "20px",
};

export default Navbar;
