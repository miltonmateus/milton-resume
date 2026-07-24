import type { Certificate } from '../types/resume';
import { renderCertificateItem } from '../components/certificate-item';
import { renderSectionTitle } from '../components/section-title';

export function renderCertificates(certificates: Certificate[]): string {
  return `
    <section class="certificates content-section">
      ${renderSectionTitle({ icon: 'award', label: 'Certificados' })}

      <div class="certificates-grid">${certificates
        .map(renderCertificateItem)
        .join('')}</div>
    </section>
  `;
}
