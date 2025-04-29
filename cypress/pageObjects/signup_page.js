// cypress/pageObjects/signup_page.js

const SIGN_UP_URL = 'https://accounts.topdev.vn'

const TXT_FULLNAME_LOCATOR = '#employer_display_name'
const TXT_EMAIL_LOCATOR = '#email'
const TXT_PHONENUMBER_LOCATOR = 'input[name="phone"]'
const TXT_PASSWORD_LOCATOR = "#password"
const TXT_CONFIRM_PASSWORD_LOCATOR = "#comfirm-password"
const TXT_TAX_LOCATOR = '#tax_number'
const TXT_COMPANY_NAME_LOCATOR = '#business_name'
const CHECKBOX_NO ='#customRadioInline2'
const CHECKBOX_LOCATOR = '#checkbox-1';

const BTN_SIGNUP_LOCATOR = 'button[type="submit"].btn-register';
const BTN_NHA_TUYEN_DUNG = '//li[@class="tab-item"]//a[@tab-root="tab-employer"]';

const ERROR_PASSOWRD_LOCATOR = 'p.invalid-feedback.error-email.show';



export const SignUpPage = {
    navigate() {
        cy.visit(SIGN_UP_URL)
    },

    get btnSignIn2() {
        return cy.xpath(BTN_SIGN_IN2)
    },

    get inputPassword() {
        return cy.xpath(TXT_PASSWORD)
    },

    get inputEmail() {
        return cy.xpath(TXT_EMAIL)
    },

    get btnNhaTuyenDung() {
        return cy.xpath(BTN_NHA_TUYEN_DUNG)
    },

    get btnSignIn() {
        return cy.xpath(BTN_SIGN_IN)
    },

    get fullNameField() {
        return cy.get(TXT_FULLNAME_LOCATOR)
    },

    get emailField() {
        return cy.get(TXT_EMAIL_LOCATOR)
    },

    get phoneField(){
        return cy.get(TXT_PHONENUMBER_LOCATOR)
    },

    get passwordField() {
        return cy.get(TXT_PASSWORD_LOCATOR)
    },

    get confirmPasswordField() {
        return cy.get(TXT_CONFIRM_PASSWORD_LOCATOR)
    },

    get taxField(){
        return cy.get(TXT_TAX_LOCATOR)
    },

    get companyField(){
        return cy.get(TXT_COMPANY_NAME_LOCATOR)
    },
    
    get checkBoxField() {
        return cy.get(CHECKBOX_NO);
    },

    get checkBoxAgreeField() {
        return cy.get(CHECKBOX_LOCATOR)
    },

    get btnSignUpField() {
        return cy.get(BTN_SIGNUP_LOCATOR)
    },

    get errorPassword(){
        return cy.get(ERROR_PASSOWRD_LOCATOR)
    }
}
