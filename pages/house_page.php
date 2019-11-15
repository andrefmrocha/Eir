<?php

function getTouristHousePage()
{ ?>
    <div id="house-page">
        <section id="photos-carousel">
        </section>
        <section id="house-information">
            <article>
                <h2 class="title">
                    Description
                </h2>
            </article>
            <aside>
                <div class="title">
                    Information
                </div>
            </aside>
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