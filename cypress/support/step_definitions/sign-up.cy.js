// cypress/e2e/sign-up.cy.js
import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
import { SignUpPage } from '../../pageObjects/signup_page';

Given('I am on the sign up page', () => {
    SignUpPage.navigate();
    // SignUpPage.btnSignIn.click();
    SignUpPage.btnNhaTuyenDung.click();
});

When('I enter the following details:', () => {
    const data = {
      fullname: 'test user',
      email: 'test@gmail.com',
      phone_number: '0337704139',
      password: '12345678',
      confirm_password: '12345678',
      tax_number: '1234567890',
      company_name: 'Test Company'
    };

  SignUpPage.fullNameField.should('exist').should('be.visible').type(data.fullname);
  SignUpPage.emailField.should('exist').should('be.visible').type(data.email);
  SignUpPage.phoneField.should('exist').should('be.visible').type(data.phone_number);
  SignUpPage.passwordField.should('exist').should('be.visible').type(data.password);
  SignUpPage.confirmPasswordField.should('exist').should('be.visible').type(data.confirm_password);
  SignUpPage.taxField.should('exist').should('be.visible').type(data.tax_number);
  SignUpPage.companyField.should('exist').should('be.visible').type(data.company_name);

});

When('I fill valid sign up form except confirm password is {string}', (wrongConfirmPassword) => {
  const formData = {
    fullname: 'test user',
    email: 'test@gmail.com',
    phone_number: '0337704139',
    password: '12345678',
    confirm_password: wrongConfirmPassword,
    tax_number: '1234567890',
    company_name: 'Test Company'
  };

  SignUpPage.fullNameField.type(formData.fullname);
  SignUpPage.emailField.type(formData.email);
  SignUpPage.phoneField.type(formData.phone_number);
  SignUpPage.passwordField.type(formData.password);
  SignUpPage.confirmPasswordField.type(formData.confirm_password);
  SignUpPage.taxField.type(formData.tax_number);
  SignUpPage.companyField.type(formData.company_name);
});


When('I click the {string}', () =>{
  SignUpPage.checkBoxField.check({force: true});
})

When('I agree to the terms and conditions', () => {
    SignUpPage.checkBoxAgreeField.check({ force: true });
});

When('I click the {string} button', (buttonText) => {
    if (buttonText === "Đăng ký") {
        SignUpPage.btnSignUpField.wait(5000).click();
    }
});
Then('I should see an error message {string}', (errorMessage) => {
    SignUpPage.errorPassword;
});

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
