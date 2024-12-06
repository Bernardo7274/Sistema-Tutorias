import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css"; // Archivo CSS personalizado
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("correoElectronico", data.correoElectronico);

        if (data.rol === "Administrador") {
          router.push("/dashboard");
        } else if (data.rol === "Estudiante") {
          router.push("/dashboardEstudiante");
        } else if (data.rol === "Tutor") {
          router.push("/dashboardTutor");
        }
      } else {
        setError("Credenciales incorrectas");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Credenciales incorrectas",
          timer: 2000, // Temporizador de 2 segundos
          showConfirmButton: false,
        });
      }
    } catch (err) {
      setError("Ocurrió un error. Inténtalo de nuevo.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error. Inténtalo de nuevo.",
        timer: 2000, // Temporizador de 2 segundos
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.heading}>Sistema de Tutorías</h2>{" "}
        {/* Asignar clase local */}
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Correo institucional"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <span className={styles.iconUser}></span>
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <span className={styles.iconLock}></span>
          </div>
          <div className={styles.options}>
            <label></label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Evita que el enlace se siga
                Swal.fire({
                  icon: "info",
                  title: "Problemas para acceder a la plataforma",
                  html: 'En caso de que hayas olvidado la contraseña, por favor, envía un correo electrónico a asesorias;: <a href="mailto:tutorias@upqroo.edu.mx" style="color:blue; text-decoration:none;">asesorias;tutorias@upqroo.edu.mx</a> con tu nombre completo y número de matrícula para recibir asistencia.',
                  timer: 2000, // Temporizador de 2 segundos
                  showConfirmButton: false,
                });
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
