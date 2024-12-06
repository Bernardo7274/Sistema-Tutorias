-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-12-2024 a las 06:37:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema tutorías`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuatrimestres`
--

CREATE TABLE `cuatrimestres` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cuatrimestres`
--

INSERT INTO `cuatrimestres` (`ID`, `Nombre`) VALUES
(1, 'Primer Cuatrimestre'),
(2, 'Segundo Cuatrimestre'),
(3, 'Tercer Cuatrimestre'),
(4, 'Cuarto Cuatrimestre'),
(5, 'Quinto Cuatrimestre'),
(6, 'Sexto Cuatrimestre'),
(7, 'Séptimo Cuatrimestre'),
(8, 'Octavo Cuatrimestre'),
(9, 'Noveno Cuatrimestre'),
(10, 'Décimo Cuatrimestre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Grupo` varchar(50) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `Periodo` int(11) DEFAULT NULL,
  `Cuatrimestre` int(11) DEFAULT NULL,
  `Programa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informes`
--

CREATE TABLE `informes` (
  `ID` int(11) NOT NULL,
  `NombreU` varchar(100) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Grupo` varchar(50) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `Directorio` varchar(255) DEFAULT NULL,
  `ID_valid` int(1) DEFAULT NULL,
  `NombreDocu` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iniciosesiones`
--

CREATE TABLE `iniciosesiones` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Correo` varchar(100) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  `ID_Rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE `periodos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`ID`, `Nombre`) VALUES
(1, 'Enero - Abril'),
(2, 'Mayo - Agosto'),
(3, 'Septiembre - Diciembre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programaseducativos`
--

CREATE TABLE `programaseducativos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `programaseducativos`
--

INSERT INTO `programaseducativos` (`ID`, `Nombre`) VALUES
(1, 'Licenciatura en Ingeniería Financiera'),
(2, 'Licenciatura en Ingeniería Biomédica'),
(3, 'Licenciatura en Ingeniería en Tecnologías de la Información e Innovación Digital'),
(4, 'Ingeniería en Biotecnología'),
(5, 'Licenciatura en Terapia Física'),
(6, 'Licenciatura en Administración');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID`, `Nombre`) VALUES
(1, 'Administrador'),
(2, 'Tutor'),
(3, 'Estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `validaciones`
--

CREATE TABLE `validaciones` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `validaciones`
--

INSERT INTO `validaciones` (`ID`, `Nombre`) VALUES
(1, 'Aceptado'),
(2, 'Pendiente'),
(3, 'Rechazado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuatrimestres`
--
ALTER TABLE `cuatrimestres`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Periodo` (`Periodo`),
  ADD KEY `Cuatrimestre` (`Cuatrimestre`),
  ADD KEY `Programa` (`Programa`);

--
-- Indices de la tabla `informes`
--
ALTER TABLE `informes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_valid` (`ID_valid`);

--
-- Indices de la tabla `iniciosesiones`
--
ALTER TABLE `iniciosesiones`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Rol` (`ID_Rol`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `programaseducativos`
--
ALTER TABLE `programaseducativos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `validaciones`
--
ALTER TABLE `validaciones`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuatrimestres`
--
ALTER TABLE `cuatrimestres`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informes`
--
ALTER TABLE `informes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iniciosesiones`
--
ALTER TABLE `iniciosesiones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `periodos`
--
ALTER TABLE `periodos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `programaseducativos`
--
ALTER TABLE `programaseducativos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `validaciones`
--
ALTER TABLE `validaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`Periodo`) REFERENCES `periodos` (`ID`),
  ADD CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`Cuatrimestre`) REFERENCES `cuatrimestres` (`ID`),
  ADD CONSTRAINT `cursos_ibfk_3` FOREIGN KEY (`Programa`) REFERENCES `programaseducativos` (`ID`);

--
-- Filtros para la tabla `informes`
--
ALTER TABLE `informes`
  ADD CONSTRAINT `informes_ibfk_1` FOREIGN KEY (`ID_valid`) REFERENCES `validaciones` (`ID`);

--
-- Filtros para la tabla `iniciosesiones`
--
ALTER TABLE `iniciosesiones`
  ADD CONSTRAINT `iniciosesiones_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `roles` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
