import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { nombreUsuario } = req.query; // Recibe el nombre del usuario desde la query

  if (!nombreUsuario) {
    return res.status(400).json({ error: "Se requiere un nombre de usuario." });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "", // Sin contraseña
  });

  try {
    const query = `
      SELECT ID, NombreU, Correo, Grupo, Directorio, ID_valid FROM informes WHERE NombreU = ?
    `;
    const [rows] = await connection.query(query, [nombreUsuario]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los informes:", error);
    res.status(500).json({ error: "Error al obtener los informes" });
  } finally {
    await connection.end();
  }
}
