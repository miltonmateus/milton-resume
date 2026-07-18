import type { PersonalInfo } from '../types/resume';

export function renderHeader(personal: PersonalInfo): string {
  return `
    <header class="profile">
      <div class="photo-ring"><img class="profile-image" src="${personal.profileImage}" alt="Foto de ${personal.fullName}" /></div>
      <h1>${personal.fullName}</h1>
      <p class="professional-title">${personal.professionalTitle}</p>
      <div class="title-rule"></div>
      <section class="contact sidebar-section">
        <h2><span class="section-icon">◎</span> Contato</h2>
        <ul>
          <li><span aria-hidden="true">✉</span><a href="mailto:${personal.email}">${personal.email}</a></li>
          <li><span aria-hidden="true">☎</span><a href="tel:${personal.phone}">${personal.phone}</a></li>
          <li><span aria-hidden="true">●</span><span>${personal.location}</span></li>
          <li><span aria-hidden="true">in</span><a href="${personal.linkedin}" target="_blank" rel="noreferrer">linkedin.com/in/milton-teixeira</a></li>
        </ul>
      </section>
    </header>
  `;
}
