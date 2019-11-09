<?php
include_once('../templates/common.php');
drawHeader();
?>
<section id="filters">
    <div>
        <ul>
            <li>
                House Types:
            </li>
            <li>
                <input id="hotels" type="checkbox">
                <label for="hotels">Hotels</label>
            </li>
            <li>
                <input id="apartments" type="checkbox">
                <label for="apartments">Apartments</label>
            </li>
            <li>
                <input id="beach-houses" type="checkbox">
                <label for="beach-houses">Beach Houses</label>
            </li>
            <li>
                <input id="vacation-homes" type="checkbox">
                <label for="vacation-homes">Vacation Homes</label>
            </li>
            <li>
                <input id="resorts" type="checkbox">
                <label for="resorts">Resorts</label>
            </li>
        </ul>
        <ul>
            <li>
                Popular Filters:
            </li>
            <li>
                <input id="baby-friendly" type="checkbox">
                <label for="baby-friendly">Baby Friendly</label>
            </li>
            <li>
                <input id="pet-friendly" type="checkbox">
                <label for="pet-friendly">Pet Friendly</label>
            </li>
            <li>
                <input id="breakfast-included" type="checkbox">
                <label for="breakfast-included">Breakfast Included</label>
            </li>
            <li>
                <input id="green-spaces" type="checkbox">
                <label for="green-spaces">Green Spaces</label>
            </li>
            <li>
                <input id="resorts" type="checkbox">
                <label for="resorts">Resorts</label>
            </li>
        </ul>
        <ul>
            <li>
                Price Range (per night):
            </li>
            <li>
                <input id="0-50" type="checkbox">
                <label for="0-50">0-50€</label>
            </li>
            <li>
                <input id="50-100" type="checkbox">
                <label for="50-100">50-100€</label>
            </li>
            <li>
                <input id="100-150" type="checkbox">
                <label for="100-150">100-150€</label>
            </li>
            <li>
                <input id="150-200" type="checkbox">
                <label for="150-200">150-200€</label>
            </li>
            <li>
                <input id="200-250" type="checkbox">
                <label for="200-250">200-250€</label>
            </li>
            <li>
                <input id="250-plus" type="checkbox">
                <label for="250-plug">+250€</label>
            </li>
        </ul>
        <ul>
            <li>
                Rating:
            </li>
            <li>
                <input id="1-star" type="checkbox">
                <label for="1-star">1 Star</label>
            </li>
            <li>
                <input id="2-star" type="checkbox">
                <label for="2-star">2 Stars</label>
            </li>
            <li>
                <input id="3-star" type="checkbox">
                <label for="3-star">3 Stars</label>
            </li>
            <li>
                <input id="4-star" type="checkbox">
                <label for="4-star">4 Stars</label>
            </li>
            <li>
                <input id="5-star" type="checkbox">
                <label for="5-star">5 Stars</label>
            </li>
        </ul>
        <ul>
            <li>
                Order by:
            </li>
            <li>
                <input id="popular" type="checkbox">
                <label for="popular">Popular</label>
            </li>
            <li>
                <input id="rating-lowest" type="checkbox">
                <label for="rating-lowest">Rating (lowest-to-highest)</label>
            </li>
            <li>
                <input id="rating-highest" type="checkbox">
                <label for="rating-highest">Rating (highest-to-lowest)</label>
            </li>
            <li>
                <input id="price-lowest" type="checkbox">
                <label for="price-lowest">Price (lowest-to-highest)</label>
            </li>
            <li>
                <input id="price-highest" type="checkbox">
                <label for="price-highest">Price (highest-to-lowest)</label>
            </li>
        </ul>
    </div>
</section>
<?php
drawFooter();
?>