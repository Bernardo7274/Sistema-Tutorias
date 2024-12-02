import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar_administador";
import NavbarHamburguesa from "../components/Navbar_hamburguesa";
import styles from "@/styles/Usuarios.module.css";

export default function Usuarios() {
  return (
    <div className={styles.container}>
      <Navbar />
      <NavbarHamburguesa />
      <main className={styles.main}>
        <UserTable />
      </main>
    </div>
  );
}

function UserTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRol, setSelectedRol] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await fetch("/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  const handleAddUser = () => {
    Swal.fire({
      title: "Agregar Nuevo Usuario",
      html: `
        <input id="add-nombre" class="swal2-input" style="width: 400px;" placeholder="Nombre completo">
        <input id="add-correo" class="swal2-input" style="width: 400px;" placeholder="Correo">
        <div style="position: relative;">
          <input id="add-contraseña" type="password" class="swal2-input" style="width: 400px;" placeholder="Contraseña">
        </div>
        <br />
        <select id="add-rol" class="swal2-input" style="width: 150px;">
          <option value="1">Administrador</option>
          <option value="2">Tutor</option>
          <option value="3">Estudiante</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = document.getElementById("add-nombre").value;
        const correo = document.getElementById("add-correo").value;
        const contraseña = document.getElementById("add-contraseña").value;
        const rol_id = document.getElementById("add-rol").value;

        // Validación de correo: debe terminar en "@upqroo.edu.mx"
        const correoRegex = /^[^\s@]+@upqroo\.edu\.mx$/;
        if (!correoRegex.test(correo)) {
          Swal.showValidationMessage(
            "Por favor, ingresa un correo del dominio '@upqroo.edu.mx'."
          );
          return false;
        }

        return { nombre, correo, contraseña, rol_id };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { nombre, correo, contraseña, rol_id } = result.value;

        await fetch("/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, correo, contraseña, rol_id }),
        });

        fetchUsuarios(); // Refrescar la lista de usuarios
        Swal.fire("Guardado", "El nuevo usuario ha sido agregado.", "success");
      }
    });
  };

  const handleEditUser = (usuario) => {
    Swal.fire({
      title: `Editar Usuario: ${usuario.Nombre}`,
      html: `
        <input id="edit-nombre" class="swal2-input" style="width: 400px;" placeholder="Nombre completo" value="${
          usuario.Nombre
        }">
        <input id="edit-correo" class="swal2-input" style="width: 400px;" placeholder="Correo" value="${
          usuario.Correo
        }">
        <div style="position: relative;">
          <input id="edit-contraseña" type="password" class="swal2-input" style="width: 400px;" placeholder="Contraseña">
          <i id="help-icon" class="fa fa-question-circle" style="position: absolute; right: 10px; top: 15px; cursor: pointer;"></i>
        </div>
        <br />
        <select id="edit-rol" class="swal2-input" style="width: 150px;">
          <option value="1" ${
            usuario.ID_Rol === 1 ? "selected" : ""
          }>Administrador</option>
          <option value="2" ${
            usuario.ID_Rol === 2 ? "selected" : ""
          }>Tutor</option>
          <option value="3" ${
            usuario.ID_Rol === 3 ? "selected" : ""
          }>Estudiante</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      didOpen: () => {
        // Mostrar mensaje al hacer clic en el ícono de ayuda
        document.getElementById("help-icon").addEventListener("click", () => {
          Swal.fire(
            "Información de Contraseña",
            "Si no proporcionas una contraseña nueva, se mantendrá la actual.",
            "info"
          );
        });
      },
      preConfirm: () => {
        const nombre = document.getElementById("edit-nombre").value;
        const correo = document.getElementById("edit-correo").value;
        const contraseña = document.getElementById("edit-contraseña").value;
        const rol_id = document.getElementById("edit-rol").value;

        // Validación de correo: debe terminar en "@upqroo.edu.mx"
        const correoRegex = /^[^\s@]+@upqroo\.edu\.mx$/;
        if (!correoRegex.test(correo)) {
          Swal.showValidationMessage(
            "Por favor, ingresa un correo del dominio '@upqroo.edu.mx'."
          );
          return false;
        }

        return {
          id: usuario.ID,
          nombre,
          correo,
          contraseña: contraseña || null,
          rol_id,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { id, nombre, correo, contraseña, rol_id } = result.value;

        await fetch(`/api/usuarios?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, correo, contraseña, rol_id }),
        });

        fetchUsuarios(); // Refrescar la lista de usuarios
        Swal.fire("Guardado", "El usuario ha sido actualizado.", "success");
      }
    });
  };

  const eliminarUsuario = async (id) => {
    // Modal de confirmación para eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`/api/usuarios?id=${id}`, {
          method: "DELETE",
        });
        fetchUsuarios();
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    return (
      (usuario.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (selectedRol ? usuario.ID_Rol === parseInt(selectedRol) : true)
    );
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <span>Nuevos Usuarios</span>
        <button className={styles.addButton} onClick={handleAddUser}>
          Agregar+
        </button>
      </div>
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          className={styles.filterInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Seleccionar rol</option>
          <option value="1">Administrador</option>
          <option value="2">Tutor</option>
          <option value="3">Estudiante</option>
        </select>
      </div>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            <th className={styles.tableHeaderCell}>Id</th>
            <th className={styles.tableHeaderCell}>Nombre</th>
            <th className={styles.tableHeaderCell}>Correo</th>
            <th className={styles.tableHeaderCell}>Rol</th>
            <th className={styles.tableHeaderCell}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.ID}>
              <td className={styles.tableCell}>{usuario.ID}</td>
              <td className={styles.tableCell}>{usuario.Nombre}</td>
              <td className={styles.tableCell}>{usuario.Correo}</td>
              <td className={styles.tableCell}>
                {usuario.ID_Rol === 1
                  ? "Administrador"
                  : usuario.ID_Rol === 2
                  ? "Tutor"
                  : "Estudiante"}
              </td>
              <td className={styles.tableCell}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditUser(usuario)}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => eliminarUsuario(usuario.ID)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
