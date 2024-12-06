import { useEffect, useState, useRef } from "react";
import NavbarTutor from "@/components/Navbar_tutor"; // Ajusta la ruta según tu estructura
import styles from "@/styles/TutoriaIndividual.module.css"; // Importa el módulo CSS
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function TutoriaIndividual() {
  const mainRef = useRef();
  const [nombre, setNombre] = useState("");
  const [displayPeriod, setDisplayPeriod] = useState("");
  const [periodValue, setPeriodValue] = useState("");
  const [programasEducativos, setProgramasEducativos] = useState([]);
  const [cuatrimestres, setCuatrimestres] = useState([]);
  const [grupos, setGrupos] = useState([]); // Estado para los grupos
  const [currentDate, setCurrentDate] = useState("");
  const [tables, setTables] = useState([1]); // Estado para manejar las tablas dinámicas

  // Solo permitimos acceso al Tutor
  useAuth(["Tutor"]);

  // Establecer la fecha actual al cargar la página
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Formato: YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

  // Agregar una nueva tabla vacía
  const addNewTable = () => {
    setTables([...tables, tables.length + 1]); // Agrega un nuevo identificador de tabla
  };

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");

    if (storedNombre) {
      setNombre(storedNombre);
    }

    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 1 && currentMonth <= 4) {
      setDisplayPeriod("Enero - Abril");
      setPeriodValue(1);
    } else if (currentMonth >= 5 && currentMonth <= 8) {
      setDisplayPeriod("Mayo - Agosto");
      setPeriodValue(2);
    } else if (currentMonth >= 9 && currentMonth <= 12) {
      setDisplayPeriod("Septiembre - Diciembre");
      setPeriodValue(3);
    }

    // Fetching educational programs from the API
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/getPrograms");
        const data = await response.json();
        setProgramasEducativos(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();

    // Fetch groups if tutor's name is available
    if (storedNombre) {
      fetchGroups(storedNombre);
    }
  }, []);

  // Carga de datos desde la API
  useEffect(() => {
    const fetchCuatrimestres = async () => {
      try {
        const response = await fetch("/api/getCuatris");
        const data = await response.json();
        setCuatrimestres(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchCuatrimestres();
  }, []);

  // Función para obtener los grupos basados en el nombre del tutor
  const fetchGroups = async (tutorName) => {
    try {
      const response = await fetch(`/api/getGroups?tutorName=${tutorName}`);
      const data = await response.json();
      setGrupos(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handlePrint = () => {
    const inputs = mainRef.current.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        // Para los checkboxes
        input.setAttribute("data-checked", input.checked ? "☑️" : "⬜️");
        input.insertAdjacentHTML(
          "afterend",
          `<span>${input.getAttribute("data-checked")}</span>`
        );
      } else {
        // Para selects, textareas y otros inputs
        input.setAttribute("data-value", input.value);
        input.insertAdjacentHTML(
          "afterend",
          `<br/><span>${input.getAttribute("data-value")}</span>`
        );
      }
      input.style.display = "none";
    });

    const originalContent = document.body.innerHTML;
    const printContent = mainRef.current.innerHTML;

    // Cambiar el contenido para imprimir
    document.body.innerHTML = printContent;
    window.print();

    // Restaurar el contenido original
    document.body.innerHTML = originalContent;

    // Recargar la página para restablecer el estado inicial
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <NavbarTutor /> {/* Agregamos el navbar */}
      <main ref={mainRef} className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            REGISTRO GENERAL DE TUTORÍA INDIVIDUAL
          </h1>
        </div>
        <div className={styles.contactContainer}>
          <label>
            <strong>Tutor/a:</strong>
            <input
              type="text"
              className={styles.input}
              value={nombre}
              readOnly
              onChange={(e) => {
                setNombre(e.target.value);
                fetchGroups(e.target.value); // Actualiza los grupos al cambiar el nombre del tutor
              }}
            />
          </label>
          <label>
            <strong>Grupo:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo.Grupo}>
                  {grupo.Grupo}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>Programa Educativo:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              {programasEducativos.map((programa) => (
                <option key={programa.ID} value={programa.Nombre}>
                  {programa.Nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>Cuatrimestre:</strong>
            <select className={styles.input}>
              <option value="">Seleccione una opción</option>
              {cuatrimestres.map((cuatrimestre) => (
                <option key={cuatrimestre.ID} value={cuatrimestre.Nombre}>
                  {cuatrimestre.Nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>Periodo:</strong>
            <input
              type="text"
              value={displayPeriod}
              readOnly
              className={styles.input}
            />
          </label>
        </div>
        {/* Renderizado de las tablas dinámicas */}
        {tables.map((table, index) => (
          <div key={index} className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <label>
                <strong>Alumno</strong>
                <input
                  type="text"
                  className={styles.inputWide}
                  placeholder="-"
                />
              </label>
              <label>
                <strong>Fecha</strong>
                <input
                  type="date"
                  className={styles.inputWide}
                  value={currentDate}
                  readOnly
                />
              </label>
            </div>
            <div className={styles.tableBody}>
              <h3 className={styles.actionsTitle}>Acción</h3>
              <div className={styles.checkboxContainer}>
                <label>
                  <input type="checkbox" />
                  Asesoría académica
                </label>
                <label>
                  <input type="checkbox" />
                  Canalización
                </label>
                <label>
                  <input type="checkbox" />
                  Seguimiento académico
                </label>
                <label>
                  <input type="checkbox" />
                  Trámites
                </label>
                <label>
                  <input type="checkbox" />
                  Informes
                </label>
                <label>
                  <input type="checkbox" />
                  Consejería
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Botón para agregar nueva tabla */}
        <div className={styles.buttonContainer}>
          <button onClick={addNewTable} className={styles.addButton}>
            Agregar Nueva Tabla
          </button>
        </div>
      </main>
      <div className={styles.main1}>
        <button className={styles.printButton} onClick={handlePrint}>
          Imprimir
        </button>
      </div>
    </div>
  );
}
