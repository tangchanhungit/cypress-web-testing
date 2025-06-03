const SEARCH_INPUT_LOCATOR = `//*[@id='search']`
const BTN_SEARCH_LOCATOR  = `//button[.//span[text()='Tìm kiếm']]`
const BTN_SEARCH_IN_PAGE_LOCATOR = `//button[.//span[text()='Search']]`
const JOB_LIST = `//ul[contains(@class,'mt-4')]`
const JOB_CARD_LOCATOR = `//li[contains(@class,'mb-4 last:mb-0')]`
const BTN_LOCATION_LOCATOR = `//button[contains(@class,'flex w-full items-center gap-2')]`

export const SearchPage = {
    navigate() {
        cy.visit('/');
    },

    get searchInput() {
        return cy.xpath(SEARCH_INPUT_LOCATOR)
            .should('be.visible')
            .and('not.be.disabled');
    },

    enterKeyword(keyword) {
        this.searchInput.clear().type(keyword, { force: true });
    },

    get searchButton() {
        return cy.xpath(BTN_SEARCH_LOCATOR).should('be.visible');
    },

    get searchInPageBtn(){
        return cy.xpath(BTN_SEARCH_IN_PAGE_LOCATOR).should('be.visible');
    },

    clickSearchButton() {
        this.searchButton.click();
        cy.wait(300);
    },

    clickSearchButtonInPage(){
        this.searchInPageBtn.click();
    },

    get jobList(){
        return cy.xpath(JOB_LIST);
    },

    get jobCards() {
        return cy.xpath(JOB_CARD_LOCATOR);
    },
    
    get btnLocation(){
        return cy.xpath(BTN_LOCATION_LOCATOR);
    },

    loadAllResults() {
        const clickIfExists = () => {
            const $btn = Cypress.$("div.mx-auto button:contains('Xem thêm')");

            if ($btn.length > 0 && $btn.is(":visible")) {
                cy.wrap($btn)
                    .scrollIntoView()
                    .click({ force: true })
                    .wait(1000)
                    .then(() => clickIfExists());
            }
        }
        return cy.then(() => clickIfExists());
    },

    selectLocation(location) {
        // Click nút để mở dropdown
        this.btnLocation.should('exist').click({ force: true });

        cy.wait(1000);

        // Chờ dropdown thực sự hiển thị
        cy.xpath("//div[contains(@class, 'absolute') and contains(@class, 'top-10')]")
        .should('be.visible');

        // Click vào span theo location
        cy.xpath(`//ul/li//span[normalize-space()="${location}"]`)
        .should('exist')
        .should('be.visible')
        .click({ force: true });
    },

    selectFilterItem(filterName, itemText) {
        // 1. Click button mở dropdown
        cy.xpath(`//button[contains(@class,'border-[#DD3F24]')]//span[normalize-space()="${filterName}"]`)
        .should('be.visible')
        .click();

        // 2. Chờ dropdown ul cùng cấp div.relative mở (không còn hidden)
        cy.xpath(`//button[contains(@class,'border-[#DD3F24]')]//span[normalize-space()="${filterName}"]/ancestor::div[contains(@class,'relative')]/ul[not(contains(@class,'hidden'))]`)
        .should('exist')
        .should('be.visible');

        // 3. Click item trong dropdown (span chứa text itemText)
        cy.xpath(`//button[contains(@class,'border-[#DD3F24]')]//span[normalize-space()="${filterName}"]/ancestor::div[contains(@class,'relative')]/ul/li//span[normalize-space()="${itemText}"]`)
        .should('be.visible')
        .click({ force: true });
    }
}
