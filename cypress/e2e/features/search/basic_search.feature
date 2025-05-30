@search @high_priority

Feature: Basic Search Functionality
  As a job seeker
  I want to search for jobs on TopDev.vn
  So I can find relevant job opportunities

  Background:
    Given I am on the TopDev search page

  Scenario Outline: Search with invalid keywords should show validation error
    When I enter "<input>" in search bar
    And I press the search button
    Then the search result should be "validation error"

    Examples:
    | input    |
    | aaa      |
    | @!@#$%   |
 
  Scenario Outline: Search with edge cases
    When I enter "<input>" in search bar
    And I press the search button
    Then the search result should be "<expected>"
    Then I should see at least 1 result
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then Each result should contain "<expected>"
    
    Examples:
      | input         | expected         |
      | SQL           | SQL              |
      | Tester        | Tester           |
      | .Net          | .Net             |

  Scenario Outline: Search jobs by company name
    When I enter "<company>" in search bar
    And I press the search button
    Then I should see at least 1 result
    Then each result should contain "<company>"

  Examples:
    | company       |
    | LG            |
    | Viettel       |
    | FPT           |
    | Samsung       |

      
  Scenario: Search with nothing enter 
    And I press the search button
    Then I should see at least 1 result

  Scenario Outline: Search should be case-insensitive
    When I enter "<input>" in search bar
    And I press the search button
    Then I should see at least 1 result
    Then Each result should contain "<expected>"

    Examples:
      | input         | expected         |
      | python        | python           |
      | PYTHON        | python           |
      | PyThOn        | python           |

  Scenario: Search with Vietnamese accented characters
    When I enter "lập trình" in search bar
    And I press the search button
    Then I should see at least 1 result
    Then Each result should contain "lập trình"

  Scenario Outline: Search with an unusually long keyword
    When I enter "<input>" in search bar
    And I press the search button
    Then the search result should be "validation error"

    Examples:
      | input                                                                                  |
      | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa   |

      
