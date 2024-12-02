import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarTutor from "@/components/Navbar_tutor"; // Ajusta la ruta según tu estructura
import styles from "@/styles/DashboardTutor.module.css"; // Importa el módulo CSS

export default function DashboardTutor() {
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
      <NavbarTutor /> {/* Agregamos el navbar */}
      <main className={styles.main}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.welcomeText}>Bienvenido {nombre}</h1>
        </div>
        <div className={styles.iconContainer}>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/registro_de_canalizacion")}
          >
            <img
              src="/R_Canalizacion.png"
              alt="Registro de Canalización"
              className={styles.icon}
            />
            <p className={styles.iconText}>Registro de Canalización</p>
          </button>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/accion_tutoria")}
          >
            <img
              src="/R_AccionTutoria.png"
              alt="Programa Acción Tutoria"
              className={styles.icon}
            />
            <p className={styles.iconText}>Programa Acción Tutoria</p>
          </button>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/tutoria_individual")}
          >
            <img
              src="/R_TutoriaIndividual.png"
              alt="Registro General de Tutoría Individual"
              className={styles.icon}
            />
            <p className={styles.iconText}>
              Registro General de Tutoría Individual
            </p>
          </button>
          <button
            className={styles.iconBox}
            onClick={() => handleRedirect("/cierre_del_Pat")}
          >
            <img
              src="/icon_cierre.png"
              alt="Informe del cierre del PAT"
              className={styles.icon}
            />
            <p className={styles.iconText}>Informe del cierre del PAT</p>
          </button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
