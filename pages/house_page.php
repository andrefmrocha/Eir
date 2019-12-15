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
                <img src="" alt="House owner" class="photo-avatar" />
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
                        <span id="checkin-checkout-input" class="form-error">**</span>
                    </div>
                    <div>
                        <label for="people">
                            People
                            <input name="people" id="people" type="number">
                        </label>
                        <span id="people-input" class="form-error">**</span>
                    </div>
                    <div>
                        <input id="csrf" type="hidden" name="csrf" value=<?=$_SESSION['csrf']?>>
                    </div>
                    <div>
                        <p>
                            Total:
                            <strong>
                                0
                            </strong>
                        </p>
                        <p>
                            <strong></strong>
                            <i class="fas fa-money-bill-wave"></i>
                        </p>
                    </div>
                    <div>
                        <label for="submit">
                            <input name="submit" id="people" type="submit" value="Make Reservation">
                        </label>
                    </div>
                    <p id="num-people" class="form-error">* Exceeded number of guests!</p>
                    <p id="invalid-dates" class="form-error">* Invalid dates</p>
                    <p id="server-error" class="form-error">* An error has ocurred, please try again later</p>
                    <p id="login-error" class="form-error">* Please Log In Before Making a Reservation</p>
                    <p id="required-input" class="form-error">** Field is required</p>
                </form>
            </article>
            <article id="google-maps">
            </article>
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
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_H2rJ_UoIMyraXQLybpu1GPwhXd5lKMw"
             defer></script>
        </section>
    </div>
<?php
}

include_once('../templates/common.php');
drawHeader([
    '../js/house_page.js',
], [
    '../styles/calendar.css',
    '../styles/house_page.css'
]);
getTouristHousePage();
drawFooter();
?>