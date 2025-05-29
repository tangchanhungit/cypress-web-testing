beforeEach(() => {
  cy.clearCookies(); // Xoá cookies trước mỗi test case
});

require('cypress-xpath')

export function generateRandomPhone() {
  const prefix = '24';
  const randomNumber = Math.floor(Math.random() * 1_0000_0000)  // 8 chữ số
    .toString()
    .padStart(8, '0');
  return prefix + randomNumber;
}

Cypress.on('uncaught:exception', (err) => {
  // Ignore this specific React hydration error
  if (err.message.includes('Minified React error #418')) {
    return false; // prevents Cypress from failing the test
  }
  // Optionally ignore other React errors you might encounter
  if (err.message.includes('Minified React error')) {
    console.warn('React error caught by Cypress:', err.message);
    return false;
  }
  return true; // allow other errors to fail the test
});

export function checkCardContainsKeyword(card, keyword) {
  const $card = Cypress.$(card);

  if ($card.find('div[id^="div-gpt-ad"]').length > 0) {
    return; // bỏ qua quảng cáo
  }

  // Dò title (h3 trong line-clamp-1 hoặc 2)
  const $titleEl = $card.find('h3.line-clamp-1 a, h3.line-clamp-2 a');
  const title = $titleEl.length ? $titleEl.text().trim() : '';

  // Dò company (div.mt-1.line-clamp-1 a)
  const $companyEl = $card.find('div.mt-1.line-clamp-1 a');
  const company = $companyEl.length ? $companyEl.text().trim() : '';

  // Dò skills
  const $skillEls = $card.find('span.whitespace-nowrap');
  const skills = $skillEls.length
    ? [...$skillEls].map(el => el.textContent.trim()).join(' ')
    : '';

  // Normalize và so sánh
  const normalize = (text) => (text || '').trim().toLowerCase();
  const keywordLower = normalize(keyword);
  const titleLower = normalize(title);
  const skillsLower = normalize(skills);
  const companyLower = normalize(company);

  const isTitleMatch = titleLower.includes(keywordLower);
  const isSkillsMatch = skillsLower.includes(keywordLower);
  const isCompanyMatch = companyLower.includes(keywordLower);

  expect(
    isTitleMatch || isSkillsMatch || isCompanyMatch,
    `Expected title, skills, or company to contain "${keyword}", but none matched.\nTitle: "${title}"\nSkills: "${skills}"\nCompany: "${company}"`
  ).to.be.true;
}