const CV_CREATE_BUTTON = `//a[contains(@href, '/users/my-cv') and contains(., 'Khám phá ngay')]`
const NAME_FIELD = `//input[contains(@class,'ant-input')]`
const BUTTON_LOCATOR = (text) => `//button[.//span[text()='${text}']]`

const INPUT_FIELD = (placeholder) => `//input[@placeholder='${placeholder}']`
const DROPDOWN_FIELD = (placeholder) => `//span[contains(text(),"${placeholder}")]/preceding-sibling::span//input[@class="ant-select-selection-search-input"]`
const GENDER_LOCATION = (gender) => `//input[@value='${gender}']`
export const CVPage = {
    navigate() {
        cy.visit('/tao-cv-online')
    },

    navigateManageCV() {
        cy.visit('/users/my-cv')
    },

    clickCVBtnCreate(){
        cy.xpath(CV_CREATE_BUTTON).click();
        cy.wait(3000)
    },

    fillNameInfo(name) {
        cy.xpath(NAME_FIELD).type(name);
    },

    clickStartCreate(){
        cy.xpath(BUTTON_LOCATOR('Bắt đầu tạo')).click();
    },

    fillInputFields(fields) {
        fields.forEach(({ locator, value, force = true }) => {
            cy.xpath(locator)
                .should('exist')
                .clear({ force })
                .type(`${value}`, { force });
        });
    },


    fillBasicInfo(name, position, email, phone, dateofbirth, city){
        this.fillInputFields([
            { locator: INPUT_FIELD('Vui lòng nhập họ và tên'), value: name },
            { locator: INPUT_FIELD('Vui lòng chọn vị trí ứng tuyển'), value: position },
            { locator: INPUT_FIELD('@gmail.com'), value: email },
            { locator: INPUT_FIELD('Vui lòng nhập số điện thoại'), value: phone },
            { locator: INPUT_FIELD('DD-MM-YYYY'), value: `${dateofbirth}{enter}`, force: true },
        ]);

        this.selectDropdownValue("", city);
    },

    fillAdditionalInfo(address, linkedin, github){
        this.fillInputFields([
            { locator: INPUT_FIELD('Đường, Phường, Quận'), value: address },
            { locator: INPUT_FIELD('https://lk.id/username'), value: linkedin },
            { locator: INPUT_FIELD('https://github.com/username'), value: github },
        ]);
    },

    selectGender(gender){
        cy.xpath(GENDER_LOCATION(gender))
            .should('exist')
            .click({force:true})
    },

    selectDropdownValue(placeholderText, value) {
        let input_field;

        if (placeholderText && placeholderText.trim() !== "") {
            input_field = DROPDOWN_FIELD(placeholderText);
        } else {
            input_field = `(//input[@class="ant-select-selection-search-input"])[1]`;
        }

        cy.xpath(input_field)
            .should('exist')
            .click({ force: true })
            .type(`${value}{enter}`, { force: true });
    },

    selectCalendarValue(index, date) {
    cy.get('.ant-picker-input > input')
        .eq(index)
        .should('exist')
        .clear({ force: true })
        .type(date, { force: true })
        .type('{enter}', { force: true });
},

    fillFindJobSection(status,salary){
        this.selectDropdownValue('Đang tìm việc', status);
        this.selectDropdownValue('Dưới $300', salary);

    },

    fillIntroduce(){
    cy.getIframeBody('.tox-edit-area__iframe').within(() => {
        cy.get('p').type('Ayush');
  })
},


    fillProgramSkill(main_skill,group_skills){
        this.selectDropdownValue('Nhóm kỹ năng chính',main_skill);
        this.selectDropdownValue('Chọn kỹ năng',group_skills);
    },

    fillEducation(school,major){
        this.selectDropdownValue('Vui lòng nhập tên trường', school)
        this.fillInputFields([
            {locator: INPUT_FIELD('Vui lòng nhập ngành học'), value: major, force: true},
        ]); 
        this.selectCalendarValue(1,'01-2020');
        this.selectCalendarValue(2,'01-2024');
    },

    uploadAvatar(filePath) {
        cy.get('input[type="file"]').attachFile(filePath);
    },

    clickSaveCV() {
        cy.xpath(BUTTON_LOCATOR('LƯU CV')).click();
        this.verifyCreateCVSuccess()
    },

    checkSuccessMessage() {
        cy.contains('CV của bạn đã được tạo').should('exist');
    },
    verifyCreateCVSuccess(){
        cy.contains('p', 'Bạn đã tạo CV thành công').should('be.visible');
    },


};


