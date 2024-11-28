// pages/api/getGroups.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { tutorName } = req.query;

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sistema tutorías',
    password: '', // Sin contraseña
  });

  try {
    const [rows] = await connection.query(
      `SELECT ID, Grupo, Rol 
       FROM cursos 
       WHERE REPLACE(REPLACE(Nombre, ' ', ''), '\r\n', '') = REPLACE(?, ' ', '')`,
      [tutorName]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los grupos y roles' });
  } finally {
    await connection.end();
  }
}
