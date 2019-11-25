<?php
function drawMainPage()
{

    ?>
    <section id="mainpage-section">
        <img id="mainpage-img" src="../assets/house.jpg" alt="Beautiful House">
        <span class="card">
            <div>
                Find <strong> the place </strong> to stay that best suits your <strong> personality </strong>.
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
                <div>
                    <input id="submit" type="submit" value="Search">
                </div>
            </form>
        </span>
    </section>

<?php }

include_once('../templates/common.php');
drawHeader([]);
drawMainPage();
drawFooter();
?>