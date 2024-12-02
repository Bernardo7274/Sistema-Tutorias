import { useRouter } from "next/router";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import NavbarTutor from "@/components/Navbar_tutor"; // Ajusta la ruta según tu estructura

export default function RegistroCanalizacion() {
  const router = useRouter();
  const mainRef = useRef(); // Referencia para el contenido de main
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [displayPeriod, setDisplayPeriod] = useState(""); // Texto mostrado al usuario
  const [periodValue, setPeriodValue] = useState(""); // Valor para la base de datos
  const [grupos, setGrupos] = useState([]); // Estado para los grupos
  const [programasEducativos, setProgramasEducativos] = useState([]);

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedcorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedcorreoElectronico) {
      setNombre(storedNombre);
      setcorreoElectronico(storedcorreoElectronico);
    }

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setCurrentDate(formattedDate);

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
    // Obtener los campos de formulario dentro del `main`
    const inputs = mainRef.current.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        input.setAttribute("data-checked", input.checked ? "☑️" : "⬜️");
      } else {
        input.setAttribute("data-value", input.value);
      }
    });

    // Reemplazar los campos con sus valores para la impresión
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        input.insertAdjacentHTML(
          "afterend",
          `<span>${input.getAttribute("data-checked")}</span>`
        );
      } else {
        input.insertAdjacentHTML(
          "afterend",
          `<br/><span>${input.getAttribute("data-value")}</span>`
        );
      }
      input.style.display = "none"; // Ocultar los elementos de entrada
    });

    // Guardar el contenido original y establecer el contenido para imprimir
    const printContent = mainRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    // Restaurar los valores en el formulario
    inputs.forEach((input) => {
      input.style.display = ""; // Mostrar los elementos de entrada nuevamente
    });
    window.location.reload(); // Recargar para restablecer el contenido original
  };

  return (
    <div style={styles.container1}>
      <NavbarTutor /> {/* Agregamos el navbar */}
      <main ref={mainRef} style={styles.main}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>REGISTRO DE CANALIZACIÓN</h1>
        </div>
        <p style={styles.instructions}>
          <strong>
            INSTRUCCIONES: Llene el formato con los datos solicitados en la
            parte superior del mismo. Marque las posibles causas de la
            canalización que considere puede(n) estar afectando el rendimiento
            académico del/la estudiante. Envíe por correo electrónico el adjunto
            a: bienestarestudiantil@upqroo.edu.mx para agendar cita con el/la
            estudiante; una vez que ha sido atendido solicite el documento
            firmado y archive en la carpeta de grupo.
          </strong>
        </p>
        <div style={styles.sectionTitle}>Datos de contacto</div>
        <div style={styles.contactContainer}>
          <label>
            <strong>Programa Educativo:</strong>
            <select style={styles.input}>
              <option value="">Seleccione una opción</option>
              {programasEducativos.map((programa) => (
                <option key={programa.ID} value={programa.Nombre}>
                  {programa.Nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>Nombre del/la Estudiante:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Fecha:</strong>
            <input
              type="date"
              value={currentDate}
              style={styles.input}
              readOnly
            />
          </label>
          <label>
            <strong>Matrícula:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Correo:</strong>
            <input
              type="text"
              style={styles.input}
              value={correoElectronico}
              readOnly
            />
          </label>
          <label>
            <strong>Tutor/a:</strong>
            <input
              type="text"
              style={styles.input}
              value={nombre}
              readOnly
              onChange={(e) => {
                setNombre(e.target.value);
                fetchGroups(e.target.value); // Actualiza los grupos al cambiar el nombre del tutor
              }}
            />
          </label>
          <label>
            <strong>Celular:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Grupo:</strong>
            <select style={styles.input}>
              <option value="">Seleccione una opción</option>
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo.Grupo}>
                  {grupo.Grupo}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.sectionTitle}>Causas de la Canalización</div>
        <div style={styles.canalizationContainer}>
          <div style={styles.tableContainer}>
            <div style={styles.tableTitle}>
              Observaciones del/a Tutor/a
              <br />
              Marque una o más opciones de canalización según considere.
            </div>
            <table style={styles.table}>
              <tbody>
                {[
                  "Presenta síntomas relacionados con depresión",
                  "Problemas de autoestima",
                  "Síntomas de ansiedad/angustia",
                  "Comportamiento errático*",
                  "Problemas de integración",
                  "Necesidades educativas especiales",
                  "Falta de concentración",
                  "Proceso de duelo",
                  "Estado de salud**",
                  "Atención de crisis",
                  "Solicitó atención directamente en BE",
                  "Otro, especifique:",
                ].map((item, index) => (
                  <tr key={index}>
                    <td style={styles.cell}>
                      * <strong>{item}</strong>
                    </td>
                    <td style={styles.cell}>
                      <input type="checkbox" style={styles.checkbox} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.tableContainer}>
            <div style={styles.tableTitle}>
              Para ser llenado por el área de Bienestar Estudiantil
              <br />
              <br />
            </div>
            <div style={styles.followUpContent}>
              <label style={styles.label}>Firma:</label>
              <div style={styles.signatureContainer}></div>
              <div style={styles.row}>
                <div>
                  <strong>Seguimiento:</strong>
                  <br />
                  <label style={styles.option}>
                    {" "}
                    Sí <input type="checkbox" style={styles.checkbox} disabled/>
                  </label>
                  <label style={styles.option}>
                    {" "}
                    No <input type="checkbox" style={styles.checkbox} disabled/>
                  </label>
                </div>
              </div>
              <div style={styles.row}>
                <div>
                  <strong>Frecuencia de atención psicológica:</strong>
                  <br />
                  <label style={styles.option}>
                    {" "}
                    Periódica <input type="checkbox" style={styles.checkbox} disabled/>
                  </label>
                  <label style={styles.option}>
                    {" "}
                    De seguimiento{" "}
                    <input type="checkbox" style={styles.checkbox} disabled/>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <label>
          <strong>
            <br />
            *Comportamiento errático: desorientación, conductas inesperadas o
            poco habituales.
            <br />
            **Estado de salud: sobrepeso, diabetes, hipertensión, otras que
            afecten el rendimiento académico del estudiante.
          </strong>
        </label>
      </main>
      <div style={styles.main1}>
        {/* Botón de impresión */}
        <button style={styles.printButton} onClick={handlePrint}>
          Imprimir
        </button>
      </div>
    </div>
  );
}

const styles = {
  container1: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: "#f9f9f9",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  main1: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  footer: {
    marginTop: "auto",
    backgroundColor: "#FF8C00",
    width: "100%",
    height: "50px",
  },
  //Formulario
  titleContainer: {
    backgroundColor: "#FF8C00",
    padding: "15px",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "10px",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: "bold",
  },
  instructions: {
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "justify",
  },
  sectionTitle: {
    backgroundColor: "#FF8C00",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "15px",
    marginBottom: "10px",
    textAlign: "center",
  },
  contactContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    fontFamily: "'Montserrat', sans-serif",
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  // ... otros estilos
  canalizationContainer: {
    display: "flex",
    gap: "10px",
  },
  tableContainer: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
  },
  tableTitle: {
    backgroundColor: "#FF8C00",
    color: "#FFFFFF",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    fontSize: "14px",
  },
  otherContainer: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  // ... otros estilos
  canalizationContainer: {
    display: "flex",
    gap: "10px",
  },
  followUpContainer: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  tableTitle: {
    backgroundColor: "#FF8C00",
    color: "#FFFFFF",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  followUpContent: {
    padding: "10px",
  },
  label: {
    display: "block",
    margin: "10px 0",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  option: {
    marginRight: "15px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  signatureContainer: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "310px",
    marginBottom: "10px",
  },
  // ... otros estilos
  printButton: {
    backgroundColor: "#FF8C00",
    color: "#FFFFFF",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
};
