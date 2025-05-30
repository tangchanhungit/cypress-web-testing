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

// Then('I should see at least {int} result', (minCount) => {
//     SearchPage.jobCards.should('have.length.at.least', minCount);
// });


Then('Each result should contain {string}', (keyword) => {
  // Kiểm tra nếu danh sách kết quả tồn tại
  SearchPage.jobList.then(($list) => {
    if ($list.length === 0) {
      cy.log('Không có phần danh sách job nào hiển thị trên trang.');
      return;
    }

    // Nếu có danh sách job, tiếp tục kiểm tra các job card
    SearchPage.jobCards.then(($cards) => {
      const count = $cards.length;

      if (count === 0) {
        cy.log('Không có kết quả job nào để kiểm tra.');
        // Optional: kiểm tra có thông báo "Không tìm thấy kết quả"
        cy.contains('Không tìm thấy kết quả').should('exist');
      } else {
        cy.log(`Tìm thấy ${count} job, kiểm tra từng job có chứa từ khóa "${keyword}"...`);
        cy.wrap($cards).each(($card) => {
          cy.wrap($card)
            .invoke('text')
            .then((text) => {
              expect(text.toLowerCase()).to.include(keyword.toLowerCase());
            });
        });
      }
    });
  });
  
  // Kiểm tra các free job cards (nếu có)
  // SearchPage.freeJob.then(($freeJobContainers) => {
  //   if ($freeJobContainers.length > 0) {
  //     cy.wrap($freeJobContainers).each(($li) => {
  //       const $jobs = Cypress.$($li).find('a[class*="w-1/2"]');
  //       if ($jobs.length > 0) {
  //         $jobs.each((index, jobEl) => {
  //           const $job = Cypress.$(jobEl);
  //           checkCardContainsKeyword($job, keyword);
  //         });
  //       }
  //     });
  //   }
  // });
});
