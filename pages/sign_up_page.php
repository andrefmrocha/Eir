<?php
function drawMainPage()
{

    ?>
    <section id="signup-section">
        <img id="signup-img" src="../assets/login-house.jpg" alt="Beautiful House">
        <span class="card">
            <form action="list_houses.php" method="get">
                <div>
                    <label for="full-name">
                        Full Name
                        <input name="full-name" id="full-name" type="text">
                    </label>
                    <span id="fullname-input" class="form-error">**</span>
                </div>
                <div>
                    <label for="form-email">
                        Email
                        <input name="form-email" id="form-email" type="text">
                    </label>
                    <span id="email-input" class="form-error">**</span>
                </div>
                <div>
                    <label for="password">
                        Password
                        <input name="password" id="password" type="password">
                    </label>
                    <span id="password-input" class="form-error">**</span>
                </div>
                <div>
                    <label for="confirm-password">
                        Confirm Password
                        <input name="confirm-password" id="confirm-password" type="password">
                    </label>
                    <span id="confirm-password-input" class="form-error">**</span>
                </div>
                <div class="two-inputs">
                    <div>
                        <label for="birthday">
                            Birthday
                            <input name="birthday" id="birthday" type="date">
                        </label>
                        <span id="birthday-input" class="form-error">**</span>
                    </div>
                    <div>
                        <label for="country">
                            Country
                            <input name="country" id="country" type="text">
                        </label>
                        <span id="country-input" class="form-error">**</span>
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
                    Alread have an account? <a href="login_page.php">Log in</a>
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