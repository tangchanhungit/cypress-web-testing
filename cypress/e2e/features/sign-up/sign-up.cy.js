// cypress/e2e/sign-up.cy.js
import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
import { SignUpPage } from '../../../pageObjects/signup_page';

Given('I am on the sign up page', () => {
    SignUpPage.navigate();
    // SignUpPage.btnSignIn.click();
    SignUpPage.btnNhaTuyenDung.click();
});

When('I enter the following details:', (dataTable) => {
  dataTable.hashes().forEach(row => {
      console.log("ROW DATA:", row);  // Xem dữ liệu trong console để xác định nếu có giá trị undefined
      SignUpPage.fullNameField.type(row.fullname);
      SignUpPage.emailField.type(row.email);
      SignUpPage.phoneField.type(row.phone_number);
      SignUpPage.passwordField.type(row.password);
      SignUpPage.confirmPasswordField.type(row.confirm_password);
      SignUpPage.taxField.type(row.tax_number);
      SignUpPage.companyField.type(row.company_name);
  });
});

When('I click the {string}', () =>{
  SignUpPage.checkBoxField.check({force: true});
})

When('I agree to the terms and conditions', () => {
    SignUpPage.checkBoxAgreeField.check({ force: true });
});

// When('I click the {string} button', (buttonText) => {
//     if (buttonText === "Đăng ký") {
//         SignUpPage.btnSignUpField.click();
//     }
// });
// Then('I should see an error message {string}', (errorMessage) => {
//     SignUpPage.errorPassword.should('be.visible');
// });

// Then('I should be redirected to the dashboard', () => {
//     cy.url().should('include', '/');
// });

// Then('I should see an error message {string}', (errorMessage) => {
//     cy.get('.error-message').should('contain', errorMessage);
// });

// Then('I should see validation errors for the following fields:', (dataTable) => {
//     dataTable.hashes().forEach(row => {
//         cy.get('.error-message').should('contain', row.message);
//     });
// });
