import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  // Función para redirigir a otras páginas
  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src="/logo.png"
          alt="Universidad Politécnica de Quintana Roo"
          style={styles.logo}
        />
        <nav style={styles.nav}>
          <button
            style={styles.navButton}
            onClick={() => handleRedirect("/inicio")}
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
        <div style={styles.welcomeBox}>
          <h1 style={styles.welcomeText}>Bienvenido {nombre}</h1>
        </div>
        <div style={styles.iconContainer}>
          <button
            style={styles.iconBox}
            onClick={() => handleRedirect("/registro_de_canalizacion")}
          >
            <img
              src="/R_Canalizacion.png"
              alt="Registro de Canalización"
              style={styles.icon}
            />
            <p style={styles.iconText}>Registro de Canalización</p>
          </button>
          <button
            style={styles.iconBox}
            onClick={() => handleRedirect("/accion_tutoria")}
          >
            <img
              src="/R_AccionTutoria.png"
              alt="Programa Acción Tutoria"
              style={styles.icon}
            />
            <p style={styles.iconText}>Programa Acción Tutoria</p>
          </button>
          <button
            style={styles.iconBox}
            onClick={() => handleRedirect("/tutoria_individual")}
          >
            <img
              src="/R_TutoriaIndividual.png"
              alt="Registro General de Tutoría Individual"
              style={styles.icon}
            />
            <p style={styles.iconText}>
              Registro General de Tutoría Individual
            </p>
          </button>
          <button
            style={styles.iconBox}
            onClick={() => handleRedirect("/cierre_del_Pat")}
          >
            <img
              src="/R_RegistroEstudiante.png"
              alt="Registro de Estudiante"
              style={styles.icon}
            />
            <p style={styles.iconText}>Registro de Estudiante</p>
          </button>
        </div>
      </main>

      <footer style={styles.footer}></footer>
    </div>
  );
}

const styles = {
  container: {
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
    textAlign: "center",
    paddingTop: "90px",
  },
  welcomeBox: {
    border: "4px solid #FF8C00",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "40px",
  },
  welcomeText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#000000",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  iconBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    border: "8px solid #FF8C00",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  icon: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  iconText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#FF8C00",
  },
  footer: {
    marginTop: "auto",
    backgroundColor: "#FF8C00",
    width: "100%",
    height: "50px",
  },
};
