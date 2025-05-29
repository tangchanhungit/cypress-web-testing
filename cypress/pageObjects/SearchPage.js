const SEARCH_INPUT_LOCATOR = `//*[@id='search']`
const BTN_SEARCH_LOCATOR  = `//button[.//span[text()='Tìm kiếm']]`
const JOB_CARD_LOCATOR = `//li[contains(@class,'mb-4 last:mb-0')]`
const FREE_JOB_LOCATOR = `//li[contains(@class,'free-job')]`
const LOCATION_LOCATOR = `//div[contains(@class, 'relative flex cursor')]`

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

    clickSearchButton() {
        this.searchButton.click();
    },

    get jobCards() {
        return cy.xpath(JOB_CARD_LOCATOR);
    },
    
    get freeJob(){
        return cy.xpath(FREE_JOB_LOCATOR);
    },

    get locationField(){
        return cy.xpath(LOCATION_LOCATOR).click();
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
        cy.xpath(LOCATION_LOCATOR).click()
        cy.contains("li", location).click();
    }
}
