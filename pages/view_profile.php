<?php
function drawPageBody()
{
    ?>
    <section id="user-details" class="user-form profile">
        <img id="signup-img" src="../assets/login-house.jpg" alt="Beautiful House">
        <span class="card profile">
            <section>
                <img src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
                <div class="profile-picture">
                </div>
                <img src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
            </section>
            <p id="full-name"></p>
            <section id="country">
                <i class="fas fa-flag"></i>
                <p></p>
            </section>
            <section id="bio">
                <h3>About</h3>
                <p></p>
            </section>
        </span>
    </section>
    <section id="profile-carrousel">
        <h3>Reviews</h3>
        <div>
            <i class="fas fa-chevron-left"></i>
            <p>

            </p>
            <i class="fas fa-chevron-right"></i>
        </div>
    </section>
<?php }

include_once('../templates/common.php');
drawHeader(['../js/view_profile.js'], []);
drawPageBody();
drawFooter();
?>
