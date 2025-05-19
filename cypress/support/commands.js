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