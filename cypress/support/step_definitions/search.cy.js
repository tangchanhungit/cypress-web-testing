import { SearchPage } from "../../pageObjects/searchpage";
import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
import { checkCardContainsKeyword, handleIfResultsExist} from "../commands";

Given('I am on the TopDev search page', () => {
    SearchPage.navigate();
});

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
    SearchPage.clickSearchButton();
});

When('I load all available results by clicking "Xem thêm" until it disappears', () => {
  // Đợi có kết quả hoặc thông báo lỗi trước
  return cy.get('body').then(($body) => {
    if ($body.find('.no-result-message').length > 0) {
      return;
    }

    // Nếu có kết quả, kiểm tra nút "Xem thêm"
    const $buttons = $body.find('div.mx-auto button');
    const xemThemBtn = [...$buttons].find(btn => 
      btn.innerText.trim() === 'Xem thêm' && Cypress.$(btn).is(':visible')
    );

    if (xemThemBtn) {
      return SearchPage.loadAllResults();
    } else {
      return;
    }
  });
});

Then('the search result should be {string}', (expected) => {
  if (expected === 'validation error') {
    cy.get('body').then(($body) => {
      if ($body.find('.no-result-message').length > 0) {
        cy.get('.no-result-message')
          .should('be.visible')
          .and('contain', 'Không tìm thấy công việc phù hợp');
      } else {
        cy.get('.job-result').should('have.length', 0);
      } 
    });
  }
});

Then('I should see at least {int} result', (minCount) => {
  handleIfResultsExist( ()=>{
    SearchPage.jobCards.should('have.length.at.least', minCount);
  })
});



Then('Each result should contain {string}', (keyword) => {
  SearchPage.jobCards.then(($cards) => {
    Cypress._.each($cards, (card) => {
        checkCardContainsKeyword(card, keyword);  
    });
  });
});