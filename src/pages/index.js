import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css"; // Archivo CSS personalizado

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

        if (data.rol == "Administrador") {
          router.push("/dashboard");
        } else if (data.rol == "Estudiante") {
          router.push("/dashboardEstudiante");
        } else if (data.rol == "Tutor") {
          router.push("/dashboardTutor");
        }
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Ocurrió un error. Inténtalo de nuevo.");
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
            <label>
              <input type="checkbox" /> Recuérdame
            </label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
