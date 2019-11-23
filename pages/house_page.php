<?php

function getTouristHousePage()
{ ?>
    <div id="house-page">
        <section id="house-title">
            <div id="house-description">
                <h1>
                </h1>
                <h3>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>
                    </span>
                </h3>
            </div>
            <aside>
                <img src="" alt="House owner" class="photo-avatar"/>
                <span>
                </span>
            </aside>
        </section>
        <section id="carousel">
            <i class="fas fa-arrow-left"></i>
            <section id="photos-carousel">
            </section>
            <i class="fas fa-arrow-right"></i>
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