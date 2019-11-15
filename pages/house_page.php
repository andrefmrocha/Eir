<?php

function getTouristHousePage()
{ ?>
    <div id="house-page">
        <section id="photos-carousel">
        </section>
        <section id="house-information">
            <article id="description">
                <h2 class="title">
                    Description
                </h2>
            </article>
            <aside>
                <h2 class="title">
                    Information
                </h2>
            </aside>
            <article id="reviews">
                <span>
                    <h2 class="title">
                        Reviews
                    </h2>
                    <span>
                        <span>
                        </span>
                        <span>
                        </span>
                    </span>
                </span>
            </article>
            <article id="reserve" class="card">
                <h3>Make a reservation now</h3>
                <form action="#" method="post">
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
                </form>
            </article>
        </section>
    </div>
<?php
}

include_once('../templates/common.php');
drawHeader([
    '../js/house_page.js'
]);
getTouristHousePage();
drawFooter();
?>