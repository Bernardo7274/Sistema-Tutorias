import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { filename } = req.query; // Obtiene solo el nombre del archivo
  
  // Define la carpeta donde están los documentos
  const fileDirectory = path.join(process.cwd(), 'Documents');
  
  // Ruta completa del archivo
  const filePath = path.join(fileDirectory, filename);

  // Verifica si el archivo existe
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath);

    // Establece los encabezados para que el archivo se descargue como PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.send(file);
  } else {
    // Si no se encuentra el archivo, devuelve un error 404
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
}
