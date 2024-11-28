// pages/api/getPrograms.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sistema tutorías',
    password: '', // Sin contraseña
  });

  try {
    const [rows] = await connection.query('SELECT * FROM ProgramasEducativos');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los programas educativos' });
  } finally {
    await connection.end();
  }
}
