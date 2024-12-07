import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#FF8C00");

  useEffect(() => {
    const storedHeaderColor = localStorage.getItem("headerBackgroundColor");
    if (storedHeaderColor) {
      setHeaderBackgroundColor(storedHeaderColor);
    }
  }, []);

  const handleHeaderColorChange = (event) => {
    const color = event.target.value;
    setHeaderBackgroundColor(color);
    localStorage.setItem("headerBackgroundColor", color);
  };

  return (
    <header style={{ ...header, backgroundColor: headerBackgroundColor }}>
      <img
        src="/logo.png"
        alt="Universidad Politécnica de Quintana Roo"
        style={logo}
      />
      <nav style={nav}>
        <div style={colorPickerContainer}>
          <label htmlFor="headerColorPicker" style={colorPickerLabelStyle}>
            <img
              src="/cambio_color.png"
              alt="Cambiar color"
              style={{ ...colorIconStyle, width: "50px", height: "50px" }}
            />
          </label>
          <input
            id="headerColorPicker"
            type="color"
            value={headerBackgroundColor}
            onChange={handleHeaderColorChange}
            style={colorInputStyle}
          />
        </div>
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
  alignItems: "center",
  gap: "20px",
};

// Estilos del selector de colores
const colorPickerContainer = {
  display: "flex",
  alignItems: "center",
};

const colorPickerLabelStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

const colorIconStyle = {
  width: "30px",
  height: "30px",
};

const colorInputStyle = {
  display: "none",
};

export default Navbar;
