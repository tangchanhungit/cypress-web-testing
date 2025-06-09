const BTN_DELTE_CV = (text) => `//td[@class='ant-table-cell font-bold']//div[contains(@class, 'FieldName') and text()='${text}']/parent::td//following-sibling::td[3]//span[@class="anticon anticon-delete"]`
const TXT_DELETE_CV_SUCCESS = `//div[contains(text(),'Xóa CV thành công!')]`
const BTN_DOWLOAND_CV = (text) => `//td[@class='ant-table-cell font-bold']//div[contains(@class, 'FieldName') and text()='${text}']/parent::td//following-sibling::td[3]//span[@class="anticon anticon-cloud-download"]`

export const MyCVPage = {
   

    navigateManageCV() {
        cy.visit('/users/my-cv')
    },

    deleteCV(text) {
        this.clickButtonDeleteCV(text);
},

    clickButtonDeleteCV(text) {
        cy.xpath(BTN_DELTE_CV(text)).first().click({force: true});
        
    },
    clickConfirmDeleteCV() {
        cy.get('.ant-popover-buttons>.ant-btn-primary').click({force: true});
    
    },
    verifyDeleteCVSuccess() {
        cy.xpath(TXT_DELETE_CV_SUCCESS).should('be.visible');
    },
    clickDownloadCV(text) {
        cy.xpath(BTN_DOWLOAND_CV(text)).first().should('be.visible').click({force: true});
        cy.wait(5000); // Wait for the download to complete, adjust as necessary
    },
    verifyDownloadSuccess(text) {
        const fileName = text +'_CV_topdev.vn.pdf';
        const filePath = `cypress/downloads/${fileName}`;
        cy.waitUntil(() => cy.task('fileExists', fileName), {
            interval: 500,
            timeout: 15000,
            errorMsg: `File ${fileName} không tồn tại sau 15 giây`,
        });
        cy.readFile(filePath, 'binary').then((fileContent) => {
            expect(fileContent).to.exist;
            cy.log(`File ${fileName} đã được tải về và đọc thành công.`);
        });
        }
}


