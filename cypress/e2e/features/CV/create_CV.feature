Feature: CV Creation on TopDev.vn  
  As a logged-in user  
  I want to create my CV  
  So that I can apply for jobs easily

  Background:
    Given I am on the CV creation page
    Then I click create CV button

  #Case: Điền thông tin cá nhân + Giới thiệu bản thân
  #Case: Có kinh nghiệm + chưa có kinh nghiệm
  #Case: Kỹ năng lập trình(1 kỹ năng) + Kỹ năng lập trình (nhiều hơn 1 kỹ năng)
  #Case: Học vấn (đã tốt nghiệp / đang học tại đây)

  # Scenario: Create CV with valid personal information
  #   When I fill in my full name as "All Fields"
  #   And I click start create button
  #   When I fill all my personal info from data set

  Scenario: Fill in only require fields to create CV
    When I create CV with names "Only required fields"
    And I click start create button
    When I fill Personal information section
    When I fill Programming skills section
    When I fill Education section
    And I click save CV
