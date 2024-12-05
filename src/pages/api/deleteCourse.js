import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query; // Obtener el ID del curso desde la query

    if (!id) {
      return res.status(400).json({ error: "El ID del curso es requerido." });
    }

    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "sistema tutorías",
        password: "", // Sin contraseña
      });

      // Ejecutar la consulta para eliminar el curso por ID
      const [result] = await connection.execute(
        "DELETE FROM cursos WHERE ID = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      // Cerrar la conexión
      await connection.end();

      // Responder con éxito
      res.status(200).json({ message: "Curso eliminado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un problema al eliminar el curso" });
    }
  } else {
    // Si no es un método DELETE, responder con un error
    res.status(405).json({ error: "Método no permitido" });
  }
}
