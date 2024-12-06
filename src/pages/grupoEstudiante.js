import { useEffect, useState } from "react";
import NavbarEstudiante from "@/components/Navbar_estudiante"; // Ajusta la ruta según tu estructura
import styles from "@/styles/GrupoEstudiante.module.css";
import { FaUserGraduate, FaSignInAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function GruposTutorados() {
  const [courses, setCourses] = useState([]);
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");
  // Estado para el formulario de agregar curso
  const [nuevoCurso, setNuevoCurso] = useState({
    grupo: "",
    select1: "",
    select2: "",
    select3: "",
  });

  // Solo permitimos acceso al Estudiante
  useAuth(["Estudiante"]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");
    const storedcorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedRol && storedcorreoElectronico) {
      setNombre(storedNombre);
      setRol(storedRol);
      setcorreoElectronico(storedcorreoElectronico);
    }

    // Obtener los cursos desde la API con el nombre del tutor
    const fetchCourses = async () => {
      if (!storedNombre) {
        console.warn("No hay un nombre de tutor almacenado.");
        return;
      }

      try {
        const response = await fetch(
          `/api/getCourses1?tutorName=${encodeURIComponent(storedNombre)}` // Pasar el nombre como query
        );
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

  const handleDelete = (courseId) => {
    // Mostrar la alerta de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true, // Reversa los botones (cancelar en la izquierda)
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procede con la eliminación
        try {
          const response = await fetch(`/api/deleteCourse?id=${courseId}`, {
            method: "DELETE", // Usamos el método DELETE para eliminar
          });

          if (!response.ok) {
            throw new Error("Error al eliminar el curso");
          }

          // Si la eliminación es exitosa, actualizamos el estado local
          setCourses(courses.filter((course) => course.ID !== courseId));

          // SweetAlert2 para éxito
          Swal.fire({
            icon: "success",
            title: "Curso eliminado",
            text: "El curso ha sido eliminado con éxito.",
            confirmButtonText: "Aceptar",
          });
        } catch (error) {
          console.error(error);

          // SweetAlert2 para error
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "No se pudo eliminar el curso. Intenta nuevamente.",
            confirmButtonText: "Aceptar",
          });
        }
      } else {
        // Si el usuario cancela, muestra un mensaje de cancelación (opcional)
        Swal.fire({
          icon: "info",
          title: "Acción cancelada",
          text: "El curso no fue eliminado.",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCurso((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mostrar y ocultar el formulario
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre, // Se obtiene del estado
          correo: correoElectronico, // Se obtiene del estado
          grupo: nuevoCurso.grupo, // Datos del formulario
          rol, // Se obtiene del estado
          periodo: nuevoCurso.select1, // Ejemplo de uso de un select del formulario
          cuatrimestre: nuevoCurso.select2, // Ejemplo de otro select del formulario
          programa: nuevoCurso.select3, // Ejemplo de otro select del formulario
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el curso");
      }

      // Si todo va bien, actualizamos el estado o haces lo que necesites
      const data = await response.json();
      setCourses((prevCourses) => [...prevCourses, data]);

      Swal.fire({
        icon: "success",
        title: "Curso agregado",
        text: "El curso se ha agregado con éxito.",
        confirmButtonText: "Aceptar",
        timer: 2000, // Tiempo en milisegundos (2000 ms = 2 segundos)
        timerProgressBar: true, // Opcional: Muestra una barra de progreso durante el tiempo del timer
      }).then(() => {
        // Restablecer el formulario después de agregar el curso
        setNuevoCurso({
          grupo: "",
          select1: "",
          select2: "",
          select3: "",
        });
        setMostrarFormulario(false); // Cerrar el formulario

        // Recargar la página
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "No se pudo agregar el curso. Intenta nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <NavbarEstudiante />
        {/* Botón para agregar curso */}
        <div className={styles.addCourseButtonContainer}>
          <button className={styles.addCourseButton} onClick={toggleFormulario}>
            Agregar Curso
          </button>
        </div>

        {/* Formulario interactivo */}
        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="grupo" className={styles.formLabel}>
                Nombre del Grupo:
              </label>
              <input
                type="text"
                id="grupo"
                name="grupo"
                value={nuevoCurso.grupo}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="select1" className={styles.formLabel}>
                Periodo:
              </label>
              <select
                id="select1"
                name="select1"
                value={nuevoCurso.select1}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="1">Enero - Abril</option>
                <option value="2">Mayo - Agosto</option>
                <option value="3">Septiembre - Diciembre</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="select2" className={styles.formLabel}>
                Selección 2:
              </label>
              <select
                id="select2"
                name="select2"
                value={nuevoCurso.select2}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="1">Primer Cuatrimestre</option>
                <option value="2">Segundo Cuatrimestre</option>
                <option value="3">Tercer Cuatrimestre</option>
                <option value="4">Cuarto Cuatrimestre</option>
                <option value="5">Quinto Cuatrimestre</option>
                <option value="6">Sexto Cuatrimestre</option>
                <option value="7">Séptimo Cuatrimestre</option>
                <option value="8">Octavo Cuatrimestre</option>
                <option value="9">Noveno Cuatrimestre</option>
                <option value="10">Décimo Cuatrimestre</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="select3" className={styles.formLabel}>
                Carrera:
              </label>
              <select
                id="select3"
                name="select3"
                value={nuevoCurso.select3}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="1">Licenciatura en Ingeniería Financiera</option>
                <option value="2">Licenciatura en Ingeniería Biomédica</option>
                <option value="3">
                  Licenciatura en Ingeniería en Tecnologías de la Información e
                  Innovación Digital
                </option>
                <option value="4">Ingeniería en Biotecnología</option>
                <option value="5">Licenciatura en Terapia Física</option>
                <option value="6">Licenciatura en Administración</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.submitButton}>
                Agregar
              </button>
            </div>
          </form>
        )}
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
                    href={`/grupo2/${course.Grupo}`}
                    className={styles.enterButton}
                  >
                    <FaSignInAlt className={styles.icon} /> Entrar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla debajo de los cards */}
        <table className={styles.coursesTable}>
          <thead>
            <tr>
              <th>Programa</th>
              <th>Grupo</th>
              <th>Cuatrimestre</th>
              <th>Periodo</th>
              <th>Dar de baja</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.ID}>
                <td>{course.Programa}</td>
                <td>{course.Grupo}</td>
                <td>{course.Cuatrimestre}</td>
                <td>{course.Periodo}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(course.ID)}
                  >
                    Dar de baja un grupo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
