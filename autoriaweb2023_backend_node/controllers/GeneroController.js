const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsultaAtor(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as gêneros       //executarConsulta
router.get('/', (req, res) => {
  executarConsultaAtor('SELECT * FROM tbgenero', [], res, "Erro na consulta de tbgeneros");
});

// Rota para buscar uma tbgenero específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaAtor('SELECT * FROM tbgenero WHERE IdGenero = ?', [id], res, "Erro na consulta de tbgenero");
});

// Rota para criar uma nova tbgenero
router.post('/', (req, res) => {
  const {Nome_Genero} = req.body;
  executarConsultaAtor('INSERT INTO tbgenero (Nome_Genero) VALUES (?)', [Nome_Genero], res, "Erro no cadastro de tbgenero!");
});

// Rota para deletar uma tbgenero
router.delete("/:id", (req, res) => {
  const tbgeneroId = req.params.id;
  executarConsultaAtor('DELETE FROM tbgenero WHERE IdGenero = ?', [tbgeneroId], res, 'Erro ao deletar tbgenero');
});

// Rota para atualizar uma tbgenero
router.put('/', (req, res) => {
  const { id, Nome_Genero} = req.body;
  executarConsultaAtor('UPDATE tbgenero SET Nome_Genero = ?  WHERE IdGenero = ?', [Nome_Genero, id], res, "Erro ao atualizar tbgenero");
});

module.exports = router;