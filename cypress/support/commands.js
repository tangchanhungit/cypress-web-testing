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
