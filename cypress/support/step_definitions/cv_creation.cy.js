import { CVPage } from "../../pageObjects/CVPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the CV creation page', () => {
    CVPage.navigate();
})

Then('I click create CV button', () =>{
    CVPage.clickCVBtnCreate();
})

When('I fill in my full name as {string}', (name) => {
    CVPage.fillNameInfo(name);
})

Then('I click start create button', () => {
    CVPage.clickStartCreate();
})

When('I fill all my personal info from data set', () => {
    cy.fixture('valid_data.json').then((cvs) =>{
        cvs.forEach((cv) => {    
            CVPage.fillBasicInfo(cv.name, cv.position, cv.phone, cv.dateOfBirth, cv.city);
            CVPage.selectGender(cv.gender);
            CVPage.fillAdditionalInfo(cv.address, cv.linkedin, cv.github);
            CVPage.selectStatusWorks(cv.status);
            CVPage.selectSalary(cv.salary);

            // Các bước tiếp theo, ví dụ submit form, verify, reset form, ...
            // CVPage.submitForm();

            // // Nếu cần làm lại cho data kế tiếp, reset hoặc reload page
            // cy.reload();
        });
    })
})

When('I fill requires info from data set', () =>{
    cy.fixture('require_data.json').then((cvs) =>{
        cvs.forEach((cv) => {    
            CVPage.fillBasicInfo(cv.name, cv.position, cv.phone, cv.dateOfBirth, cv.city);
            CVPage.selectGender(cv.gender);
            CVPage.selectStatusWorks(cv.status);
            CVPage.selectSalary(cv.salary);
            CVPage.fillIntroduce(cv.content);
            CVPage.selectSkills(cv.skill);

            // Các bước tiếp theo, ví dụ submit form, verify, reset form, ...
            // CVPage.submitForm();

            // // Nếu cần làm lại cho data kế tiếp, reset hoặc reload page
            // cy.reload();
        });
    })
})
