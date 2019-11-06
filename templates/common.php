<?php
function drawHeader()
{ ?>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/js/houses.js" type="module"></script>
        <link href="styles/style.css" rel="stylesheet">
        <title>Eir</title>
    </head>

    <body>
        <nav>
            <img src="assets/logo.svg" alt="Eir logo">
            <ul>
                <li>
                    <a href="#">Owner</a>
                </li>
                <li>
                    <a href="#">Eur €</a>
                </li>
                <li>
                    <a href="#">Log In</a>
                </li>
                <li>
                    <a href="#">Sign Up</a>
                </li>
            </ul>
        </nav>
    <?php }
    ?>

    <?php
    function drawFooter()
    { ?>
        <footer> 
            <ul>
                <li>
                    Contacts
                </li>
                <li>
                    +351 232 678 903
                </li>
                <li>
                    eir@eir.com
                </li>
            </ul>
            <ul>
                <li>
                    Customer Service
                </li>
                <li>
                    Ordering & Payment
                </li>
                <li>
                    Cancelling
                </li>
                <li>
                    FAQ
                </li>
            </ul>
            <ul>
                <li>
                    Information Service
                </li>
                <li>
                    Careers
                </li>
                <li>
                    Privacy Policy
                </li>
                <li>
                    Terms & Conditions
                </li>
            </ul>
            <ul>
                <li>
                    Subscribe to EIR via Email
                </li>
                <li>
                    Get the latestes offers and promotions right away
                </li>
                <li>
                    <input id="email"type="text" placeholder="Email Address">
                    <input id="subscribe" type="submit" value="Subscribe">
                </li>
            </ul>
        </footer>
        <body>

    </html>
<?php } ?>
