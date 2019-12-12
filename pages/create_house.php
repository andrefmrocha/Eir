<?php

function getTouristHousePage()
{ ?>
    <div id="house-page" class="editable">
        <section id="house-title">
            <div id="house-description">
                <input id="title">
                </input>
            </div>
            <aside>
                <img src="" alt="House owner" class="photo-avatar" />
                <span>
                </span>
            </aside>
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
                <textarea></textarea>
                <div>Price:<input id="price"><i class="fas fa-money-bill-wave" aria-hidden="true"></i></div>
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
                        <input type="number" id="max-guest-number">
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