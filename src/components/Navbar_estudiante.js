import { useRouter } from "next/router";
import styles from "@/styles/DashboardEstudiante.module.css";

const NavbarEstudiante = () => {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <header className={styles.header}>
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
          onClick={() => handleRedirect("/perfil")}
        >
          <img src="/icon_perfil.png" alt="Perfil" className={styles.navIcon} />
          <span className={styles.navText}>Perfil</span>
        </button>
      </nav>
    </header>
  );
};

export default NavbarEstudiante;
