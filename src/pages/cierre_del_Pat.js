import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import NavbarTutor from "@/components/Navbar_tutor"; // Ajusta la ruta según tu estructura

export default function CierreDelPat() {
  const router = useRouter();
  const mainRef = useRef();
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [displayPeriod, setDisplayPeriod] = useState("");
  const [periodValue, setPeriodValue] = useState("");
  const [programasEducativos, setProgramasEducativos] = useState([]);
  const [grupos, setGrupos] = useState([]); // Estado para los grupos

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedcorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedcorreoElectronico) {
      setNombre(storedNombre);
      setcorreoElectronico(storedcorreoElectronico);
    }

    // Obtener la fecha actual sin adelantar al siguiente día
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Obtener el día con 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Obtener el mes con 2 dígitos
    const year = today.getFullYear(); // Obtener el año

    const formattedDate = `${year}-${month}-${day}`; // Formato: yyyy-mm-dd
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

  // Estados solo para los textarea
  const [accionesMes1, setAccionesMes1] = useState("");
  const [accionesMes2, setAccionesMes2] = useState("");
  const [accionesMes3, setAccionesMes3] = useState("");
  const [accionesMes4, setAccionesMes4] = useState("");

  // Definir el estado para las evidencias de la acción tutorial
  const [evidenciasAccionTutorial, setEvidenciasAccionTutorial] = useState("");

  // Manejador de cambio para actualizar el estado
  const handleEvidenciasChange = (event) => {
    setEvidenciasAccionTutorial(event.target.value);
  };

  const data = [
    "Acciones realizadas en la tutoria grupal",
    "Estudiantes con entrevista inicial (Sólo 1ercuatrimestre)",
    "Estudiantes atendidos en tutoría individual",
    "Estudiantes identificados en riesgo académico",
    "Estudiantes en riesgo académico atendidos en asesoría académica",
    "Estudiantes que acreditaron como resultado de las asesorías académicas",
    "Estudiantes que abandonaron el cuatrimestre",
    "Estudiantes que solicitaron baja académica",
  ];

  const infoData = {
    "Acciones realizadas en la tutoria grupal":
      "Información detallada sobre depresión",
    "Estudiantes con entrevista inicial (Sólo 1ercuatrimestre)":
      "Descripción sobre problemas de autoestima",
    "Estudiantes atendidos en tutoría individual":
      "Detalles sobre ansiedad y angustia",
    "Estudiantes identificados en riesgo académico":
      "Información sobre comportamiento errático",
    "Estudiantes en riesgo académico atendidos en asesoría académica":
      "Descripción sobre problemas de integración",
    "Estudiantes que acreditaron como resultado de las asesorías académicas":
      "Información sobre necesidades educativas",
    "Estudiantes que abandonaron el cuatrimestre":
      "Detalles sobre falta de concentración",
    "Estudiantes que solicitaron baja académica":
      "Descripción sobre proceso de duelo",
  };

  const handleIconClick = (item) => {
    const text = infoData[item] || "Información no disponible";
    Swal.fire({
      title: "Información",
      text: text,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const handlePrint = () => {
    const inputs = mainRef.current.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        input.setAttribute("data-checked", input.checked ? "☑️" : "⬜️");
      } else {
        input.setAttribute("data-value", input.value);
      }
    });

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
      input.style.display = "none";
    });

    const printContent = mainRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    window.location.reload();
  };

  return (
    <div style={styles.container1}>
      <NavbarTutor /> {/* Agregamos el navbar */}
      <main ref={mainRef} style={styles.main}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>INFORME DEL CIERRE DEL PAT</h1>
        </div>
        <div style={styles.contactContainer}>
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
            <strong>Grupo:</strong>
            <select style={styles.input}>
              <option value="">Seleccione una opción</option>
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo.ID}>
                  {grupo.Grupo}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>Programa Educativo:</strong>
            <select style={styles.input}>
              <option value="">Seleccione una opción</option>
              {programasEducativos.map((programa) => (
                <option key={programa.ID} value={programa.ID}>
                  {programa.Nombre}
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
              style={styles.input}
            />
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
        </div>

        {/* Textareas para acciones realizadas en el mes */}
        {[accionesMes1, accionesMes2, accionesMes3, accionesMes4].map(
          (acciones, index) => (
            <div key={index} style={styles.canalizationContainer}>
              <div style={styles.tableContainer}>
                <div style={styles.tableTitle}>
                  Acciones realizadas en el mes de..
                </div>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td style={styles.cell}>
                        <textarea
                          style={styles.input1}
                          placeholder={`1.`}
                          value={acciones}
                          onChange={(e) => {
                            if (index === 0) setAccionesMes1(e.target.value);
                            else if (index === 1)
                              setAccionesMes2(e.target.value);
                            else if (index === 2)
                              setAccionesMes3(e.target.value);
                            else setAccionesMes4(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
        <div style={styles.canalizationContainer}>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td style={styles.cell1}>
                    <div style={styles.tableTitle}>
                      <strong>INDICADORES</strong>
                    </div>
                  </td>
                  <td style={styles.cell1}>
                    <div style={styles.tableTitle}>
                      <strong>RESULTADO OBTENIDO</strong>
                    </div>
                  </td>
                </tr>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.cell}>
                      <strong>{item}</strong>
                      <img
                        src="/info-icon.png" // Reemplaza con la ruta del ícono
                        alt="Info"
                        style={styles.icon}
                        onClick={() => handleIconClick(item)}
                      />
                    </td>
                    <td style={styles.cell}>
                      <input type="text" style={styles.input} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <label>
          <strong>Anexo</strong>
        </label>
        <br />
        <br />
        <label>
          Evidencias de la acción tutorial:
          <textarea
            style={{ ...styles.input1 }}
            value={evidenciasAccionTutorial} // Vincular el estado con el textarea
            onChange={handleEvidenciasChange} // Actualizar el estado cuando el usuario escriba
          />
        </label>
      </main>
      <div style={styles.main1}>
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
  contactContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
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
  input1: {
    fontFamily: "'Montserrat', sans-serif",
    width: "100%",
    height: "150px",
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
  cell1: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    fontSize: "14px",
    backgroundColor: "#FF8C00",
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
  // ... otros estilos
  icon: {
    marginLeft: "8px",
    cursor: "pointer",
    height: "25px",
    width: "25px",
    float: "right", // Esto alineará el ícono a la derecha
  },
};
