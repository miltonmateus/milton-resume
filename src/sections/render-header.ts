import type { PersonalInfo } from '../types/resume';

export function renderHeader(personal: PersonalInfo): string {
  return `
    <header>
      <img src="${personal.profileImage}" alt="Foto de ${personal.fullName}" />
      <h1>${personal.fullName}</h1>
      <p class="professional-title">${personal.professionalTitle}</p>
      <p>
        <a href="mailto:${personal.email}">${personal.email}</a></br>
        <a href="tel:${personal.phone}">${personal.phone}</a></br>
        <a href="${personal.linkedin}" target="_blank">LinkedIn</a></br>
      </p>
      <p>${personal.location}</p>
    </header>
  `;
}