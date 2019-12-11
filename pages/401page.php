<?php
function drawErrorPage()
{
    ?>
    <section id="page401error-section">
        <img id="page401-img" src="../assets/prison-laurel.svg" alt="Prison Laurel"> 
            <p>
                <strong>401</strong> 
                Unauthorized
            </p>
    </section>
<?php }
    include_once('../templates/common.php');
    drawHeader(['../js/main_page.js']);
    drawErrorPage();
    drawFooter();
?>