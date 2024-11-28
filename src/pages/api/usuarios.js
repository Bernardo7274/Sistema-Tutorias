import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "sistema tutorías",
  password: "", // Sin contraseña
};

export default async function handler(req, res) {
  const connection = await mysql.createConnection(dbConfig);

  if (req.method === "GET") {
    const [rows] = await connection.execute("SELECT * FROM InicioSesiones");
    res.status(200).json(rows);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await connection.execute("DELETE FROM InicioSesiones WHERE ID = ?", [id]);
    res.status(200).json({ message: "Usuario eliminado" });
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { nombre, correo, contraseña, rol_id } = req.body;

    // Validación de correo: debe terminar en "@upqroo.edu.mx"
    const correoRegex = /^[^\s@]+@upqroo\.edu\.mx$/;
    if (!correoRegex.test(correo)) {
      return res.status(400).json({ message: "Correo debe ser de dominio '@upqroo.edu.mx'" });
    }

    // Construir la consulta SQL de actualización con o sin contraseña
    const updateQuery = contraseña
      ? "UPDATE InicioSesiones SET Nombre = ?, Correo = ?, Contraseña = ?, ID_Rol = ? WHERE ID = ?"
      : "UPDATE InicioSesiones SET Nombre = ?, Correo = ?, ID_Rol = ? WHERE ID = ?";

    const params = contraseña
      ? [nombre, correo, contraseña, rol_id, id]
      : [nombre, correo, rol_id, id];

    await connection.execute(updateQuery, params);
    res.status(200).json({ message: "Usuario actualizado" });
  } else if (req.method === "POST") {
    const { nombre, correo, contraseña, rol_id } = req.body;

    // Validación de correo: debe terminar en "@upqroo.edu.mx"
    const correoRegex = /^[^\s@]+@upqroo\.edu\.mx$/;
    if (!correoRegex.test(correo)) {
      return res.status(400).json({ message: "Correo debe ser de dominio '@upqroo.edu.mx'" });
    }

    await connection.execute(
      "INSERT INTO InicioSesiones (Nombre, Correo, Contraseña, ID_Rol) VALUES (?, ?, ?, ?)",
      [nombre, correo, contraseña, rol_id]
    );
    res.status(201).json({ message: "Usuario agregado" });
  }
}
