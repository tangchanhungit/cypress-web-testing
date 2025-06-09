Feature: Delete CV on TopDev.vn
    As a logged-in user
    I want to delete my CV
    So that I can remove outdated or unwanted CVs

    Background:
        Given I am on the CV creation page
        Then I click create CV button
        And I create CV with names "test"
        And I click start create button

    Scenario: Delete an existing CV
        When I am on the manage CVs page
        And I click the delete button "Only required fields"
        When I confirm the deletion
        Then Message CV deleted successfully should be displayed