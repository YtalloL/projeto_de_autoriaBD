import EstudioView from "../view/EstudioView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de Estudio.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */ //renderizarEstudioFormulario
function renderizarEstudioFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = EstudioView.renderizarFormularioEstudio();
  document.getElementById("formulario_Estudio").addEventListener("submit", cadastrarEstudio);
}
//descricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricao
/**
 * Cadastra uma nova Estudio.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarEstudio(event) {
  event.preventDefault();
  const EstudioValor = document.getElementById("Estudio_Nome_Estudio_formulario").value;
  const novoEstudio = { Nome_Estudio: EstudioValor};
 //estudio
  try {
    await fetch(`${API_BASE_URL}/estudio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoEstudio),
    }); //renderizarListaEstudio
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaEstudio(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar Estudio:", error);
  }
}
/**
 * Renderiza a lista de estudio.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaEstudio(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/estudio");
    const estudioBD = await response.json(); 

    const estudio = estudioBD.map((row) => {
      return {
        id: row.IdEstudio,
        Nome_Estudio: row.Nome_Estudio,
      };
    });
    componentePrincipal.innerHTML = EstudioView.renderizarTabelaEstudio(estudio);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar estudio:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de Estudio.
 * Cada botão, quando clicado, aciona a função de exclusão de Estudio correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const EstudioId = this.getAttribute("estudio-id");
      excluirEstudio(EstudioId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de Estudio.
 * Cada botão, quando clicado, aciona a função de buscar a Estudio específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const EstudioId = this.getAttribute("estudio-atualizar-id");
      buscarEstudio(EstudioId);
    });
  });
}

/**
 * Exclui uma Estudio específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de estudio é atualizada.
 * @param {string} id - ID da Estudio a ser excluída.
 */
async function excluirEstudio(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/estudio/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir a Estudio");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaEstudio(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir a Estudio:", error);
  }
}

/**
 * Busca uma Estudio específica para atualização, com base no ID.
 * Após encontrar a Estudio, renderiza o formulário de atualização.
 * @param {string} id - ID da Estudio a ser buscada.
 */
async function buscarEstudio(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/estudio/${id}`);
    const estudioBD = await response.json();
    if (estudioBD.length <= 0) return;

    const Estudio = estudioBD.map(row => ({
      id: row.IdEstudio,
      Nome_Estudio: row.Nome_Estudio,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = EstudioView.renderizarFormularioEstudioAtualizar(Estudio);
    document.getElementById("formulario_Estudio_atualizar").addEventListener("submit", atualizarEstudio);
  } catch (error) {
    console.error("Erro ao buscar estudio:", error);
  }
}

/**
 * Atualiza uma Estudio específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarEstudio(event) {
  event.preventDefault();

  const idValor = document.getElementById("Estudio_id_formulario").value;
  const EstudioValor = document.getElementById("Estudio_Nome_Estudio_formulario").value;
  const Estudio = {id: idValor, Nome_Estudio: EstudioValor};

  try {
    const response = await fetch(`${API_BASE_URL}/estudio`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(Estudio),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar a Estudio");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaEstudio(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar Estudio:", error);
  }
}

const EstudioController = {
  renderizarEstudioFormulario,
  cadastrarEstudio,
  renderizarListaEstudio,
  excluirEstudio,
};

export default EstudioController;
