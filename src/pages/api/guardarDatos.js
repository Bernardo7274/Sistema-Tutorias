import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, correoElectronico, rol, grupo, nombreEspecifico, fileUrl } = req.body;

    // Verifica los datos recibidos
    console.log(req.body); // Verifica los datos que están llegando

    if (!nombre || !correoElectronico || !rol || !grupo || !nombreEspecifico || !fileUrl) {
      return res.status(400).json({ success: false, message: 'Faltan datos en la solicitud.' });
    }

    // Establecer la conexión con la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'sistema tutorías',
      password: '', // Sin contraseña
    });

    try {
      // Insertar los datos en la base de datos
      const [result] = await connection.execute(
        `INSERT INTO informes (NombreU, Correo, Grupo, Rol, Directorio, ID_valid, NombreDocu) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, correoElectronico, grupo, rol, fileUrl, 2, nombreEspecifico]
      );

      res.status(200).json({ success: true, message: 'Datos insertados correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al insertar los datos' });
    } finally {
      await connection.end();
    }
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' });
  }
}
