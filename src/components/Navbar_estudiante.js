import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/DashboardEstudiante.module.css";

const NavbarEstudiante = () => {
  const router = useRouter();
  const [headerColor, setHeaderColor] = useState("#FF8C00");

  useEffect(() => {
    // Leer el color desde el localStorage al cargar la página
    const storedColor = localStorage.getItem("headerColor");
    if (storedColor) {
      setHeaderColor(storedColor);
    }
  }, []);

  const handleRedirect = (path) => {
    router.push(path);
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setHeaderColor(color);
    // Guardar el color seleccionado en localStorage
    localStorage.setItem("headerColor", color);
  };

  return (
    <header className={styles.header} style={{ backgroundColor: headerColor }}>
      <img
        src="/logo.png"
        alt="Universidad Politécnica de Quintana Roo"
        className={styles.logo}
      />
      <nav className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={() => handleRedirect("/dashboardEstudiante")}
        >
          <img src="/icon_inicio.png" alt="Inicio" className={styles.navIcon} />
          <span className={styles.navText}>Inicio</span>
        </button>
        <button
          className={styles.navButton}
          onClick={() => handleRedirect("/")}
        >
          <img src="/salida.png" alt="Salir" className={styles.navIcon} />
          <span className={styles.navText}>Salir</span>
        </button>
        {/* Selector de color */}
        <label htmlFor="colorPicker" className={styles.colorPickerButton}>
          <img
            src="/cambio_color.png"
            alt="Cambiar color"
            className={styles.colorPickerIcon}
            style={{
              width: "50px",
              height: "50px",
            }} /* Ajusta el tamaño aquí */
          />
        </label>
        <input
          id="colorPicker"
          type="color"
          value={headerColor}
          onChange={handleColorChange}
          className={styles.colorPickerInput}
        />
      </nav>
    </header>
  );
};

export default NavbarEstudiante;
