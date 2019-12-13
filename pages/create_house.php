<?php

function getTouristHousePage()
{ ?>
    <div id="house-page" class="editable">
        <section id="house-title">
            <div id="house-description">
                <input id="title" placeholder="Please insert a title">
                </input>
            </div>
        </section>
        <section id="carousel" class="owner-view">
            <div class="add-new-photo">
                <label for="new-photo"><i class="fas fa-plus" aria-hidden="true"></i></label>
                <input id="new-photo" name="new-photo" type="file">
            </div>
        </section>
        <section id="house-information">
            <article id="description">
                <h2 class="title">
                    Description
                </h2>
                <textarea placeholder="Add your house description here"></textarea>
                <div>Price:
                    <input id="price" placeholder="House Price">
                    <i class="fas fa-money-bill-wave" aria-hidden="true"></i>
                </div>
            </article>
            <aside>
                <h2 class="title">
                    Information
                </h2>
                <div>
                    <span>
                        <i class="fas fa-lg fa-home" aria-hidden="true"></i>
                        <select id="house-types">
                        </select>
                    </span>
                    <span>
                        <i class="fas fa-lg fa-bed" aria-hidden="true"></i>
                        <input type="number" id="max-guest-number" placeholder="Number of guests">
                    </span>
                    <div class="select">
                        <i class="fas fa-plus" aria-hidden="true"></i>
                        <select id="house-tags">
                        </select>
                    </div>
                </div>
            </aside>

            <article id="google-maps">
            </article>
            <div id="submit" class="button">Submit</div>
            <p id="house-error" class="form-error">Please leave no field empty</p>
            <p id="house-numbers-error" class="form-error">Price and Number of Guests must be a number greater than 0</p>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_H2rJ_UoIMyraXQLybpu1GPwhXd5lKMw" defer></script>
        </section>
    </div>
<?php
}

include_once('../templates/common.php');
drawHeader([
    '../js/create_house.js',
], [
    '../styles/house_page.css'
]);
getTouristHousePage();
drawFooter();
?>