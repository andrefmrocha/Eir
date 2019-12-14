<?php
function drawErrorPage()
{
    ?>
    <section id="page404error-section">
        <div>
            <p>
                <strong>404</strong> 
                Page Not Found 
            </p>
        </div>
    </section>
<?php }
    include_once('../templates/common.php');
    drawHeader(['../js/main_page.js'], ['../styles/error_pages.css']);
    drawErrorPage();
    drawFooter();
?>