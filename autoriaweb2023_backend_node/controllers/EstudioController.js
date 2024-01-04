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
  executarConsultaAtor('SELECT * FROM tbestudio', [], res, "Erro na consulta de tbestudios");
});

// Rota para buscar uma tbestudio específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsultaAtor('SELECT * FROM tbestudio WHERE IdEstudio = ?', [id], res, "Erro na consulta de tbestudio");
});

// Rota para criar uma nova tbestudio
router.post('/', (req, res) => {
  const {Nome_Estudio} = req.body;
  executarConsultaAtor('INSERT INTO tbestudio (Nome_Estudio) VALUES (?)', [Nome_Estudio], res, "Erro no cadastro de tbestudio!");
});

// Rota para deletar uma tbestudio
router.delete("/:id", (req, res) => {
  const tbestudioId = req.params.id;
  executarConsultaAtor('DELETE FROM tbestudio WHERE IdEstudio = ?', [tbestudioId], res, 'Erro ao deletar tbestudio');
});

// Rota para atualizar uma tbestudio
router.put('/', (req, res) => {
  const { id, Nome_Estudio} = req.body;
  executarConsultaAtor('UPDATE tbestudio SET Nome_Estudio = ? WHERE IdEstudio = ?', [Nome_Estudio, id], res, "Erro ao atualizar tbestudio");
});

module.exports = router;