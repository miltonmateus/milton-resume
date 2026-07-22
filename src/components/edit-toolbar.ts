import { renderIcon } from './icon';

export function renderEditToolbar(): string {
  return `
    <div class="edit-toolbar" hidden>
      <p><strong>Modo de edição:</strong> clique em qualquer texto para alterá-lo.</p>
      <label class="change-photo">
        ${renderIcon('image-up')}
        Trocar foto
        <input class="photo-input" type="file" accept="image/png,image/jpeg,image/webp" />
      </label>
      <button class="reset-resume" type="button">${renderIcon('rotate-ccw')}Restaurar edição</button>
      <button class="finish-editing" type="button">${renderIcon('check')}Concluir</button>
      <span class="save-status sr-only" role="status" aria-live="polite"></span>
    </div>
  `;
}
