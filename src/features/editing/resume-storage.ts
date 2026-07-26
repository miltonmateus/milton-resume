import { renderCertificateItem } from '../../components/certificate-item';
import { renderExperienceItem } from '../../components/experience-item';
import { renderContactItem } from '../../components/contact-item';
import { efSetCertificate } from '../../constants/certificates';
import { mondoCaneExperience } from '../../constants/experience';
import { renderCertificates } from '../../sections/render-certificates';
import { selectors } from '../../constants/selectors';
import { storageKeys } from '../../constants/storage';
import { allowedProfileImageTypes } from '../../constants/editing';

const githubUrl = 'https://github.com/miltonmateus';
const unsafePersistedElementsSelector = 'script, style, iframe, object, embed, link, meta';
const urlAttributes = new Set(['href', 'src']);

function isSafePersistedUrl(value: string): boolean {
  try {
    const url = new URL(value, window.location.origin);
    const isAllowedDataImage = allowedProfileImageTypes.some((type) => value.startsWith(`data:${type};`));

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:' ||
      url.protocol === 'mailto:' ||
      url.protocol === 'tel:' ||
      (url.protocol === 'data:' && isAllowedDataImage)
    );
  } catch {
    return false;
  }
}

function sanitizePersistedMarkup(resumeElement: HTMLElement): void {
  resumeElement.querySelectorAll(unsafePersistedElementsSelector).forEach((element) => element.remove());

  resumeElement.querySelectorAll<HTMLElement>('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase();

      if (attributeName.startsWith('on')) {
        element.removeAttribute(attribute.name);
        return;
      }

      if (urlAttributes.has(attributeName) && !isSafePersistedUrl(attribute.value)) {
        element.removeAttribute(attribute.name);
      }
    });
  });
}

function ensureGithubContact(resumeElement: HTMLElement): void {
  const contactList = resumeElement.querySelector('.contact ul');
  if (!contactList || contactList.querySelector(`a[href="${githubUrl}"]`)) return;

  contactList.insertAdjacentHTML('beforeend', renderContactItem({
    icon: 'code-xml',
    text: 'github.com/miltonmateus',
    href: githubUrl,
  }));
}

function ensureMondoCaneExperience(resumeElement: HTMLElement): void {
  if (resumeElement.textContent?.includes(mondoCaneExperience.company)) return;

  const timeline = resumeElement.querySelector('.experience .timeline');
  const firstExperience = timeline?.querySelector('.experience-item');
  firstExperience?.insertAdjacentHTML('afterend', renderExperienceItem(mondoCaneExperience));
}

function ensureCertificatesSection(resumeElement: HTMLElement): void {
  const certificatesSection = resumeElement.querySelector('.certificates');

  if (!certificatesSection) {
    const educationSection = resumeElement.querySelector('.education');
    educationSection?.insertAdjacentHTML('afterend', renderCertificates([efSetCertificate]));
    return;
  }

  if (certificatesSection.querySelector(`a[href="${efSetCertificate.credentialUrl}"]`)) return;

  const certificatesGrid = certificatesSection.querySelector('.certificates-grid');
  certificatesGrid?.insertAdjacentHTML('beforeend', renderCertificateItem(efSetCertificate));
}

export function restoreCustomizedResume(resumeElement: HTMLElement): void {
  const savedResumeMarkup = localStorage.getItem(storageKeys.customizedResumeMarkup);
  if (!savedResumeMarkup) return;

  resumeElement.innerHTML = savedResumeMarkup;
  ensureGithubContact(resumeElement);
  ensureMondoCaneExperience(resumeElement);
  ensureCertificatesSection(resumeElement);
  resumeElement.querySelectorAll<HTMLElement>('[contenteditable]').forEach((element) => {
    element.removeAttribute('contenteditable');
    element.spellcheck = false;
  });
}

export function saveCustomizedResume(resumeElement: HTMLElement): void {
  const cleanResume = resumeElement.cloneNode(true) as HTMLElement;

  cleanResume.querySelectorAll(selectors.editOnly).forEach((element) => element.remove());
  sanitizePersistedMarkup(cleanResume);
  cleanResume.querySelectorAll<HTMLElement>('[contenteditable]').forEach((element) => {
    element.removeAttribute('contenteditable');
    element.removeAttribute('spellcheck');
  });

  localStorage.setItem(storageKeys.customizedResumeMarkup, cleanResume.innerHTML);
}

export function clearCustomizedResume(): void {
  localStorage.removeItem(storageKeys.customizedResumeMarkup);
}

export function hasCustomizedResume(): boolean {
  return localStorage.getItem(storageKeys.customizedResumeMarkup) !== null;
}
