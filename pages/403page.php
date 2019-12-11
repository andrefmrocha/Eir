<?php
function drawErrorPage()
{
    ?>
    <section id="page403error-section">
        <img id="page403-img" src="../assets/prison-laurel.svg" alt="Prison Laurel"> 
            <p>
                <strong>403</strong> 
                Forbidden
            </p>
    </section>
<?php }
    include_once('../templates/common.php');
    drawHeader(['../js/main_page.js']);
    drawErrorPage();
    drawFooter();
?>