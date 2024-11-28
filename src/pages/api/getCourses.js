// pages/api/getCourses.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'sistema tutorías',
        password: '', // Sin contraseña
    });

    try {
        // Consulta para obtener cursos donde el rol es "Tutor" junto con la información de cuatrimestres, programas y periodos
        const query = `
      SELECT 
        cursos.ID,
        cursos.Nombre,
        cursos.Correo,
        cursos.Grupo,
        cuatrimestres.Nombre AS Cuatrimestre,
        periodos.Nombre AS Periodo,
        programaseducativos.Nombre AS Programa
      FROM cursos
      JOIN cuatrimestres ON cursos.Cuatrimestre = cuatrimestres.ID
      JOIN periodos ON cursos.Periodo = periodos.ID
      JOIN programaseducativos ON cursos.Programa = programaseducativos.ID
      WHERE cursos.Rol = 'Tutor';
    `;
        const [rows] = await connection.query(query);

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    } finally {
        await connection.end();
    }
}
