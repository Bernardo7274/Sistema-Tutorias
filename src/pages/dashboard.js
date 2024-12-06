import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from "../styles/Dashboard.module.css"; // Importar estilos modulares
import useAuth from "@/hooks/useAuth"; // Importamos el hook

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");

  // Solo permitimos acceso al Administrador
  useAuth(["Administrador"]);

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");
    const storedcorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedRol && storedcorreoElectronico) {
      setNombre(storedNombre);
      setRol(storedRol);
      setcorreoElectronico(storedcorreoElectronico);
    }
  }, []);

  return (
    <div
      style={{
        marginTop: "80px",
        marginLeft: "60px", // Asegura que el contenido principal no quede cubierto
        transition: "margin-left 0.3s ease",
      }}
    >
      <div className={styles.container}>
        <Navbar />
        <NavbarHamburguesa />
        <main className={styles.main}>
          <h1 className={styles.welcomeText}>
            Bienvenido {nombre} con rol {rol}
          </h1>
        </main>
      </div>
    </div>
  );
}
