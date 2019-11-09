<?php
function drawMainPage()
{

    ?>
    <section id="mainpage-section">
        <img id="mainpage-img" src="../assets/house.jpg" alt="Beautiful House">
        <span class="card">
            <div>
                Find <h6> the place </h6> to stay that best suits your <h6> personality </h6>
            </div>
            <form action="list_houses.php" method="GET">
                <div>
                    <label for="country">
                        Country
                        <input id="country" type="text">
                    </label>
                </div>
                <div>
                    <label for="city">
                        City
                        <input id="city" type="text">
                    </label>
                </div>
                <div id="dates">
                    <label for="check-in">
                        Check In
                        <input id="check-in" type="date">
                    </label>
                    <label for="check-out">
                        Check Out
                        <input id="check-out" type="date">
                    </label>
                </div>
                <div>
                    <label for="people">
                        People
                        <input id="people" type="number">
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
drawHeader();
drawMainPage();
drawFooter();
?>