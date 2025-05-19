Feature: User Sign Up

  As a user
  I want to be able to sign up for a new account
  So that I can access the application

  Scenario: Successful Sign Up with valid details
    Given I am on the sign up page
    When I enter the following details:
    And I agree to the terms and conditions
    # And I click the "Đăng ký" button
    # Then I should be redirected to the dashboard
    # And I should see a welcome message

  Scenario: User does not select the hiring option
    Given I am on the sign up page
    When I enter the following details:
    And I click the "Công ty bạn đang có nhu cầu tuyển dụng không?"
    And I agree to the terms and conditions
    # And I click the "Đăng ký" button
    # Then I should be redirected to the dashboard

  Scenario: Sign Up with password mismatch error
    Given I am on the sign up page
    When I fill valid sign up form except confirm password is "test1234"
    And I agree to the terms and conditions
    And I click the "Đăng ký" button
    Then I should see an error message "Mật khẩu xác nhận không trùng khớp"



#   And I agree to the terms and conditions
#   And I click the "Đăng ký" button
#   Then I should see an error message "Mật khẩu không khớp"

# Scenario: Sign Up with empty fields
#   Given I am on the sign up page
#   When I leave the fields empty
#   And I click the "Đăng ký" button
#   Then I should see validation errors for the following fields:
#     | field     | message                         |
#     | fullname  | Vui lòng nhập tên đầy đủ         |
#     | email     | Vui lòng nhập email              |
#     | password  | Vui lòng nhập mật khẩu           |
#     | confirm_password | Vui lòng xác nhận mật khẩu    |

# Scenario: Sign Up with invalid email format
#   Given I am on the sign up page
#   When I enter the following details:
#     | fullname      | test user     |
#     | email         | invalid-email |
#     | password      | 12345678      |
#     | confirm_password | 12345678    |
#   And I agree to the terms and conditions
#   And I click the "Đăng ký" button
#   Then I should see an error message "Email không hợp lệ"
