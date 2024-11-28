import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { correo, contraseña } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'sistema tutorías',
        password: '', // Sin contraseña
      });

      const [rows] = await connection.execute(
        'SELECT iniciosesiones.Nombre as nombre, iniciosesiones.Correo as correoElectronico, roles.Nombre as rol FROM iniciosesiones INNER JOIN roles ON iniciosesiones.ID_Rol = roles.ID WHERE iniciosesiones.Correo = ? AND iniciosesiones.Contraseña = ?',
        [correo, contraseña]
      );

      if (rows.length > 0) {
        const { nombre, rol, correoElectronico } = rows[0];
        res.status(200).json({ success: true, nombre, rol, correoElectronico });
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
