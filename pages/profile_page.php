<?php
function drawMainPage()
{

    ?>
    <section id="form-section" class="user-form profile">
        <img id="profile-img" src="../assets/profile.jpg" alt="Pool House">
        <span class="card profile">
            <form action="#" method="get" enctype="multipart/form-data">
                <section>
                    <img src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
                    <div class="image-upload">
                        <label for="profile-picture">
                            <img src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" />
                        </label>
                        <input id="profile-picture" name="profile-picture" type="file" alt="Profile picture" />
                    </div>
                    <img src="../assets/profile-leaf.svg" alt="Profile ornament left leaf" />
                </section>
                <div>
                    <label for="full-name">
                        Full Name
                        <span id="fullname-input" class="form-error">**</span>
                        <input name="full-name" id="full-name" type="text">
                    </label>
                </div>
                <div>
                    <label for="form-email">
                        Email
                        <span id="email-input" class="form-error">**</span>
                        <input name="form-email" id="form-email" type="text">
                    </label>
                </div>
                <div>
                    <label for="password">
                        New Password
                        <span id="password-input" class="form-error">**</span>
                        <input name="password" id="password" type="password">
                    </label>
                </div>
                <div>
                    <label for="confirm-password">
                        Confirm New Password
                        <span id="confirm-password-input" class="form-error">**</span>
                        <input name="confirm-password" id="confirm-password" type="password">
                    </label>
                </div>
                <div class="two-inputs">
                    <div>
                        <label for="birthday">
                            Birthday
                            <span id="birthday-input" class="form-error">**</span>
                            <input name="birthday" id="birthday" type="date">
                        </label>
                    </div>
                    <div>
                        <label for="country">
                            Country
                            <span id="country-input" class="form-error">**</span>
                            <input name="country" id="country" type="text">
                        </label>
                    </div>
                </div>
                <div>
                    <label for="description">
                        Description
                        <div>
                        <textarea name="description" id="description" rows="5" cols="40" type="textarea">
                        </textarea>
                        <span id="description-input" class="form-error">**</span>
                        </div>
                    </label>
                </div>
                <p id="valid-email-input" class="form-error">* Please insert a valid email</p>
                <p id="password-match-input" class="form-error">* Passwords must match</p>
                <p id="register-email-input" class="form-error">* Email is already registed!</p>
                <p id="required-input" class="form-error">** Field is required</p>
                <div>
                    <input id="submit" type="submit" value="Update">
                </div>
            </form>
        </span>
    </section>
    <section id="rentals-history">
        <h3>History</h3>
        <div>
            <i class="fas fa-chevron-left"></i>
            <p>

            </p>
            <i class="fas fa-chevron-right"></i>
        </div>
    </section>

<?php }

include_once('../templates/common.php');
drawHeader(['../js/profile_page.js']);
drawMainPage();
drawFooter();
?>