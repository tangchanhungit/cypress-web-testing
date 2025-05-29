import { SearchPage } from "../../pageObjects/searchpage";
import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
import { checkCardContainsKeyword } from "../commands";

Given('I am on the TopDev search page', () => {
    SearchPage.navigate();
    cy.wait(1000);
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
    SearchPage.jobCards.should('have.length.at.least', minCount);
});

Then('each result should contain {string}', (keyword) => {
  // Kiểm tra các job cards thường (nếu có)
  SearchPage.jobCards.then(($cards) => {
    if ($cards.length > 0) {
      cy.wrap($cards).each(($card) => {
        checkCardContainsKeyword($card, keyword);
      });
    }
  });

  // Kiểm tra các free job cards (nếu có)
  SearchPage.freeJob.then(($freeJobContainers) => {
    if ($freeJobContainers.length > 0) {
      cy.wrap($freeJobContainers).each(($li) => {
        const $jobs = Cypress.$($li).find('a[class*="w-1/2"]');
        if ($jobs.length > 0) {
          $jobs.each((index, jobEl) => {
            const $job = Cypress.$(jobEl);
            checkCardContainsKeyword($job, keyword);
          });
        }
      });
    }
  });
});
