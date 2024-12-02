import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/DashboardEstudiante.module.css";

export default function DashboardEstudiante() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");

    if (storedNombre && storedRol) {
      setNombre(storedNombre);
      setRol(storedRol);
    }
  }, []);

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="/logo.png"
          alt="Universidad Politécnica de Quintana Roo"
          className={styles.logo}
        />
        <nav className={styles.nav}>
          <button
            className={styles.navButton}
            onClick={() => handleRedirect("/inicio")}
          >
            <img src="/icon_inicio.png" alt="Inicio" className={styles.navIcon} />
            <span className={styles.navText}>Inicio</span>
          </button>
          <button
            className={styles.navButton}
            onClick={() => handleRedirect("/cierre")}
          >
            <img src="/icon_cierre.png" alt="Cierre" className={styles.navIcon} />
            <span className={styles.navText}>Cierre</span>
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

      <main className={styles.main}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.welcomeText}>
            Bienvenido {nombre} con rol {rol}
          </h1>
        </div>
        <div className={styles.iconContainer}>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/registro_estudiante")}
          >
            <img
              src="/R_RegistroEstudiante.png"
              alt="Registro de Estudiante"
              className={styles.icon}
            />
            <p className={styles.iconText}>Registro de Estudiante</p>
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
