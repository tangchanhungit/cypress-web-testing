@search @high_priority

Feature: Basic Search Functionality
  As a job seeker
  I want to search for jobs on TopDev.vn
  So I can find relevant job opportunities

  Scenario: Search with valid keyword
    Given I am on the TopDev search page
    When I enter "Java Developer" in search bar
    And I press the search button
    Then I should see at least 5 results
    Then I load all available results by clicking "Xem thêm" until it disappears
    And each result should contain "Java"
 
  # Scenario Outline: Search with edge cases
  #   When I search for "<input>"
  #   Then I should see "<expected>"
    
  #   Examples:
  #     | input          | expected                     |
  #     | ""             | all jobs or validation error |
  #     | " "            | all jobs or validation error |
  #     | "SQL"          | jobs with "SQL"              |
      
  # Scenario: Search with special characters
  #   Given I am on the TopDev search page
  #   When I search for "QA/QC Engineer"
  #   Then I should see at least 1 job listing

  # Scenario: Empty search
  #   Given I am on the TopDev search page
  #   When I search for an empty string
  #   Then I should see a validation error message
  
  # Scenario: Search with invalid keyword
  #   Given I am on the TopDev search page
  #   When I search for "#@!"
  #   Then I should see "Oops! Không tìm thấy công việc @! phù hợp"