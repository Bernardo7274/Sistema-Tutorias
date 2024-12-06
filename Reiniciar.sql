-- Desactiva las restricciones de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Borra los datos de cada tabla y reinicia el auto_increment
TRUNCATE TABLE cursos;
TRUNCATE TABLE informes;
TRUNCATE TABLE iniciosesiones;

-- Reactiva las restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;