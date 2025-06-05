import { CVPage } from "../../pageObjects/CVPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the CV creation page', () => {
    CVPage.navigate();
})

Then('I click create CV button', () =>{
    CVPage.clickCVBtnCreate();
})

When('I create CV with names {string}', (name) => {
    CVPage.fillNameInfo(name);
})

Then('I click start create button', () => {
    CVPage.clickStartCreate();
    cy.wait(1000)
})

When('I fill Personal information section', () => {
    cy.fixture('data.json').then((cvs) =>{
        cvs.forEach((cv) => {    
            CVPage.fillBasicInfo(cv.name, cv.position, cv.gmail, cv.phone, cv.dateOfBirth, cv.city);
            CVPage.selectGender(cv.gender);
            CVPage.fillAdditionalInfo(cv.address, cv.linkedin, cv.github);
            CVPage.fillFindJobSection(cv.status,cv.salary);
            CVPage.fillIntroduce(cv.content);
        });
    })
})

When('I fill Programming skills section', () =>{
    cy.fixture('data.json').then((cvs) =>{
        cvs.forEach((cv) => {    
            CVPage.fillProgramSkill(cv.main_skills, cv.group_skills)
        });
    })
})
When('I fill Education section', () =>{
    cy.fixture('data.json').then((cvs) =>{
        cvs.forEach((cv) => {    
            CVPage.fillEducation(cv.school, cv.major);
        });
    })
})

Then('I click save CV', () => {
    CVPage.clickSaveCV();
})
