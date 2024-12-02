import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar_tutor";
import styles from "@/styles/GrupoDetalles1.module.css";

export default function GrupoDetalles() {
  const router = useRouter();
  const { grupo } = router.query; // Extraer el parámetro 'grupo' de la URL
  const [groupDetails, setGroupDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterRole, setFilterRole] = useState(""); // Filtro por rol

  useEffect(() => {
    if (grupo) {
      // Llamar a la API solo cuando 'grupo' esté disponible
      const fetchGroupDetails = async () => {
        const response = await fetch(`/api/getCoursesDetalles?grupo=${grupo}`);
        const data = await response.json();
        setGroupDetails(data);
        setFilteredDetails(data); // Inicializar los detalles filtrados
      };

      fetchGroupDetails();
    }
  }, [grupo]);

  useEffect(() => {
    // Filtrar datos cuando cambian los filtros
    const filtered = groupDetails.filter((detail) => {
      const matchesName = detail.Nombre.toLowerCase().includes(
        searchName.toLowerCase()
      );
      const matchesRole = filterRole === "" || detail.Rol === filterRole;
      return matchesName && matchesRole;
    });
    setFilteredDetails(filtered);
  }, [searchName, filterRole, groupDetails]);

  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{grupo}</h1>
        {/* Imagen debajo de los detalles del grupo */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/asignatura.png"
            alt="Descripción de la imagen"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Filtros */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              padding: "14px 24px",
              borderRadius: "10px",
              border: "2px solid #007BFF",
              fontSize: "16px",
              width: "350px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
            }}
            onFocus={(e) => {
              e.target.style.border = "2px solid #0056b3";
              e.target.style.boxShadow = "0px 0px 12px rgba(0, 86, 179, 0.5)";
            }}
            onBlur={(e) => {
              e.target.style.border = "2px solid #007BFF";
              e.target.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f0f8ff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ffffff";
            }}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: "14px 24px",
              borderRadius: "10px",
              border: "2px solid #007BFF",
              fontSize: "16px",
              width: "300px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
              transition: "all 0.3s ease-in-out",
            }}
            onFocus={(e) => {
              e.target.style.border = "2px solid #0056b3";
              e.target.style.boxShadow = "0px 0px 12px rgba(0, 86, 179, 0.5)";
            }}
            onBlur={(e) => {
              e.target.style.border = "2px solid #007BFF";
              e.target.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#e6f7ff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#f9f9f9";
            }}
          >
            <option value="" style={{ fontSize: "16px" }}>
              Todos los roles
            </option>
            <option value="Tutor" style={{ fontSize: "16px" }}>
              Tutor
            </option>
            <option value="Estudiante" style={{ fontSize: "16px" }}>
              Estudiante
            </option>
          </select>
        </div>

        {/* Tabla */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail) => (
              <tr key={detail.ID}>
                <td>{detail.Nombre}</td>
                <td>{detail.Correo}</td>
                <td>{detail.Rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
