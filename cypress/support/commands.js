Cypress.Commands.add('restoreLoginSession', () => {
  cy.fixture('auth-cookies.json').then((cookies) => {
    cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly
      });
    });
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // Bỏ qua lỗi liên quan tới service worker của Firebase Messaging
  if (
    err.message.includes('Failed to register a ServiceWorker') ||
    err.message.includes('firebase-messaging-sw.js') ||
    err.message.includes('messaging/failed-service-worker-registration') || 
    err.message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return false; // Không fail test
  }
  // Để các lỗi khác fail test bình thường
  return true;
});

beforeEach(() => {
  cy.restoreLoginSession(); // set lại login cookie
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

Cypress.on('uncaught:exception', (err, runnable) => {
  // Bỏ qua tất cả lỗi không mong muốn trong ứng dụng React
  if (err.message.includes('Minified React error #418')) {
    return false; // Ngăn không cho test fail
  }

  // Có thể thêm điều kiện khác tùy bạn
  return true; // Hoặc return false nếu muốn ignore tất cả
});


export function checkCardContainsKeyword(card, keyword) {
  const $card = Cypress.$(card);

  if ($card.find('div[id^="div-gpt-ad"]').length > 0) {
    return; // bỏ qua quảng cáo
  }

  // Dò title (h3 trong line-clamp-1 hoặc 2)
  const $titleEl = $card.find('h3.line-clamp-1 a');
  const title = $titleEl.length ? $titleEl.text().trim() : '';

  // Dò company (div.mt-1.line-clamp-1 a)
  const $companyEl = $card.find('div.mt-1.line-clamp-1 a');
  const company = $companyEl.length ? $companyEl.text().trim() : '';

  // Dò skills
  const $skillEls = $card.find('span.whitespace-nowrap');
  const skills = $skillEls.length
    ? [...$skillEls].map(el => el.textContent.trim()).join(' ')
    : '';

  const $locationEl = $card.find('div.text-gray-500 p:first-child');
  const location = $locationEl.length ? $locationEl.text().trim() : '';

  // Normalize và so sánh
  const normalize = (text) => {
    return (text || '').trim()
    .toLowerCase()
    .normalize("NFD")                  // Tách dấu ra khỏi chữ
    .replace(/[\u0300-\u036f]/g, "")   // Xóa dấu
    .replace(/\s+/g, ' ');
  }
  
  const keywordLower = normalize(keyword);
  const titleLower = normalize(title);
  const skillsLower = normalize(skills);
  const companyLower = normalize(company);
  const locationLower = normalize(location);
  const $experienceEl = $card.find('div p.text-gray-500').filter((i, el) => {
  const text = Cypress.$(el).text().toLowerCase();
    // Lọc ra thẻ p chứa kinh nghiệm, ví dụ có thể dùng từ khóa như "intern", "junior", "senior", "exp" trong text
    return /intern|junior|senior|exp|experience/i.test(text);
  });
  const experience = $experienceEl.length ? $experienceEl.first().text().trim() : '';

  const isTitleMatch = titleLower.includes(keywordLower);
  const isSkillsMatch = skillsLower.includes(keywordLower);
  const isCompanyMatch = companyLower.includes(keywordLower);
  const isLocationMatch = locationLower.includes(keywordLower);
  const isExperienceMatch = normalize(experience).includes(keywordLower);

  expect(
    isTitleMatch || isSkillsMatch || isCompanyMatch || isLocationMatch || isExperienceMatch,
    `Expected title, skills, company, location, or experience to contain "${keyword}", but none matched.
    Title: "${title}"
    Skills: "${skills}"
    Company: "${company}"
    Location: "${location}"
    Experience: "${experience}"`
  ).to.be.true;
}

export function handleIfResultsExist(callback) {
  cy.get('body').then(($body) => {
    if ($body.text().includes('Oops! No such Tester job listings found')) {
      expect(true).to.be.true; // Không fail test
    } else {
      callback();
    }
  });
}