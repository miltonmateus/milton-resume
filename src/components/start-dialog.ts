export function renderStartDialog(): string {
  return `
    <dialog class="start-dialog" aria-labelledby="start-dialog-title">
      <form method="dialog">
        <button class="close-start-dialog" value="cancel" aria-label="Fechar">&times;</button>
        <h2 id="start-dialog-title">Como deseja começar?</h2>
        <p>Seu currículo original continuará sendo a primeira tela exibida no site.</p>
        <div class="start-options">
          <button class="start-blank" value="blank" type="button">
            <strong>Começar em branco</strong>
            <span>Use campos genéricos para preencher seus próprios dados.</span>
          </button>
          <button class="start-example" value="example" type="button">
            <strong>Usar como exemplo</strong>
            <span>Edite o currículo de Milton como ponto de partida.</span>
          </button>
        </div>
      </form>
    </dialog>
  `;
}
