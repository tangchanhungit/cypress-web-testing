Feature: CV Creation on TopDev.vn  
  As a logged-in user  
  I want to create my CV  
  So that I can apply for jobs easily

  Background:
    Given I am on the CV creation page
    Then I click create CV button

  # Scenario: Create CV with valid personal information
  #   When I fill in my full name as "All Fields"
  #   And I click start create button
  #   When I fill all my personal info from data set

  Scenario: Fill in only require fields to create CV
    When I fill in my full name as "Only require fields"
    And I click start create button
    When I fill requires info from data set
