const SEARCH_INPUT_LOCATOR = `//*[@id='search']`
const BTN_SEARCH_LOCATOR  = `//button[.//span[text()='Tìm kiếm']]`
const JOB_CARD_LIST_LOCATOR = `//ul[contains(@class,'mt-4')]`
const JOB_TITLE_LOCATOR = `//h3[@class='line-clamp-1']`
const SKILL_TAG_LOCATOR = `//div[contains(@class, "line-clamp-1")]//span`

export const SearchPage = {
    navigate() {
        cy.visit('/');
    },

    get searchInput() {
        return cy.xpath(SEARCH_INPUT_LOCATOR)
            .should('be.visible')
            .and('not.be.disabled');
    },

    get searchButton() {
        return cy.xpath(BTN_SEARCH_LOCATOR).click();
    },
    
    get jobCardList() {
        return cy.xpath(JOB_CARD_LIST_LOCATOR).should('be.visible');
    },

    get jobCards() {
        return this.jobCardList.find('li');
    },

    get jobTitle() {
        return cy.xpath(JOB_TITLE_LOCATOR);
    },

    get skillTags() {
        return cy.xpath(SKILL_TAG_LOCATOR);
    },

    enterKeyword(keyword) {
        this.searchInput.clear().type(keyword, { force: true });
    },

    search(keyword) {
        this.searchInput.type(keyword);
    },

    loadAllResults() {
        const clickIfExists = () => {
            const $btn = Cypress.$("div.mx-auto button:contains('Xem thêm')");

            if ($btn.length > 0 && $btn.is(":visible")) {
                cy.wrap($btn)
                    .scrollIntoView()
                    .click({ force: true })
                    .wait(1500)
                    .then(() => clickIfExists());
            } else {
                cy.log('✅ Không còn nút Xem thêm.');
            }
        };

        return cy.then(() => clickIfExists());
    }
}
