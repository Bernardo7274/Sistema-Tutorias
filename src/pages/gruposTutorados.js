import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar_tutor";
import styles from "@/styles/GruposTutorados.module.css";
import { FaUserGraduate, FaSignInAlt } from "react-icons/fa";

export default function GruposTutorados() {
  const [courses, setCourses] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    if (storedNombre) {
      setNombre(storedNombre);
    }

    // Obtener los cursos desde la API con el nombre del tutor
    const fetchCourses = async () => {
      if (!storedNombre) {
        console.warn("No hay un nombre de tutor almacenado.");
        return;
      }

      try {
        const response = await fetch(
          `/api/getCourses1?tutorName=${encodeURIComponent(storedNombre)}`
        ); // Pasar el nombre como query
        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.cardsContainer}>
          {courses.map((course) => (
            <div key={course.ID} className={styles.card}>
              <img
                src="/asignatura.png"
                alt={course.Profesor}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
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
                    href={`/grupo1/${course.Grupo}`}
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
