import { SearchPage } from "../../pageObjects/searchpage";
import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the TopDev search page', () => {
    SearchPage.navigate()
})


When('I enter {string} in search bar', (keyword) => {
  if (keyword.trim() === '') {
    SearchPage.searchInput
      .should('be.visible')
      .and('not.be.disabled')
      .clear();
  } else {
    SearchPage.enterKeyword(keyword);
  }
});

When('I press the search button', () => {
    SearchPage.searchButton;
});

When('I load all available results by clicking "Xem thêm" until it disappears', () => {
    return SearchPage.loadAllResults();
});

Then('I should see at least {int} results', (minCount) => {
    SearchPage.jobCards.should('have.length.at.least', minCount);
});

Then('each result should contain {string}', (keyword) => {
  const keywordLower = keyword.toLowerCase();

  SearchPage.jobCards.each(($card) => {
    cy.wrap($card).within(() => {
      // Check job title
      const titleText = $card.find('h3.line-clamp-1').text().toLowerCase();
      
      // Check skill tags using Page Object method
      SearchPage.skillTags.then(($skills) => {
        const skillTagsText = $skills.text().toLowerCase();
        
        expect(
          titleText.includes(keywordLower) || 
          skillTagsText.includes(keywordLower),
          `Expected job card to contain "${keyword}" in title or skills`
        ).to.be.true;
      });
    });
  });
});

Then('I should see {string}', (expected) => {
    if(expected === 'all jobs or validation error') {
        // Kiểm tra hoặc là hiển thị tất cả jobs, hoặc hiển thị thông báo lỗi
        cy.get('.job-list, .error-message').should('exist');
    } else {
        cy.contains(expected).should('be.visible');
    }
});