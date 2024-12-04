import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa"; // Importar el ícono de descarga de React Icons
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

  // Estado para los documentos enviados
  const [documentosEnviados, setDocumentosEnviados] = useState([]);

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
    const grupo = document.querySelector(
      `input[name='grupo-${documento}']`
    ).value; // Obtener el valor del grupo desde el input correspondiente

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

          // Preparar los datos para el envío
          const payload = {
            nombre,
            correoElectronico,
            rol,
            grupo,
            nombreEspecifico: nombresEspecificos[documento],
            fileUrl,
          };

          // Enviar los datos a la API
          fetch("/api/guardarDatos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log("Datos enviados correctamente.");
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Hubo un problema al guardar los datos.",
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

  useEffect(() => {
    // Obtener los documentos enviados desde la API
    if (nombre) {
      fetch(`/api/documentosEnviados?nombreUsuario=${nombre}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error",
              text: data.error,
              icon: "error",
            });
          } else {
            setDocumentosEnviados(data);
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al obtener los documentos.",
            icon: "error",
          });
        });
    }
  }, [nombre]);

  // Nombres específicos para cada documento
  const nombresEspecificos = {
    "Registro de canalización": "Registro-de-Canalización",
    "Registro de Acción Tutorial": "Programa-Acción-Tutoria",
    "Registro de General Tutoría Individual":
      "Registro-General-de-Tutoria-Individual",
    "Registro de Cierre": "Informe-Del-Cierre-Del-PAT",
    "Registro de Estudiante": "Registro-de-Estudiante",
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
                  <input
                    type="text"
                    className={styles.input}
                    name={`grupo-${documento}`}
                  />
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
                  <button
                    className={styles.button}
                    onClick={() => handleUploadFile(documento)}
                  >
                    Subir Archivo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nueva tabla de Documentos Enviados */}
        <h2>Documentos Enviados</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Grupo</th>
              <th>Ver</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {documentosEnviados.length > 0 ? (
              documentosEnviados.map((documento) => (
                <tr key={documento.ID}>
                  <td>{documento.ID}</td>
                  <td>{documento.NombreU}</td>
                  <td>{documento.Correo}</td>
                  <td>{documento.Grupo}</td>
                  <td>
                    <a
                      href={`/api/download/${documento.Directorio.replace(
                        "/Documents/",
                        ""
                      )}`}
                      download
                    >
                      <FaDownload size={30} /> {/* Cambia el tamaño aquí */}
                    </a>
                  </td>
                  <td
                    className={`${styles.state} 
                                ${
                                  documento.ID_valid === 1
                                    ? styles["state-aceptado"]
                                    : documento.ID_valid === 2
                                    ? styles["state-pendiente"]
                                    : documento.ID_valid === 3
                                    ? styles["state-rechazado"]
                                    : ""
                                }`}
                  >
                    {documento.ID_valid === 1
                      ? "Aceptado"
                      : documento.ID_valid === 2
                      ? "Pendiente"
                      : documento.ID_valid === 3
                      ? "Rechazado"
                      : "Desconocido"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se han encontrado documentos enviados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
