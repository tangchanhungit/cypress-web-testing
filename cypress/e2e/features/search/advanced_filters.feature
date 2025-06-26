Feature: Advanced Search Functionality
  As a job seeker
  I want to search for jobs on TopDev.vn
  So I can find relevant job opportunities

  Background:
    Given I am on the TopDev search page

  Scenario Outline: Advanced search with keyword and filters
    When I enter "<keyword>" in search bar
    And I press the "Tìm kiếm" search button
    Then I select "<location>" in the location filter
    And I select "<experience>" in the experience filter
    And I select "<benefit>" in the benefits filter
    And I select "<companySize>" in the company size filter
    And I select "<workType>" in the work type filter
    And I press the "Search" search button
    And all results should be in "<location>"
    And all results should require "<experience>"
    And all results should require "<benefit>"
    And all results should require "<workType>"

    Examples:
      | keyword | location    | experience | benefit  | companySize | workType  |
      | SQL     | Ho Chi Minh | Intern     | Tea time | 10-24       | In Office |

  Scenario Outline: Filter by location
    When I enter "SQL" in search bar
    And I press the search button
    When I select "<location>" in the location filter
    And I press the search button again
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then all results should be in "<location>"

  Examples:
  | location    |
  | Ho Chi Minh |
  | Ha Noi      |
  | Da Nang     |


  Scenario: Filter by experience
    When I enter "SQL" in search bar
    And I press the search button
    Then I select "Intern" in the experience filter
    And I press the search button again
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then all results should require "Intern"

  Scenario: Filter by benefits
    When I enter "C#" in search bar
    And I press the search button
    Then I select "Tea time" in the benefits filter
    And I press the search button again
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then I should see at least 1 result

  Scenario: Filter by company size
    When I enter "JAVA" in search bar
    And I press the search button
    Then I select "10-24" in the company size filter
    And I press the search button again
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then I should see at least 1 result

  Scenario: Filter by work type
    When I enter "SQL" in search bar
    And I press the search button
    Then I select "In Office" in the work type filter
    And I press the search button again
    Then I load all available results by clicking "Xem thêm" until it disappears
    Then I should see at least 1 result


  Scenario: Filter by location and experience
    When I enter "Tester" in search bar
    And I press the search button
    Then I select "Ho Chi Minh" in the location filter
    And I select "Intern" in the experience filter
    And I press the search button again
    Then all results should be in "Ho Chi Minh"
    And all results should require "Intern"