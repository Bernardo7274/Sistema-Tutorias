import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Usuarios() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div style={container}>
      <header style={header}>
        <img
          src="/logo.png"
          alt="Universidad Politécnica de Quintana Roo"
          style={logo}
        />
        <nav style={nav}>
          <button
            style={navButton}
            onClick={() => handleRedirect("/inicio")}
          >
            <img src="/icon_inicio.png" alt="Inicio" style={navIcon} />
            <span style={navText}>Inicio</span>
          </button>
          <button
            style={navButton}
            onClick={() => handleRedirect("/inicio")}
          >
            <img src="/icon_inicio.png" alt="Inicio" style={navIcon} />
            <span style={navText}>Inicio</span>
          </button>
        </nav>
      </header>

      <nav style={{ ...navStyle, width: menuOpen ? "250px" : "100px" }}>
        <ul style={navListStyle}>
          <div style={navItemStyle} onClick={toggleMenu}>
            <img src="/path-to-menu-icon.png" alt="Menu" style={iconStyle} />
          </div>
          <li
            style={{ ...navItemStyle }}
            onClick={() => handleRedirect("/usuarios")}
          >
            <img
              src="/path-to-user-icon.png"
              alt="Usuarios"
              style={iconStyle}
            />
            {menuOpen && <span>Usuarios</span>}
          </li>
          <li style={navItemStyle} onClick={() => handleRedirect("/dashboard")}>
            <img
              src="/path-to-reports-icon.png"
              alt="Informes"
              style={iconStyle}
            />
            {menuOpen && <span>Informes</span>}
          </li>
          <li style={navItemStyle} onClick={() => handleRedirect("/dashboard")}>
            <img
              src="/path-to-summary-icon.png"
              alt="Resumen General"
              style={iconStyle}
            />
            {menuOpen && <span>Resumen General</span>}
          </li>
        </ul>
      </nav>

      <main style={main}>
        <UserTable />
      </main>
    </div>
  );
}

function UserTable() {
  const [usuarios, setUsuarios] = useState([]);

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
        <input id="add-nombre" class="swal2-input" style="width: 300px;" placeholder="Nombre">
        <input id="add-correo" class="swal2-input" style="width: 300px;" placeholder="Correo">
        <input id="add-contraseña" type="password" class="swal2-input" style="width: 300px;" placeholder="Contraseña">
        <select id="add-rol" class="swal2-input" style="width: 300px;">
          <option value="1">Estudiante</option>
          <option value="2">Tutor</option>
          <option value="3">Administrador</option>
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

        // Validación de correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
          Swal.showValidationMessage("Por favor, ingresa un correo válido.");
          return false;
        }

        // Validación de contraseña
        const contraseñaRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,8}$/;
        if (!contraseñaRegex.test(contraseña)) {
          Swal.showValidationMessage(
            "La contraseña debe tener entre 6 y 8 caracteres, con al menos una mayúscula, una minúscula y un carácter especial."
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
      title: `Editar Usuario: ${usuario.nombre}`,
      html: `
        <input id="edit-nombre" class="swal2-input" style="width: 350px;" placeholder="Nombre" value="${
          usuario.nombre
        }">
        <input id="edit-correo" class="swal2-input" style="width: 350px;" placeholder="Correo" value="${
          usuario.correo
        }">
        <input id="edit-contraseña" type="password" class="swal2-input" style="width: 350px;" placeholder="Contraseña">
        <select id="edit-rol" class="swal2-input" style="width: 350px;">
          <option value="1" ${
            usuario.rol_id === 1 ? "selected" : ""
          }>Estudiante</option>
          <option value="2" ${
            usuario.rol_id === 2 ? "selected" : ""
          }>Tutor</option>
          <option value="3" ${
            usuario.rol_id === 3 ? "selected" : ""
          }>Administrador</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = document.getElementById("edit-nombre").value;
        const correo = document.getElementById("edit-correo").value;
        const contraseña = document.getElementById("edit-contraseña").value;
        const rol_id = document.getElementById("edit-rol").value;

        // Validación de correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
          Swal.showValidationMessage("Por favor, ingresa un correo válido.");
          return false;
        }

        // Validación de contraseña
        const contraseñaRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,8}$/;
        if (contraseña && !contraseñaRegex.test(contraseña)) {
          Swal.showValidationMessage(
            "La contraseña debe tener entre 6 y 8 caracteres, con al menos una mayúscula, una minúscula y un carácter especial."
          );
          return false;
        }

        return { id: usuario.id, nombre, correo, contraseña, rol_id };
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

  return (
    <div style={tableContainer}>
      <div style={tableHeader}>
        <span>Nuevos Usuarios</span>
        <button style={addButton} onClick={handleAddUser}>
          Agregar+
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderCell}>Id</th>
            <th style={tableHeaderCell}>Nombre</th>
            <th style={tableHeaderCell}>Correo</th>
            <th style={tableHeaderCell}>Rol</th>
            <th style={tableHeaderCell}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td style={tableCell}>{usuario.id}</td>
              <td style={tableCell}>{usuario.nombre}</td>
              <td style={tableCell}>{usuario.correo}</td>
              <td style={tableCell}>
                {usuario.rol_id === 1
                  ? "Estudiante"
                  : usuario.rol_id === 2
                  ? "Tutor"
                  : "Administrador"}
              </td>
              <td style={tableCell}>
                <button
                  style={editButton}
                  onClick={() => handleEditUser(usuario)}
                >
                  Editar
                </button>
                <button
                  style={deleteButton}
                  onClick={() => eliminarUsuario(usuario.id)}
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

// Estilos CSS adicionales para la tabla

const tableContainer = {
  backgroundColor: "#D8B084",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#D8B084",
  padding: "10px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#FFF",
  borderRadius: "5px",
  marginBottom: "10px",
};

const addButton = {
  backgroundColor: "#FF8C00",
  color: "#FFF",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tableHeaderCell = {
  backgroundColor: "#E29742",
  color: "#000",
  padding: "10px",
  border: "1px solid #000",
};

const tableCell = {
  padding: "10px",
  border: "1px solid #000",
  textAlign: "center",
};

const editButton = {
  backgroundColor: "green",
  color: "#FFF",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  marginRight: "5px",
};

const deleteButton = {
  backgroundColor: "red",
  color: "#FFF",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
};

// Estilos CSS existentes

const header = {
  width: "100%",
  backgroundColor: "#FF8C00",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
};

const logo = {
  height: "60px",
};

const navStyle = {
  position: "fixed",
  left: 0,
  top: "80.4px",
  width: "60px",
  height: "100%",
  backgroundColor: "#FF8C00",
  transition: "width 0.3s ease",
  paddingTop: "20px",
  overflow: "hidden",
};

const navListStyle = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  color: "#000",
  cursor: "pointer",
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease",
  whiteSpace: "nowrap",
};

const iconStyle = {
  width: "50px",
  height: "50px",
  marginRight: "10px",
};

const container = {
  fontFamily: "'Montserrat', sans-serif",
  backgroundColor: "#f0f0f0",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const main = {
  textAlign: "center",
  paddingTop: "90px",
};

const nav = {
  display: "flex",
  gap: "20px",
};

const navButton = {
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
};

const navIcon = {
  width: "20px",
  height: "20px",
  marginRight: "10px",
};

const navText = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
};