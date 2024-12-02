import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "", // Sin contraseña
  });

  try {
    // Consulta para obtener los datos de la tabla 'informes'
    const query = `
      SELECT ID, NombreU, Correo, Grupo, Directorio, ID_valid FROM informes WHERE NombreDocu = "Informe-Del-Cierre-Del-PAT"
    `;
    const [rows] = await connection.query(query);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los informes:", error);
    res.status(500).json({ error: "Error al obtener los informes" });
  } finally {
    await connection.end();
  }
}
