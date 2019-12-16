<?php
function drawPageBody()
{
    ?>
    <section id="user-details" class="user-form profile">
        <img id="profile-img" src="../assets/login-house.jpg" alt="Pool House">
        <span class="card profile">
            <section class="profile-picture">
                <img class="profile-leaf" src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
                <div>
                </div>
                <img class="profile-leaf" src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
            </section>
            <p id="full-name"></p>
            <section id="country">
                <i class="fas fa-flag"></i>
                <span></span>
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
drawHeader(['../js/view_profile.js'], ['../styles/view_profile.css', '../styles/profile.css']);
drawPageBody();
drawFooter();
?>
