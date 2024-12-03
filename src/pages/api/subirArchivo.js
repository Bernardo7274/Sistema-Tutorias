// pages/api/subirArchivo.js
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

// Configuración del parseo de archivos
export const config = {
  api: {
    bodyParser: false, // Desactiva el body parser de Next.js para poder manejar los archivos
  },
};

// Función para manejar la subida del archivo
const handler = (req, res) => {
  if (req.method === "POST") {
    const form = formidable(); // Usar formidable directamente como función

    form.uploadDir = path.join(process.cwd(), "Documents"); // Carpeta donde se almacenarán los archivos
    form.keepExtensions = true; // Mantener las extensiones de los archivos
    form.multiples = true; // Permitir múltiples archivos

    // Asegurarse de que la carpeta "Documents" exista
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir);
    }

    // Parsear los archivos recibidos
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error al procesar el archivo." });
      }

      // Generar un nombre único para el archivo
      const file = files.file[0];
      const fileName = uuidv4() + path.extname(file.originalFilename); // Generar nombre único con extensión

      // Mover el archivo a la carpeta 'Documents'
      const oldPath = file.filepath;
      const newPath = path.join(form.uploadDir, fileName);

      fs.renameSync(oldPath, newPath);

      // Devuelve la URL o el path del archivo almacenado
      const fileUrl = `/Documents/${fileName}`;
      res.status(200).json({
        success: true,
        message: "Archivo subido correctamente.",
        fileUrl: fileUrl, // Aquí es donde el frontend puede obtener la URL para usarla más adelante
      });
    });
  } else {
    res.status(405).json({ success: false, message: "Método no permitido." });
  }
};

export default handler;
