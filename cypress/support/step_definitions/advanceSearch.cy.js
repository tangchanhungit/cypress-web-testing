import { SearchPage } from "../../pageObjects/searchpage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { checkCardContainsKeyword, handleIfResultsExist } from "../commands";

Given("I am on the search page", () => {
    cy.visit('/viec-lam-it')
});

When('I select {string} in the location filter', (location) => {
  SearchPage.selectLocation(location);
});

When('I select {string} in the experience filter', (experience) => {
  SearchPage.selectFilterItem('Experience Level',experience);
});

When('I select {string} in the benefits filter', (benefit) => {
  SearchPage.selectFilterItem('Benefits',benefit);
});

When('I select {string} in the company size filter', (companySize) => {
  SearchPage.selectFilterItem('Company Size',companySize);
});

When('I select {string} in the work type filter', (workType) => {
  SearchPage.selectFilterItem('Work Type', workType);
});

Then('I press the {string} search button again', (text) =>{
  SearchPage.clickSearchButtonInPage(text);
});

Then('all results should be in {string}', (location) => {
  handleIfResultsExist(() => {
    SearchPage.jobCards
      .should('exist')
      .each(($card) => {
          Cypress._.each($card, (card) => {
          checkCardContainsKeyword(card, location);  
        });
      });
  });
});

Then('all results should require {string}', (keyword) => {
  handleIfResultsExist(() => {
    SearchPage.jobCards
      .should('exist')
      .each(($card) => {
          Cypress._.each($card, (card) => {
          checkCardContainsKeyword(card, keyword);  
        });
      });
  });
});
