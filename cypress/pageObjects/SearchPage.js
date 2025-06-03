const SEARCH_INPUT_LOCATOR = `//*[@id='search']`
// const BTN_SEARCH_LOCATOR  = `//button[.//span[text()='Tìm kiếm']]`
const JOB_CARD_LOCATOR = `//li[contains(@class,'mb-4 last:mb-0')]`
const FREE_JOB_LOCATOR = `//li[contains(@class,'free-job')]`
const LOCATION_LOCATOR = `//span[.='Location']`
var  LOCATION_FILTER = (text) => `//span[.='${text}']`

var BTN_SEARCH_LOCATOR = (text) => `//button[.//span[text()='${text}']]`


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

    clickSearchButtonInPage(text) {
        cy.xpath(BTN_SEARCH_LOCATOR(text))
            .should('be.visible')
            .click({ force: true });
    },

//     clickSearchButton() {

//         cy.xpath("//button[.//span[text()='Tìm kiếm']]").then($btn => {
//   if ($btn.length) {
//     cy.wrap($btn).click({ force: true });
//   } else {
//     cy.xpath("//button[.//span[text()='Search']]").then($btn2 => {
//       if ($btn2.length) {
//         cy.wrap($btn2).click({ force: true });
//       } else {
//         cy.log("Không tìm thấy nút 'Tìm kiếm' hoặc 'Search'");
//       }
//     });
//   }
// });


    //     this.searchButton.click();
    // },

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

        cy.xpath(LOCATION_LOCATOR).click()
        cy.contains('label', location)
        .find('input[type="checkbox"]')
        .check({ force: true })
    },

    selectFilterItem(text,location) {
       cy.xpath(LOCATION_FILTER(text)).click();

        cy.contains('label', location).then($label => {
        // Tìm radio
        const radio = $label.find('input[type="radio"]');
        if (radio.length) {
            cy.wrap(radio).check({ force: true });
        } else {
            const checkbox = $label.find('input[type="checkbox"]');
            if (checkbox.length) {
            cy.wrap(checkbox).check({ force: true });
            } else {
            throw new Error(`Không tìm thấy input radio hoặc checkbox trong label chứa '${location}'`);
            }
        }
        });
    }
}
