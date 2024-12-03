import { useRouter } from "next/router";

const NavbarTutor = () => {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <header style={styles.header}>
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
        <button
          style={styles.navButton}
          onClick={() => handleRedirect("/perfil")}
        >
          <img src="/icon_perfil.png" alt="Perfil" style={styles.navIcon} />
          <span style={styles.navText}>Perfil</span>
        </button>
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
};

export default NavbarTutor;
