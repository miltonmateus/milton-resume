export const maxProfileImageSizeInBytes = 2_000_000;

export const resumeAutosaveDelayInMs = 250;

export const editableElementsSelector = [
  '.profile h1',
  '.professional-title',
  '.contact a',
  '.contact li > span',
  '.skills li',
  '.languages strong',
  '.language-item div > span',
  '.summary p',
  '.experience h3',
  '.experience .role',
  '.experience .meta p',
  '.experience-item li',
  '.education-item h3',
  '.education-item p',
  '.certificate-item h3',
  '.certificate-item p',
  '.certificate-item a',
  '.highlight-item h3',
  '.highlight-item p',
].join(', ');

export const allowedProfileImageTypes = ['image/jpeg', 'image/png', 'image/webp'] as const;
