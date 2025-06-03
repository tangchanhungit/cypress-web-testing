const CV_CREATE_BUTTON = `//div[h2[normalize-space()='Tạo CV']]//a[normalize-space()='Khám phá ngay']`
const NAME_FIELD = `//input[contains(@class,'ant-input')]`
const CREATE_BUTTON = `//button[@xl='true' and @type='submit' and span[text()='Bắt đầu tạo']]`
const INPUT_NAME_LOCATOR = `//input[@name='personal.0.name']`
const INPUT_POSITION_LOCATOR = `//input[@name='personal.0.profession']`
const INPUT_PHONE_LOCATOR = `//input[@name='personal.0.phone']`
const INPUT_DATE_OF_BIRTH_LOCATOR = `//input[@name='personal.0.dateofbirth']`
const INPUT_CITY_LOCATOR = `//div[contains(@class, 'ant-select') and @name='personal.0.provinces_id']//input[contains(@class, 'ant-select-selection-search-input')]`
const INPUT_ADDRESS_LOCATOR = `//input[@name='personal.0.address']`
const INPUT_LINKEDIN_LOCATOR = `//input[@name='personal.0.linkedin']`
const INPUT_GITHUB_LOCATOR = `//input[@name='personal.0.github']`
const STATUS_WORKS_LOCATOR = `//div[contains(@class, 'ant-select') and @name='status_works']//input[contains(@class, 'ant-select-selection-search-input')]`
const SALARY_LOCATOR = `//div[contains(@class, 'ant-select') and @name='salary_range']//input[contains(@class, 'ant-select-selection-search-input')]`
const INTRODUCE_LOCATOR = `//label[text()='Giới thiệu bản thân']/ancestor::div[contains(@class,'ant-form-item')]//iframe[contains(@class, 'tox-edit-area__iframe')]`;
const SKILL_LOCATOR = `//div[contains(@class, 'ant-select-selector')][.//span[text()='Nhóm kỹ năng chính']]//input[@type='search']`
export const CVPage = {
    navigate() {
        cy.visit('/tao-cv-online')
    },

    clickCVBtnCreate(){
        cy.xpath(CV_CREATE_BUTTON).click();
        cy.wait(3000)
    },

    fillNameInfo(name) {
        cy.xpath(NAME_FIELD).clear().type(name);
    },

    clickStartCreate(){
        cy.xpath(CREATE_BUTTON).click();
    },

    fillBasicInfo(name, position, phone, dateofbirth, city){
        cy.xpath(INPUT_NAME_LOCATOR)
            .should('exist')
            .clear()
            .type(name);
        cy.xpath(INPUT_POSITION_LOCATOR)
            .should('exist')
            .clear()
            .type(position);
        cy.xpath(INPUT_PHONE_LOCATOR)
            .should('exist')
            .clear()
            .type(phone);

        cy.xpath(INPUT_DATE_OF_BIRTH_LOCATOR)
            .should('exist')
            .clear({ force: true })
            .type(`${dateofbirth}{enter}`, { force: true });
        cy.xpath(INPUT_CITY_LOCATOR)
            .should('exist')
            .clear({ force: true })
            .type(`${city}{enter}`, { force: true });
    },

    fillAdditionalInfo(address, linkedin, github){
        cy.xpath(INPUT_ADDRESS_LOCATOR)
            .should('exist')
            .clear()
            .type(address);
        
        cy.xpath(INPUT_LINKEDIN_LOCATOR)
            .should('exist')
            .clear()
            .type(linkedin);
        
        cy.xpath(INPUT_GITHUB_LOCATOR)
            .should('exist')
            .clear()
            .type(github);
    },

    selectGender(value){
        cy.xpath(`//input[@name='personal.0.gender' and @value='${value}']`).should('exist')
            .click({force:true})
    },

    selectStatusWorks(value) {
        cy.xpath(STATUS_WORKS_LOCATOR).click({force:true});

        cy.get('.ant-select-dropdown')  
            .should('be.visible')         
            .contains('.ant-select-item-option-content', value)
            .click({ force: true });    
    },

    selectSalary(value) {
        cy.xpath(SALARY_LOCATOR)
            .should('be.visible')
            .click({force:true});

        cy.get('.ant-select-dropdown') 
            .should('be.visible')        
            .contains('.ant-select-item-option-content', value) 
            .click({ force: true });    
    },

    fillIntroduce(content){
        cy.xpath(INTRODUCE_LOCATOR)
            .should('be.visible')
            .click({force:true})
            .type(content, {force:true})
    },

    selectSkills(skill) {
        cy.xpath(SKILL_LOCATOR)
            .should('exist')
            .clear({ force: true })
            .type(`${skill}{enter}`, { force: true });
    },

    
    uploadAvatar(filePath) {
        cy.get('input[type="file"]').attachFile(filePath);
    },

    clickCreateButton() {
        cy.contains('button', 'Tạo CV').click();
    },

    checkSuccessMessage() {
        cy.contains('CV của bạn đã được tạo').should('exist');
    }
}

