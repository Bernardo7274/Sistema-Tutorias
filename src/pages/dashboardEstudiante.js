import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarEstudiante from "@/components/Navbar_estudiante"; // Ajusta la ruta según tu estructura
import styles from "@/styles/DashboardEstudiante.module.css";
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function DashboardEstudiante() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const router = useRouter();

  // Solo permitimos acceso al Estudiante
  useAuth(["Estudiante"]);

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
      <NavbarEstudiante /> {/* Agregamos el navbar */}
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
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/grupoEstudiante")}
          >
            <img
              src="/grupo.png"
              alt="Consultar Grupo"
              className={styles.icon}
            />
            <p className={styles.iconText}>Consultar Grupo</p>
          </button>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/subirDocumentoEstudiante")}
          >
            <img
              src="/suibr_documento.png"
              alt="Subir documento"
              className={styles.icon}
            />
            <p className={styles.iconText}>Subir documento</p>
          </button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
