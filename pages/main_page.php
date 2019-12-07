<?php
function drawMainPage()
{

    ?>
    <section id="form-section">
        <img id="mainpage-img" src="../assets/house.jpg" alt="Beautiful House">
        <span class="card">
            <div>
                Find <h6> the place </h6> to stay that best suits your <h6> personality </h6>
            </div>
            <form action="list_houses.php" method="get">
                <div>
                    <label for="country">
                        Country
                        <input name="country" id="country" type="text">
                    </label>
                </div>
                <div>
                    <label for="city">
                        City
                        <input name="city" id="city" type="text">
                    </label>
                </div>
                <div id="dates">
                    <label for="check-in">
                        Check In
                        <input name="checkin" id="check-in" type="date">
                    </label>
                    <label for="check-out">
                        Check Out
                        <input name="checkout" id="check-out" type="date">
                    </label>
                </div>
                <div>
                    <label for="people">
                        People
                        <input name="people" id="people" type="number">
                    </label>
                </div>
                <p id="date-input" class="form-error">* checkin must be before checkout.</p>
                <p id="people-input" class="form-error">* number of people must be a positive number</p>
                <div>
                    <input id="submit" type="submit" value="Search">
                </div>
            </form>
        </span>
    </section>

<?php }

include_once('../templates/common.php');
drawHeader(['../js/main_page.js'], []);
drawMainPage();
drawFooter();
?>