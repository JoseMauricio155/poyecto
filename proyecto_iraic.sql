-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2020 a las 09:40:57
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_iraic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto` varchar(40) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `cant_total` int(11) NOT NULL,
  `cant_actual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto`, `nombre`, `cant_total`, `cant_actual`) VALUES
('1', 'Grabadora', 23710, 15),
('2', 'Gansito', 720, 1),
('25', 'Papas', 271, 2),
('5', 'Lechuga', 10333, 9320),
('80', 'gansito', 5033, 2443);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operacion`
--

CREATE TABLE `operacion` (
  `id_operacion` int(11) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_producto` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `operacion`
--

INSERT INTO `operacion` (`id_operacion`, `tipo`, `fecha`, `cantidad`, `id_producto`) VALUES
(8, '5', '2020-11-30 06:16:04', 25, '57'),
(9, 'Producto entrante', '2020-11-30 06:28:02', 0, '1'),
(10, 'Producto Saliente', '2020-11-30 06:28:25', 0, '2'),
(11, 'Producto entrante', '2020-11-30 06:31:34', 0, '2'),
(12, 'Producto entrante', '2020-11-30 06:32:07', 0, '2'),
(13, 'Producto entrante', '2020-11-30 06:34:04', 0, '2'),
(14, 'Producto entrante', '2020-11-30 06:34:33', 0, '1'),
(15, 'Producto entrante', '2020-11-30 06:35:04', 0, '1'),
(16, 'Producto entrante', '2020-11-30 06:35:11', 0, '1'),
(17, 'Producto Saliente', '2020-11-30 06:35:59', 0, '1'),
(18, 'Producto Saliente', '2020-11-30 06:38:07', 0, '1'),
(19, 'Producto entrante', '2020-11-30 07:37:14', 0, '1'),
(20, 'Producto entrante', '2020-11-30 07:47:21', 0, '25'),
(21, 'Producto Saliente', '2020-11-30 07:48:47', 0, '25'),
(22, 'Producto entrante', '2020-11-30 07:53:14', 0, '2'),
(23, 'Producto entrante', '2020-11-30 07:53:28', 0, '2'),
(24, 'Producto entrante', '2020-11-30 07:53:40', 0, '2'),
(25, 'Producto entrante', '2020-11-30 07:53:47', 0, '2'),
(26, 'Producto entrante', '2020-11-30 07:54:26', 0, '2'),
(27, 'Producto entrante', '2020-11-30 07:55:10', 0, '25'),
(28, 'Producto Saliente', '2020-11-30 07:55:18', 0, '25'),
(29, 'Producto Saliente', '2020-11-30 07:55:33', 0, '25'),
(30, 'Producto entrante', '2020-11-30 07:56:09', 0, '2'),
(31, 'Producto entrante', '2020-11-30 07:57:48', 0, '2'),
(32, 'Producto entrante', '2020-11-30 07:59:14', 0, '2'),
(33, 'Producto entrante', '2020-11-30 07:59:36', 0, '1'),
(34, 'Producto Saliente', '2020-11-30 08:01:19', 0, '1'),
(35, 'Producto entrante', '2020-11-30 08:01:25', 0, '1'),
(36, 'Producto Saliente', '2020-11-30 08:01:36', 0, '1'),
(37, 'Producto entrante', '2020-11-30 08:05:53', 0, '1'),
(38, 'Producto entrante', '2020-11-30 08:06:25', 0, '1'),
(39, 'Producto entrante', '2020-11-30 08:43:58', 0, '1'),
(40, 'Producto entrante', '2020-11-30 08:44:04', 0, '1'),
(41, 'Producto entrante', '2020-11-30 08:44:12', 0, '1'),
(42, 'Producto Saliente', '2020-11-30 08:44:23', 0, '1'),
(43, 'Producto entrante', '2020-11-30 08:44:32', 0, '1'),
(44, 'Producto entrante', '2020-11-30 08:47:33', 0, '1'),
(45, 'Producto entrante', '2020-11-30 08:47:52', 0, '1'),
(46, 'Producto entrante', '2020-11-30 08:48:46', 0, '1'),
(47, 'Producto entrante', '2020-11-30 08:48:58', 0, '1'),
(48, 'Producto entrante', '2020-11-30 08:49:42', 0, '1'),
(49, 'Producto entrante', '2020-11-30 08:49:50', 0, '1'),
(50, 'Producto entrante', '2020-11-30 08:50:01', 0, '1'),
(51, 'Producto entrante', '2020-11-30 08:50:14', 0, '1'),
(52, 'Producto entrante', '2020-11-30 08:50:28', 0, '1'),
(53, 'Producto entrante', '2020-11-30 08:50:32', 0, '1'),
(54, 'Producto entrante', '2020-11-30 08:50:50', 0, '2'),
(55, 'Producto entrante', '2020-11-30 08:51:03', 0, '25'),
(56, 'Producto entrante', '2020-11-30 08:51:17', 0, '2'),
(57, 'Producto entrante', '2020-11-30 08:53:07', 0, '2'),
(58, 'Producto Saliente', '2020-11-30 08:53:21', 0, '5'),
(59, 'Producto Entrante', '2020-11-30 08:55:26', 0, '5'),
(60, 'Producto Saliente', '2020-11-30 08:59:05', 5, '5'),
(61, 'Producto Entrante', '2020-11-30 08:59:44', 1, '1'),
(62, 'Producto Entrante', '2020-11-30 09:03:23', 1, '1'),
(63, 'Producto Entrante', '2020-11-30 09:07:46', 1, '1'),
(64, 'Producto Entrante', '2020-11-30 09:07:52', 1, '1'),
(65, 'Producto Entrante', '2020-11-30 09:09:26', 1, '1'),
(66, 'Producto Entrante', '2020-11-30 09:09:30', 1, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(20) NOT NULL,
  `pass` varchar(64) NOT NULL,
  `tipo` char(1) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `pass`, `tipo`, `nombre`) VALUES
('admin', '123', 'A', 'Administrador'),
('Angel', '123', 'U', 'Angel'),
('Anto', '123', 'A', 'Antonio'),
('jesus', '123', '', '123'),
('Jose', '123', 'U', 'Jose'),
('Mario', '123', '', 'Mario'),
('Mauricio', '123', 'A', 'Mauricio'),
('yo', '123', '', 'jose');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `operacion`
--
ALTER TABLE `operacion`
  ADD PRIMARY KEY (`id_operacion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `operacion`
--
ALTER TABLE `operacion`
  MODIFY `id_operacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
