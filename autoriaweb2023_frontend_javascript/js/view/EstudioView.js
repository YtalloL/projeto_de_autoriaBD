/**
 * Renderiza o formulário para criar uma nova Estudio.
 * @return {string} HTML do formulário de criação de Estudio.
 */ 
//renderizarFormulario
// título para Nome_Estudio
function renderizarFormularioEstudio() {
    return `
            <form class="mt-3" id="formulario_Estudio">
                <div class="form-group">
                    <label for="Estudio_Nome_Estudio">Título do Estudio:</label>
                    <input type="text" class="form-control" id="Estudio_Nome_Estudio_formulario"> 
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma Estudio existente.
   * @param {Object} Estudio - A Estudio a ser atualizado.
   * @return {string} HTML do formulário de atualização de Estudio.
   */
  function renderizarFormularioEstudioAtualizar(Estudio) {
      return `
              <form class="mt-3" id="formulario_Estudio_atualizar">
                  <input type="hidden" class="form-control" id="Estudio_id_formulario" value="${Estudio.id}">
                  <div class="form-group">
                      <label for="Estudio_Nome_Estudio">Título do Estudio:</label>
                      <input type="text" class="form-control" id="Estudio_Nome_Estudio_formulario" value="${Estudio.Nome_Estudio}">
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de Estudio.
   * @param {Array} Estudio - Lista de Estudio a serem exibidos.
   * @return {string} HTML do tabela de Estudio.
   */
  //renderizarTabela
  function renderizarTabelaEstudio(Estudios) {
    let tabela = `
            <table class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Título do Estudio</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    Estudios.forEach((Estudio) => {
      tabela += `
                <tr>
                    <td>${Estudio.Nome_Estudio}</td>
                    <td>
                      <button class="excluir-btn" estudio-id=${Estudio.id}>Excluir</button>
                      <button class="atualizar-btn" estudio-atualizar-id=${Estudio.id}>Atualizar</button>
                    </td>
                </tr>
            `;
    });
  
    tabela += `
                </tbody>
            </table>
        `;
  
    return tabela;
  }
  
  const EstudioView = {
      renderizarFormularioEstudio,
      renderizarTabelaEstudio,
      renderizarFormularioEstudioAtualizar
  };
  
  export default EstudioView;
  