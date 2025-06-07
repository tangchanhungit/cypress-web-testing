Feature: Manage and download CVs

    Background:
        Given I am on the CV creation page
        Then I click create CV button
        And I create CV with names "test"
        And I click start create button

    Scenario Outline: download CV before deletion
        When I am on the manage CVs page
        And I click the download button "<cvName>"
        Then The CV should be downloaded successfully "<cvName>"

        Examples:
            | cvName |
            | test   |