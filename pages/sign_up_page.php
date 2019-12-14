<?php
function drawMainPage()
{

    ?>
    <section id="form-section" class="user-form">
        <img id="signup-img" src="../assets/login-house.jpg" alt="Beautiful House">
        <span class="card signin">
            <form action="list_houses.php" method="get">
                <div>
                    <label for="full-name">
                        Full Name
                        <span id="fullname-input" class="form-error">**</span>
                        <input name="full-name" id="full-name" type="text">
                    </label>
                </div>
                <div>
                    <label for="form-email">
                        Email
                        <span id="email-input" class="form-error">**</span>
                        <input name="form-email" id="form-email" type="text">
                    </label>
                </div>
                <div>
                    <label for="password">
                        Password
                        <span id="password-input" class="form-error">**</span>
                        <input name="password" id="password" type="password">
                    </label>
                </div>
                <div>
                    <label for="confirm-password">
                        Confirm Password
                        <span id="confirm-password-input" class="form-error">**</span>
                        <input name="confirm-password" id="confirm-password" type="password">
                    </label>
                </div>
                <div class="two-inputs">
                    <div>
                        <label for="birthday">
                            Birthday
                            <span id="birthday-input" class="form-error">**</span>
                            <input name="birthday" id="birthday" type="date">
                        </label>
                    </div>
                    <div>
                        <label for="country">
                            Country
                            <span id="country-input" class="form-error">**</span>                    
                            <input name="country" id="country" type="text">
                        </label>
                    </div>
                </div>
                <p id="valid-email-input" class="form-error">* Please insert a valid email</p>
                <p id="password-match-input" class="form-error">* Passwords must match</p>
                <p id="register-email-input" class="form-error">* Email is already registed!</p>
                <p id="required-input" class="form-error">** Field is required</p>
                <div>
                    <input id="submit" type="submit" value="Sign Up">
                </div>
                <p>
                    Alread have an account? <strong href="login_page.php">Log in</strong>
                </p>
            </form>
        </span>
    </section>

<?php }

include_once('../templates/common.php');
include_once('../templates/on_logged_in.php');
drawHeader(['../js/signup_page.js']);
drawMainPage();
drawFooter();
?>