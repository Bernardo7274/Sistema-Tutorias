import { useEffect, useState } from "react";
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from "../styles/ResumenGeneral.module.css";
import { FaUserGraduate, FaSignInAlt } from "react-icons/fa";
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function ResumenGeneral() {
  const [courses, setCourses] = useState([]);
  // Solo permitimos acceso al Administrador
  useAuth(["Administrador"]);

  useEffect(() => {
    // Obtener los cursos desde la API
    const fetchCourses = async () => {
      const response = await fetch("/api/getCourses"); // Llamada al endpoint de la API
      const data = await response.json();
      setCourses(data); // Guardamos los cursos en el estado
    };

    fetchCourses();
  }, []);

  return (
    <div
      style={{
        marginTop: "80px",
        marginLeft: "60px", // Asegura que el contenido principal no quede cubierto
        transition: "margin-left 0.3s ease",
      }}
    >
      <div className={styles.container}>
        <Navbar />
        <NavbarHamburguesa />
        <div className={styles.cardsContainer}>
          {courses.map((course) => (
            <div key={course.ID} className={styles.card}>
              <img
                src="/asignatura.png"
                alt={course.Profesor}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  <strong>Maestro:</strong> {course.Nombre}
                </h3>
                <p className={styles.cardText}>
                  <strong>Programa:</strong> {course.Programa}
                </p>
                <p className={styles.cardText}>
                  <strong>Grupo:</strong> {course.Grupo}
                </p>
                <p className={styles.cardText}>
                  <strong>Cuatrimestre:</strong> {course.Cuatrimestre}
                </p>
                <p className={styles.cardText}>
                  <strong>Periodo:</strong> {course.Periodo}
                </p>
                <div className={styles.footer}>
                  <div className={styles.studentCount}>
                    <FaUserGraduate className={styles.icon} />
                    {course.NumAlumnos} alumnos
                  </div>
                  <a
                    href={`/grupo/${course.Grupo}`}
                    className={styles.enterButton}
                  >
                    <FaSignInAlt className={styles.icon} /> Entrar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
