import type { Resume } from '../types/resume';
import { renderHeader } from '../sections/render-header';
import { renderSummary } from '../sections/render-summary';
import { renderExperience } from '../sections/render-experience';
import { renderSkills } from '../sections/render-skills';
import { renderEducation } from '../sections/render-education';
import { renderLanguages } from '../sections/render-languages';
import { renderHighlights } from '../sections/render-highlights';

export function renderResume(resume: Resume): string {
  return `
    <div class="resume-actions" aria-label="Opções do currículo">
      <button class="customize-resume" type="button">
        <i data-lucide="pencil" aria-hidden="true"></i>
        Crie seu currículo
      </button>
      <label class="layout-picker">
        <i data-lucide="panels-top-left" aria-hidden="true"></i>
        <span class="layout-picker-label">Estilo</span>
        <select class="layout-select" aria-label="Escolher estilo do currículo">
          <option value="creative">Criativo</option>
          <option value="executive">Executivo</option>
          <option value="dark">Escuro</option>
        </select>
      </label>
      <button class="download-pdf" type="button" aria-label="Baixar currículo em PDF">
        <i data-lucide="download" aria-hidden="true"></i>
        Baixar PDF
      </button>
    </div>
    <div class="edit-toolbar" hidden>
      <p><strong>Modo de edição:</strong> clique em qualquer texto para alterá-lo.</p>
      <label class="change-photo">
        <i data-lucide="image-up" aria-hidden="true"></i>
        Trocar foto
        <input class="photo-input" type="file" accept="image/png,image/jpeg,image/webp" />
      </label>
      <button class="reset-resume" type="button"><i data-lucide="rotate-ccw" aria-hidden="true"></i>Restaurar</button>
      <button class="finish-editing" type="button"><i data-lucide="check" aria-hidden="true"></i>Concluir</button>
    </div>
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
    <main class="resume">
      ${renderResumeContent(resume)}
    </main>
  `;
}

export function renderResumeContent(resume: Resume): string {
  return `
      <aside class="sidebar">
        ${renderHeader(resume.personal)}
        ${renderSkills(resume.skills)}
        ${renderLanguages(resume.languages)}
      </aside>
      <div class="content">
        ${renderSummary(resume.summary)}
        ${renderExperience(resume.experience)}
        ${renderEducation(resume.education)}
      </div>
      ${renderHighlights(resume.highlights)}
  `;
}
