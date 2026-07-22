import type { PersonalInfo } from '../types/resume';

function formatLinkedin(linkedin: string): string {
  return linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function renderHeader(personal: PersonalInfo): string {
  return `
    <header class="profile">
      <div class="photo-ring"><img class="profile-image" src="${personal.profileImage}" alt="Foto de ${personal.fullName}" /></div>
      <h1>${personal.fullName}</h1>
      <p class="professional-title">${personal.professionalTitle}</p>
      <div class="title-rule"></div>
      <section class="contact sidebar-section">
        <h2><i class="section-icon" data-lucide="contact" aria-hidden="true"></i> Contato</h2>
        <ul>
          <li><i data-lucide="mail" aria-hidden="true"></i><a href="mailto:${personal.email}">${personal.email}</a></li>
          <li><i data-lucide="phone" aria-hidden="true"></i><a href="tel:${personal.phone}">${personal.phone}</a></li>
          <li><i data-lucide="map-pin" aria-hidden="true"></i><span>${personal.location}</span></li>
          <li><i data-lucide="link" aria-hidden="true"></i><a href="${personal.linkedin}" target="_blank" rel="noreferrer">${formatLinkedin(personal.linkedin)}</a></li>
        </ul>
      </section>
    </header>
  `;
}
