import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { id } = req.body; // Extrae el ID del cuerpo de la solicitud

  if (!id) {
    return res.status(400).json({ error: "El ID es requerido" });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "", // Sin contraseña
  });

  try {
    const query = `
      UPDATE informes
      SET ID_valid = 1
      WHERE ID = ?;
    `;
    const [result] = await connection.query(query, [id]); // Pasa el ID como parámetro

    res
      .status(200)
      .json({ message: "Registro actualizado correctamente", result });
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    res.status(500).json({ error: "Error al actualizar el registro" });
  } finally {
    await connection.end();
  }
}
