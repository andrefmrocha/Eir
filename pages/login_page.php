<?php
function drawMainPage()
{

    ?>
    <section id="form-section"class="user-form">
        <img id="signup-img" src="../assets/login-house.jpg" alt="Beautiful House">
        <span class="card">
            <form action="list_houses.php" method="get">
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
                <p id="valid-email-input" class="form-error">* Please insert a valid email</p>
                <p id="wrong-password" class="form-error">* Wrong Password</p>
                <p id="user-not-found" class="form-error">* No user with that email found</p>
                <p id="required-input" class="form-error">** Field is required</p>
                <div>
                    <input id="submit" type="submit" value="Log In">
                </div>
                <p>
                    Don't have an account? <a href="sign_up_page.php">Sign in</a>
                </p>
            </form>
        </span>
    </section>

<?php }

include_once('../templates/common.php');
include_once('../templates/on_logged_in.php');
drawHeader(['../js/login_page.js'], []);
drawMainPage();
drawFooter();
?>