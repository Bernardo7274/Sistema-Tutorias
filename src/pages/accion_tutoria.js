import { useEffect, useState, useRef } from "react";
import NavbarTutor from "@/components/Navbar_tutor"; // Ajusta la ruta según tu estructura
import styles from "@/styles/AccionTutoria.module.css"; // Importa el módulo CSS
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function AccionTutoria() {
  const mainRef = useRef();
  const [nombre, setNombre] = useState("");
  const [displayPeriod, setDisplayPeriod] = useState("");
  const [periodValue, setPeriodValue] = useState("");
  const [programasEducativos, setProgramasEducativos] = useState([]);
  const [cuatrimestres, setCuatrimestres] = useState([]);
  const [grupos, setGrupos] = useState([]); // Estado para los grupos
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({
    fecha: "",
    tema: "",
    proposito: "",
    evidencia: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Solo permitimos acceso al Tutor
  useAuth(["Tutor"]);

  const handleAddRow = () => {
    setTableData([...tableData, newRow]);
    setNewRow({ fecha: "", tema: "", proposito: "", evidencia: "" });
    setShowForm(false);
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
      if (
        input.tagName === "SELECT" ||
        input.tagName === "TEXTAREA" ||
        input.tagName === "INPUT"
      ) {
        input.setAttribute("data-value", input.value);
        input.insertAdjacentHTML(
          "afterend",
          `<br/><span>${input.value}</span>`
        );
        input.style.display = "none";
      }
    });

    const originalContent = document.body.innerHTML;
    const printContent = mainRef.current.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    inputs.forEach((input) => {
      input.style.display = "";
    });

    window.location.reload(); // Restablecer la página
  };

  return (
    <div className={styles.container}>
      <NavbarTutor /> {/* Agregamos el navbar */}
      <main ref={mainRef} className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>PROGRAMA DE ACCIÓN TUTORIA</h1>
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
            <strong>Objetivo General:</strong>
            <input type="text" className={styles.input} />
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
        {/* Tabla integrada */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tema o Actividad</th>
                <th>Propósito</th>
                <th>Genera Evidencia</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.fecha}</td>
                  <td>{row.tema}</td>
                  <td>{row.proposito}</td>
                  <td>{row.evidencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            + Agregar Fila
          </button>
          {showForm && (
            <div className={styles.formContainer}>
              <p className={styles.instructions}>
                <strong>
                  INSTRUCCIONES: Llene los datos de identificación del grupo que
                  se atiende. En seguida coloque las fechas en las cuales tendrá
                  las sesiones de la Tutoría Grupal y redacte el nombre del tema
                  o actividad que se realizará; redacte el propósito y determine
                  si se generará evidencia de la actividad. Envíe al Responsable
                  Institucional de Tutorías durante los primeros quince días una
                  vez iniciado el cuatrimestre.
                </strong>
              </p>
              <h3>Agregar Nueva Actividad</h3>
              <label>
                Fecha:
                <input
                  type="date"
                  value={newRow.fecha}
                  onChange={(e) =>
                    setNewRow({ ...newRow, fecha: e.target.value })
                  }
                  className={styles.input}
                />
              </label>
              <label>
                Tema o Actividad:
                <input
                  type="text"
                  value={newRow.tema}
                  onChange={(e) =>
                    setNewRow({ ...newRow, tema: e.target.value })
                  }
                  className={styles.input}
                />
              </label>
              <label>
                Propósito:
                <input
                  type="text"
                  value={newRow.proposito}
                  onChange={(e) =>
                    setNewRow({ ...newRow, proposito: e.target.value })
                  }
                  className={styles.input}
                />
              </label>
              <label>
                Genera Evidencia:
                <select
                  value={newRow.evidencia}
                  onChange={(e) =>
                    setNewRow({ ...newRow, evidencia: e.target.value })
                  }
                  className={styles.input}
                >
                  <option value="">Seleccione</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </label>
              <div className={styles.buttonGroup}>
                <button className={styles.saveButton} onClick={handleAddRow}>
                  Guardar
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className={styles.main1}>
        <button className={styles.printButton} onClick={handlePrint}>
          Imprimir
        </button>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}
