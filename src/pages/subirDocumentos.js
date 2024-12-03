import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import Navbar from "@/components/Navbar_tutor";
import styles from "@/styles/SubirDocumentos.module.css";

export default function SubirDocumentos() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [archivosSeleccionados, setArchivosSeleccionados] = useState({
    "Registro de canalización": null,
    "Registro de Acción Tutorial": null,
    "Registro de General Tutoría Individual": null,
    "Registro de Cierre": null,
    "Registro de Estudiante": null,
  });

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");
    const storedCorreoElectronico = localStorage.getItem("correoElectronico");

    if (storedNombre && storedRol && storedCorreoElectronico) {
      setNombre(storedNombre);
      setRol(storedRol);
      setCorreoElectronico(storedCorreoElectronico);
    }
  }, []);

  // Función para manejar la selección del archivo
  const handleFileSelection = (e, documento) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setArchivosSeleccionados((prevState) => ({
        ...prevState,
        [documento]: file,
      }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Solo se permiten archivos PDF.",
      });
    }
  };

  // Función para abrir el dialogo para elegir archivo
  const handleButtonClick = (documento) => {
    Swal.fire({
      title: `Selecciona el archivo para ${documento}`,
      input: "file",
      inputAttributes: {
        accept: "application/pdf", // Limitar a solo archivos PDF
      },
      showCancelButton: true,
      confirmButtonText: "Seleccionar",
      cancelButtonText: "Cancelar",
      inputValidator: (file) => {
        if (!file) {
          return "¡Debes seleccionar un archivo!";
        }
      },
      didOpen: () => {
        document
          .querySelector("input[type='file']")
          .addEventListener("change", (e) => handleFileSelection(e, documento));
      },
    });
  };

  // Función para manejar la subida del archivo con el nombre del usuario
  const handleUploadFile = (documento) => {
    const file = archivosSeleccionados[documento];
    if (!file) {
      Swal.fire({
        title: "Error",
        text: "No se ha seleccionado ningún archivo para subir.",
        icon: "error",
      });
      return;
    }

    // Aquí se añade el nombre del usuario al FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documento", documento);
    formData.append("nombreUsuario", nombre); // Nombre del usuario

    // Realiza la solicitud a tu API para subir el archivo
    fetch("/api/subirArchivo", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Éxito",
            text: `El archivo ${file.name} ha sido subido correctamente.`,
            icon: "success",
          });

          // Aquí puedes hacer lo que necesites con la URL del archivo
          const fileUrl = data.fileUrl;
          console.log("URL del archivo:", fileUrl);
          // Realiza la inserción de datos en el backend o almacena la URL en el frontend
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al subir el archivo.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al procesar la solicitud.",
          icon: "error",
        });
      });
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Agregamos el navbar */}
      <main className={styles.main}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.welcomeText}>
            Bienvenido {nombre} con rol {rol} y {correoElectronico}
          </h1>
        </div>

        {/* Tabla con 5 columnas y 5 filas */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Grupo</th>
              <th>Acción</th>
              <th>Ver</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Registro de canalización",
              "Registro de Acción Tutorial",
              "Registro de General Tutoría Individual",
              "Registro de Cierre",
              "Registro de Estudiante",
            ].map((documento) => (
              <tr key={documento}>
                <td>{documento}</td>
                <td>
                  <input type="text" className={styles.input} />
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleButtonClick(documento)}
                  >
                    Elegir Archivo
                  </button>
                </td>
                <td>
                  <label>
                    {archivosSeleccionados[documento]
                      ? archivosSeleccionados[documento].name
                      : "Nombre del archivo seleccionado"}
                  </label>
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleUploadFile(documento)}
                  >
                    Subir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
