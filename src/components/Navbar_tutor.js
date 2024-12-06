import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavbarTutor = () => {
  const router = useRouter();
  const [navbarColor, setNavbarColor] = useState("#FF8C00");

  useEffect(() => {
    // Leer el color desde el localStorage al cargar la página
    const storedColor = localStorage.getItem("navbarColorTutor");
    if (storedColor) {
      setNavbarColor(storedColor);
    }
  }, []);

  const handleRedirect = (path) => {
    router.push(path);
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setNavbarColor(color);
    // Guardar el color seleccionado en localStorage
    localStorage.setItem("navbarColorTutor", color);
  };

  return (
    <header style={{ ...styles.header, backgroundColor: navbarColor }}>
      <img
        src="/logo.png"
        alt="Universidad Politécnica de Quintana Roo"
        style={styles.logo}
      />
      <nav style={styles.nav}>
        <button
          style={styles.navButton}
          onClick={() => handleRedirect("/dashboardTutor")}
        >
          <img src="/icon_inicio.png" alt="Inicio" style={styles.navIcon} />
          <span style={styles.navText}>Inicio</span>
        </button>
        <button
          style={styles.navButton}
          onClick={() => handleRedirect("/gruposTutorados")}
        >
          <img
            src="/grupos_tutorados.png"
            alt="Grupos Tutorados"
            style={styles.navIcon}
          />
          <span style={styles.navText}>Grupos Tutorados</span>
        </button>
        <button
          style={styles.navButton}
          onClick={() => handleRedirect("/subirDocumentos")}
        >
          <img
            src="/subir_documentos.png"
            alt="Subir Documentos"
            style={styles.navIcon}
          />
          <span style={styles.navText}>Subir Documentos</span>
        </button>
        <button style={styles.navButton} onClick={() => handleRedirect("/")}>
          <img src="/salida.png" alt="Salir" style={styles.navIcon} />
          <span style={styles.navText}>Salir</span>
        </button>
        {/* Selector de color */}
        <label htmlFor="colorPicker" style={styles.colorPickerButton}>
          <img
            src="/cambio_color.png"
            alt="Cambiar color"
            style={{ ...styles.colorPickerIcon, width: "50px", height: "50px" }}
          />
        </label>
        <input
          id="colorPicker"
          type="color"
          value={navbarColor}
          onChange={handleColorChange}
          style={styles.colorPickerInput}
        />
      </nav>
    </header>
  );
};

const styles = {
  header: {
    width: "100%",
    backgroundColor: "#FF8C00",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "60px",
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center", // Aseguramos que los íconos y botones estén alineados
  },
  navButton: {
    backgroundColor: "#ffffff",
    border: "2px solid #FF8C00",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  navText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
  },

  /* Estilo para el selector de color */
  colorPickerButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  colorPickerInput: {
    display: "none",
  },
  colorPickerIcon: {
    width: "30px" /* Tamaño del icono */,
    height: "30px",
  },
};

export default NavbarTutor;
