import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa"; // Importar el ícono de descarga de React Icons
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from "../styles/Informes.module.css"; // Importa el archivo CSS modular
import Swal from "sweetalert2";

export default function Informes() {
  const [activeTab, setActiveTab] = useState("Registro-de-Canalización");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [apiData, setApiData] = useState([]); // Datos de la API
  const [apiData1, setApiData1] = useState([]); // Datos de la API
  const [apiData2, setApiData2] = useState([]); // Datos de la API
  const [apiData3, setApiData3] = useState([]); // Datos de la API
  const [apiData4, setApiData4] = useState([]); // Datos de la API

  const handleStatusChange = (event) => setFilterStatus(event.target.value);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleAccept = async (id) => {
    try {
      // Realiza la llamada a tu API para actualizar el registro
      const response = await fetch("/api/getInformesEdit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Enviar el ID en el cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el registro");
      }

      const data = await response.json();
      console.log(`Registro ${id} aceptado`, data);

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `El registro con ID ${id} ha sido aceptado.`,
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Recargar la página después de cerrar la alerta
        window.location.reload();
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el registro. Intenta de nuevo.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      // Realiza la llamada a tu API para actualizar el registro
      const response = await fetch("/api/getInformesEdit1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Enviar el ID en el cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el registro");
      }

      const data = await response.json();
      console.log(`Registro ${id} Rechazado`, data);

      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `El registro con ID ${id} ha sido Rechazado.`,
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Recargar la página después de cerrar la alerta
        window.location.reload();
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);

      // Mostrar mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el registro. Intenta de nuevo.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // Carga de datos desde la API
  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await fetch("/api/getInformes");
        const data = await response.json();
        const transformedData = data.map((item) => ({
          col0: item.ID,
          col1: item.NombreU,
          col2: item.Correo,
          col3: item.Grupo,
          col4: item.Directorio,
          col5: item.ID_valid, // Estado predeterminado
        }));
        setApiData(transformedData);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      }
    };

    fetchInformes();
  }, []);

  // Carga de datos desde la API
  useEffect(() => {
    const fetchInformes1 = async () => {
      try {
        const response = await fetch("/api/getInformes1");
        const data = await response.json();
        const transformedData = data.map((item) => ({
          col0: item.ID,
          col1: item.NombreU,
          col2: item.Correo,
          col3: item.Grupo,
          col4: item.Directorio,
          col5: item.ID_valid, // Estado predeterminado
        }));
        setApiData1(transformedData);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      }
    };

    fetchInformes1();
  }, []);

  // Carga de datos desde la API
  useEffect(() => {
    const fetchInformes2 = async () => {
      try {
        const response = await fetch("/api/getInformes2");
        const data = await response.json();
        const transformedData = data.map((item) => ({
          col0: item.ID,
          col1: item.NombreU,
          col2: item.Correo,
          col3: item.Grupo,
          col4: item.Directorio,
          col5: item.ID_valid, // Estado predeterminado
        }));
        setApiData2(transformedData);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      }
    };

    fetchInformes2();
  }, []);

  // Carga de datos desde la API
  useEffect(() => {
    const fetchInformes3 = async () => {
      try {
        const response = await fetch("/api/getInformes3");
        const data = await response.json();
        const transformedData = data.map((item) => ({
          col0: item.ID,
          col1: item.NombreU,
          col2: item.Correo,
          col3: item.Grupo,
          col4: item.Directorio,
          col5: item.ID_valid, // Estado predeterminado
        }));
        setApiData3(transformedData);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      }
    };

    fetchInformes3();
  }, []);

  // Carga de datos desde la API
  useEffect(() => {
    const fetchInformes4 = async () => {
      try {
        const response = await fetch("/api/getInformes4");
        const data = await response.json();
        const transformedData = data.map((item) => ({
          col0: item.ID,
          col1: item.NombreU,
          col2: item.Correo,
          col3: item.Grupo,
          col4: item.Directorio,
          col5: item.ID_valid, // Estado predeterminado
        }));
        setApiData4(transformedData);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      }
    };

    fetchInformes4();
  }, []);

  const data = {
    "Registro-de-Canalización": apiData,
    "Programa-Acción-Tutoria": apiData1,
    "Registro-de-Estudiante": apiData2,
    "Registro-General-de-Tutoria-Individual": apiData3,
    "Informe-Del-Cierre-Del-PAT": apiData4,
  };

  const renderContent = () => {
    const selectedData = data[activeTab] || [];
    const filteredData = selectedData.filter((row) => {
      const matchesSearchQuery = Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesStatus =
        filterStatus === "" ||
        (filterStatus === "1" && row.col5 === 1) ||
        (filterStatus === "2" && row.col5 === 2) ||
        (filterStatus === "3" && row.col5 === 3);

      return matchesSearchQuery && matchesStatus;
    });

    return (
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className={styles.filterDropdown}
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <option value="">Todos</option>
          <option value="1">Aceptado</option>
          <option value="2">Pendiente</option>
          <option value="3">Rechazado</option>
        </select>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Grupo</th>
              <th>Ver</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.col0}</td>
                <td>{row.col1}</td>
                <td>{row.col2}</td>
                <td>{row.col3}</td>
                <td>
                    <a
                      href={`/api/download/${row.col4.replace(
                        "/Documents/",
                        ""
                      )}`}
                      download
                    >
                      <FaDownload size={30} /> {/* Cambia el tamaño aquí */}
                    </a>
                  </td>
                <td>
                  <label>
                    {row.col5 === 1
                      ? "Aceptado"
                      : row.col5 === 2
                      ? "Pendiente"
                      : row.col5 === 3
                      ? "Rechazado"
                      : "Desconocido"}
                  </label>
                </td>
                <td>
                  <div className={styles.optionsContainer}>
                    <button
                      className={styles.acceptButton}
                      onClick={() => handleAccept(row.col0, row.col1)}
                    >
                      Aceptar
                    </button>
                    <button
                      className={styles.rejectButton}
                      onClick={() => handleReject(row.col0, row.col1)}
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      style={{
        marginTop: "80px",
        marginLeft: "60px",
        transition: "margin-left 0.3s ease",
      }}
    >
      <div className={styles.container}>
        <Navbar />
        <NavbarHamburguesa />
        <main className={styles.main}>
          <h1 className={styles.headerText}>Informes</h1>
          <nav className={styles.navbar}>
            <a
              href="#"
              className={`${styles.navItem} ${
                activeTab === "Registro-de-Canalización"
                  ? styles.activeItem
                  : ""
              }`}
              onClick={() => handleTabClick("Registro-de-Canalización")}
            >
              Registro de canalización
            </a>
            <a
              href="#"
              className={`${styles.navItem} ${
                activeTab === "Programa-Acción-Tutoria" ? styles.activeItem : ""
              }`}
              onClick={() => handleTabClick("Programa-Acción-Tutoria")}
            >
              Programa acción tutoría
            </a>
            <a
              href="#"
              className={`${styles.navItem} ${
                activeTab === "Registro-de-Estudiante" ? styles.activeItem : ""
              }`}
              onClick={() => handleTabClick("Registro-de-Estudiante")}
            >
              Registro de estudiante
            </a>
            <a
              href="#"
              className={`${styles.navItem} ${
                activeTab === "Registro-General-de-Tutoria-Individual"
                  ? styles.activeItem
                  : ""
              }`}
              onClick={() =>
                handleTabClick("Registro-General-de-Tutoria-Individual")
              }
            >
              Registro general de tutoría individual
            </a>
            <a
              href="#"
              className={`${styles.navItem} ${
                activeTab === "Informe-Del-Cierre-Del-PAT"
                  ? styles.activeItem
                  : ""
              }`}
              onClick={() => handleTabClick("Informe-Del-Cierre-Del-PAT")}
            >
              Informe del cierre del PAT
            </a>
          </nav>
          <div className={styles.activeBar}></div>
          <div className={styles.content}>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
