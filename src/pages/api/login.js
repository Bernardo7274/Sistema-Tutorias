import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { correo, contraseña } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'prueba',
        password: '', // Sin contraseña
      });

      const [rows] = await connection.execute(
        'SELECT inicio_de_sesion.nombre, roles.nombre as rol FROM inicio_de_sesion INNER JOIN roles ON inicio_de_sesion.rol_id = roles.id WHERE inicio_de_sesion.correo = ? AND inicio_de_sesion.contraseña = ?',
        [correo, contraseña]
      );

      if (rows.length > 0) {
        const { nombre, rol } = rows[0];
        res.status(200).json({ success: true, nombre, rol });
      } else {
        res.status(401).json({ success: false });
      }

      await connection.end();
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error de servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
