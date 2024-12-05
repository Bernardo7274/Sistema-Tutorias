import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Extraemos los datos del cuerpo de la solicitud
  const { nombre, correo, grupo, rol, periodo, cuatrimestre, programa } = req.body;

  // Validación de los datos recibidos
  if (!nombre || !correo || !grupo || !rol || !periodo || !cuatrimestre || !programa) {
    return res.status(400).json({ error: 'Faltan datos en el formulario' });
  }

  // Establecemos la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sistema tutorías",
    password: "", // Contraseña de la base de datos, si la tiene
  });

  try {
    // Realizamos la consulta para insertar un nuevo curso
    const query = `
      INSERT INTO cursos (Nombre, Correo, Grupo, Rol, Periodo, Cuatrimestre, Programa)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    
    const [result] = await connection.query(query, [nombre, correo, grupo, rol, periodo, cuatrimestre, programa]);

    // Respondemos con un mensaje de éxito
    res.status(200).json({
      message: 'Curso agregado correctamente',
      result: result,
    });
  } catch (error) {
    console.error("Error al agregar el curso:", error);
    res.status(500).json({ error: 'Error al agregar el curso' });
  } finally {
    await connection.end();
  }
}
