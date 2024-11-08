import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "prueba",
  password: "", // Sin contraseña
};

export default async function handler(req, res) {
  const connection = await mysql.createConnection(dbConfig);

  if (req.method === "GET") {
    const [rows] = await connection.execute("SELECT * FROM inicio_de_sesion");
    res.status(200).json(rows);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await connection.execute("DELETE FROM inicio_de_sesion WHERE id = ?", [id]);
    res.status(200).json({ message: "Usuario eliminado" });
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { nombre, correo, contraseña, rol_id } = req.body;

    // Validaciones
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseñaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,8}$/;

    if (
      !correoRegex.test(correo) ||
      (contraseña && !contraseñaRegex.test(contraseña))
    ) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    // Construir la consulta SQL de actualización con o sin contraseña
    const updateQuery = contraseña
      ? "UPDATE inicio_de_sesion SET nombre = ?, correo = ?, contraseña = ?, rol_id = ? WHERE id = ?"
      : "UPDATE inicio_de_sesion SET nombre = ?, correo = ?, rol_id = ? WHERE id = ?";

    const params = contraseña
      ? [nombre, correo, contraseña, rol_id, id]
      : [nombre, correo, rol_id, id];

    await connection.execute(updateQuery, params);
    res.status(200).json({ message: "Usuario actualizado" });
  } else if (req.method === "POST") {
    const { nombre, correo, contraseña, rol_id } = req.body;

    // Validaciones
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraseñaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,8}$/;

    if (!correoRegex.test(correo) || !contraseñaRegex.test(contraseña)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    await connection.execute(
      "INSERT INTO inicio_de_sesion (nombre, correo, contraseña, rol_id) VALUES (?, ?, ?, ?)",
      [nombre, correo, contraseña, rol_id]
    );
    res.status(201).json({ message: "Usuario agregado" });
  }
}
