import { renderIcon } from './icon';

export function renderResumeActions(): string {
  return `
    <div class="resume-actions" aria-label="Opções do currículo">
      <button class="back-to-original" type="button" hidden>
        ${renderIcon('user-round-arrow-left')}
        Voltar ao meu currículo
      </button>
      <button class="customize-resume" type="button">
        ${renderIcon('pencil')}
        Crie seu currículo
      </button>
      <label class="layout-picker">
        ${renderIcon('panels-top-left')}
        <span class="layout-picker-label">Estilo</span>
        <select class="layout-select" aria-label="Escolher estilo do currículo">
          <option value="creative">Criativo</option>
          <option value="executive">Executivo</option>
          <option value="dark">Escuro</option>
        </select>
      </label>
      <button class="download-pdf" type="button" aria-label="Baixar currículo em PDF">
        ${renderIcon('download')}
        Baixar PDF
      </button>
    </div>
  `;
}
