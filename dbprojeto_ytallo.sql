-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Jan-2024 às 00:47
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbprojeto_ytallo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbclientejogo`
--

CREATE TABLE `tbclientejogo` (
  `IdClienteJogo` int(11) NOT NULL,
  `IdJogo` int(11) NOT NULL,
  `IdLocacao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbclientes`
--

CREATE TABLE `tbclientes` (
  `IdCliente` int(11) NOT NULL,
  `Nome_Cliente` varchar(100) NOT NULL,
  `CPF_cliente` varchar(15) NOT NULL,
  `Endereco` varchar(100) NOT NULL,
  `Numero_Telefone` varchar(20) NOT NULL,
  `Senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcompra`
--

CREATE TABLE `tbcompra` (
  `IdLocacao` int(11) NOT NULL,
  `Data_compra` datetime NOT NULL,
  `Valor` decimal(7,2) NOT NULL,
  `IdCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbestudio`
--

CREATE TABLE `tbestudio` (
  `IdEstudio` int(11) NOT NULL,
  `Nome_Estudio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbgenero`
--

CREATE TABLE `tbgenero` (
  `IdGenero` int(11) NOT NULL,
  `Nome_Genero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbclientejogo`
--
ALTER TABLE `tbclientejogo`
  ADD PRIMARY KEY (`IdClienteJogo`),
  ADD KEY `TbClienteJogo_fk0` (`IdJogo`),
  ADD KEY `TbClienteJogo_fk1` (`IdLocacao`);

--
-- Índices para tabela `tbclientes`
--
ALTER TABLE `tbclientes`
  ADD PRIMARY KEY (`IdCliente`);

--
-- Índices para tabela `tbcompra`
--
ALTER TABLE `tbcompra`
  ADD PRIMARY KEY (`IdLocacao`),
  ADD KEY `TbCompra_fk0` (`IdCliente`);

--
-- Índices para tabela `tbestudio`
--
ALTER TABLE `tbestudio`
  ADD PRIMARY KEY (`IdEstudio`);

--
-- Índices para tabela `tbgenero`
--
ALTER TABLE `tbgenero`
  ADD PRIMARY KEY (`IdGenero`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbclientejogo`
--
ALTER TABLE `tbclientejogo`
  MODIFY `IdClienteJogo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbestudio`
--
ALTER TABLE `tbestudio`
  MODIFY `IdEstudio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tbgenero`
--
ALTER TABLE `tbgenero`
  MODIFY `IdGenero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tbclientejogo`
--
ALTER TABLE `tbclientejogo`
  ADD CONSTRAINT `TbClienteJogo_fk0` FOREIGN KEY (`IdJogo`) REFERENCES `tbjogos` (`IdJogo`),
  ADD CONSTRAINT `TbClienteJogo_fk1` FOREIGN KEY (`IdLocacao`) REFERENCES `tbcompra` (`IdLocacao`);

--
-- Limitadores para a tabela `tbcompra`
--
ALTER TABLE `tbcompra`
  ADD CONSTRAINT `TbCompra_fk0` FOREIGN KEY (`IdCliente`) REFERENCES `tbclientes` (`IdCliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
