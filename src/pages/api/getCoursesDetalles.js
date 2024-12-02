import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { grupo } = req.query; // Extraer el parámetro 'grupo'

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "",
  });

  try {
    const query = `
        SELECT 
            cursos.ID,
            cursos.Nombre,
            cursos.Correo,
            cursos.Grupo,
            cursos.Rol,
            cuatrimestres.Nombre AS Cuatrimestre,
            periodos.Nombre AS Periodo,
            programaseducativos.Nombre AS Programa
        FROM cursos
        JOIN cuatrimestres ON cursos.Cuatrimestre = cuatrimestres.ID
        JOIN periodos ON cursos.Periodo = periodos.ID
        JOIN programaseducativos ON cursos.Programa = programaseducativos.ID
        WHERE cursos.Grupo = ?;
    `;
    const [rows] = await connection.query(query, [grupo]); // Usamos el parámetro 'grupo'

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los detalles del grupo" });
  } finally {
    await connection.end();
  }
}
