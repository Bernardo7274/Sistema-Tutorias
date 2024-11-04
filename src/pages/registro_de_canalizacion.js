import { useRouter } from "next/router";

export default function RegistroCanalizacion() {
  const router = useRouter();

  // Función para redirigir a otras páginas
  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.container1}>
      <header style={styles.header}>
        <img
          src="/logo.png"
          alt="Universidad Politécnica de Quintana Roo"
          style={styles.logo}
        />
        <nav style={styles.nav}>
          <button
            style={styles.navButton}
            onClick={() => handleRedirect("/dashboardTutor")}
          >
            <img src="/icon_inicio.png" alt="Inicio" style={styles.navIcon} />
            <span style={styles.navText}>Inicio</span>
          </button>
          <button
            style={styles.navButton}
            onClick={() => handleRedirect("/cierre")}
          >
            <img src="/icon_cierre.png" alt="Cierre" style={styles.navIcon} />
            <span style={styles.navText}>Cierre</span>
          </button>
          <button
            style={styles.navButton}
            onClick={() => handleRedirect("/perfil")}
          >
            <img src="/icon_perfil.png" alt="Perfil" style={styles.navIcon} />
            <span style={styles.navText}>Perfil</span>
          </button>
        </nav>
      </header>

      <main style={styles.main}>
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
            firmado y archive en la carpeta de grupo./
          </strong>
        </p>
        <div style={styles.sectionTitle}>Datos de contacto</div>
        <div style={styles.contactContainer}>
          <label>
            <strong>Programa Educativo:</strong>
            <select style={styles.input}>
              <option value="">Seleccione una opción</option>
              <option value="Ingeniería en Software">
                Ingeniería en Software
              </option>
              <option value="Ingeniería en Mecatrónica">
                Ingeniería en Mecatrónica
              </option>
              <option value="Ingeniería en Tecnologías de la Información">
                Ingeniería en Tecnologías de la Información
              </option>
              <option value="Licenciatura en Administración de Empresas">
                Licenciatura en Administración de Empresas
              </option>
              <option value="Otra">Otra</option>
            </select>
          </label>
          <label>
            <strong>Nombre del/la Estudiante:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Fecha:</strong>
            <input type="date" style={styles.input} />
          </label>
          <label>
            <strong>Matrícula:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Correo:</strong>
            <input type="email" style={styles.input} />
          </label>
          <label>
            <strong>Tutor/a:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Celular:</strong>
            <input type="text" style={styles.input} />
          </label>
          <label>
            <strong>Grupo:</strong>
            <input type="text" style={styles.input} />
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
                <div style={styles.cell}>
                  <strong>Requiere seguimiento:</strong>
                  <label style={styles.option}>
                    {" "}
                    Sí <input type="checkbox" style={styles.checkbox} />
                  </label>
                  <label style={styles.option}>
                    {" "}
                    No <input type="checkbox" style={styles.checkbox} />
                  </label>
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.cell}>
                  <strong>Periodicidad de la atención psicológica:</strong>
                  <label style={styles.option}>
                    {" "}
                    Periódica <input type="checkbox" style={styles.checkbox} />
                  </label>
                  <label style={styles.option}>
                    {" "}
                    De seguimiento
                    <input type="checkbox" style={styles.checkbox} />
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
    </div>
  );
}

const styles = {
  container1: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: "#f0f0f0",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#FF8C00",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  logo: {
    height: "60px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navButton: {
    backgroundColor: "#ffffff",
    border: "2px solid #FF8C00",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  navText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#000000",
  },
  main: {
    backgroundColor: "#f0f0f0",
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
  cell: {
    flex: 1,
    fontSize: "14px",
    padding: "10px 0",
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
    height: "400px",
    marginBottom: "10px",
  },
};
