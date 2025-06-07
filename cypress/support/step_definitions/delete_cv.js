import { MyCVPage } from "../../pageObjects/MyCVPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



Given('I am on the manage CVs page', () => {
    MyCVPage.navigateManageCV();
})
When('I click the delete button {string}', (text) => {
    MyCVPage.deleteCV(text);
})


When('I confirm the deletion', () => {
    MyCVPage.clickConfirmDeleteCV();
})

Then('Message CV deleted successfully should be displayed', () => {
    MyCVPage.verifyDeleteCVSuccess();
})
Then('I try to delete the CV {string} again', (text) => {
    MyCVPage.clickButtonDeleteCV(text);
})

When('I click the download button {string}', (text) => {
    MyCVPage.clickDownloadCV(text);
})
Then('The CV should be downloaded successfully {string}', (text) => {
    MyCVPage.verifyDownloadSuccess(text);
});


