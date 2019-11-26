<?php
function drawMainPage()
{

    ?>
    <section id="signup-section">
        <img id="signup-img" src="../assets/house.jpg" alt="Beautiful House">
        <span class="card">
            <form action="list_houses.php" method="get">
                <div>
                    <label for="full-name">
                        Full Name
                        <input name="full-name" id="full-name" type="text">
                    </label>
                </div>
                <div>
                    <label for="form-email">
                        Email
                        <input name="form-email" id="form-email" type="text">
                    </label>
                </div>
                <div>
                    <label for="password">
                        Password
                        <input name="password" id="password" type="password">
                    </label>
                </div>
                <div>
                    <label for="confirm-password">
                        Confirm Password
                        <input name="confirm-password" id="confirm-password" type="password">
                    </label>
                </div>
                <div class="two-inputs">
                    <label for="birthday">
                        Birthday
                        <input name="birthday" id="birthday" type="date">
                    </label>
                    <label for="country">
                        Country
                        <input name="country" id="country" type="text">
                    </label>
                </div>
                <div>
                    <input id="submit" type="submit" value="Sign Up">
                </div>
                <p>
                    Alread have an account? <a href="#">Log in</a>
                </p>
            </form>
        </span>
    </section>

<?php }

include_once('../templates/common.php');
drawHeader(['../js/main_page.js']);
drawMainPage();
drawFooter();
?>