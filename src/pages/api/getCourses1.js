import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { tutorName } = req.query; // Obtener el nombre del tutor desde la query

  if (!tutorName) {
    return res.status(400).json({ error: "El nombre del tutor es requerido." });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "", // Sin contraseña
  });

  try {
    const query = `
        SELECT 
            cursos.ID,
            cursos.Nombre,
            cursos.Correo,
            cursos.Grupo,
            cuatrimestres.Nombre AS Cuatrimestre,
            periodos.Nombre AS Periodo,
            programaseducativos.Nombre AS Programa,
            (SELECT COUNT(*)
            FROM cursos AS alumnos
            WHERE alumnos.Grupo = cursos.Grupo
                AND alumnos.Rol = 'Estudiante') AS NumAlumnos
        FROM cursos
        JOIN cuatrimestres ON cursos.Cuatrimestre = cuatrimestres.ID
        JOIN periodos ON cursos.Periodo = periodos.ID
        JOIN programaseducativos ON cursos.Programa = programaseducativos.ID
        WHERE REPLACE(REPLACE(cursos.Nombre, ' ', ''), '\r\n', '') = REPLACE(?, ' ', '');
    `;
    const [rows] = await connection.query(query, [tutorName]); // Pasa el nombre como parámetro

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los cursos" });
  } finally {
    await connection.end();
  }
}
