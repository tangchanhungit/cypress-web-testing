// cypress/pageObjects/signup_page.js

const SIGN_UP_URL = `https://accounts.topdev.vn`

const TXT_FULLNAME_LOCATOR = `//*[@id='employer_display_name']`
const TXT_EMAIL_LOCATOR = `//*[@id="email"]`;  
const TXT_PHONENUMBER_LOCATOR = `//input[@name="phone"]`;  
const TXT_PASSWORD_LOCATOR = `//*[@id="password"]`;  
const TXT_CONFIRM_PASSWORD_LOCATOR = `//*[@id="comfirm-password"]`;
const TXT_TAX_LOCATOR = `//*[@id="tax_number"]`;  
const TXT_COMPANY_NAME_LOCATOR = `//*[@id="business_name"]`;  
const CHECKBOX_NO = `//*[@id="customRadioInline2"]`;  
const CHECKBOX_LOCATOR = `//*[@id="checkbox-1"]`; 

const BTN_SIGNUP_LOCATOR = `//button[@type="submit" and contains(@class, "btn-register")]`; 

const BTN_NHA_TUYEN_DUNG = `//li[@class="tab-item"]//a[@tab-root="tab-employer"]`;

const ERROR_PASSWORD_XPATH = `//p[contains(@class, "invalid-feedback") and contains(@class, "error-confirm-password") and contains(text(), "Mật khẩu xác nhận không trùng khớp")]`;




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
        return cy.xpath(TXT_FULLNAME_LOCATOR)
    },

    get emailField() {
        return cy.xpath(TXT_EMAIL_LOCATOR)
    },

    get phoneField(){
        return cy.xpath(TXT_PHONENUMBER_LOCATOR)
    },

    get passwordField() {
        return cy.xpath(TXT_PASSWORD_LOCATOR)
    },

    get confirmPasswordField() {
        return cy.xpath(TXT_CONFIRM_PASSWORD_LOCATOR)
    },

    get taxField(){
        return cy.xpath(TXT_TAX_LOCATOR)
    },

    get companyField(){
        return cy.xpath(TXT_COMPANY_NAME_LOCATOR)
    },
    
    get checkBoxField() {
        return cy.xpath(CHECKBOX_NO)
    },

    get checkBoxAgreeField() {
        return cy.xpath(CHECKBOX_LOCATOR)
    },

    get btnSignUpField() {
        return cy.xpath(BTN_SIGNUP_LOCATOR).click()
    },

    get errorPassword(){
        return cy.xpath(ERROR_PASSWORD_XPATH, {timeout: 10000}).should('be.visible')
    }
}
