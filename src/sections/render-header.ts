import type { PersonalInfo } from '../types/resume';
import { renderContactItem } from '../components/contact-item';
import { renderSectionTitle } from '../components/section-title';
import { escapeAttribute, escapeHtml, escapeUrl, renderTrustedHtml } from '../utils/html';

function formatLinkedin(linkedin: string): string {
  return linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function formatGithub(github: string): string {
  return github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function renderHeader(personal: PersonalInfo): string {
  return `
    <header class="profile">
      <div class="photo-ring"><img class="profile-image" src="${escapeUrl(personal.profileImage)}" alt="Foto de ${escapeAttribute(personal.fullName)}" /></div>
      <h1>${escapeHtml(personal.fullName)}</h1>
      <p class="professional-title">${renderTrustedHtml(personal.professionalTitle)}</p>
      <div class="title-rule"></div>
      <section class="contact sidebar-section">
        ${renderSectionTitle({ icon: 'contact', label: ' Contato' })}
        <ul>
          ${renderContactItem({ icon: 'mail', text: personal.email, href: `mailto:${personal.email}` })}
          ${renderContactItem({ icon: 'phone', text: personal.phone, href: `tel:${personal.phone}` })}
          ${renderContactItem({ icon: 'map-pin', text: personal.location })}
          ${renderContactItem({ icon: 'link', text: formatLinkedin(personal.linkedin), href: personal.linkedin })}
          ${renderContactItem({ icon: 'code-xml', text: formatGithub(personal.github), href: personal.github })}
        </ul>
      </section>
    </header>
  `;
}
