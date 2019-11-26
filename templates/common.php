<?php
function drawHeader()
{ ?>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/js/houses.js" type="module"></script>
        <script src="/js/hamburguer.js" type="module"></script>
        <link href="styles/style.css" rel="stylesheet">
        <link href="styles/responsive.css" rel="stylesheet">
        <title>Eir</title>
    </head>

    <body>
        <nav>
            <a href="/">
                <img src="assets/logo.svg" alt="Eir logo">
            </a>
            <div>☰</div>
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
                    <input id="email" type="text" placeholder="Email Address">
                    <input id="subscribe" type="submit" value="Subscribe">
                </li>
            </ul>
        </footer>

        <body>

    </html>
<?php } ?>


<?php
function drawMainPage()
{

    ?>
    <section id="mainpage-section">
        <img id="mainpage-img" src="assets/house.jpg" alt="Beautiful House">
        <span class="card">
            <div>
                Find <h6> the place </h6> to stay that best suits your <h6> personality </h6>
            </div>
            <form action="pages/list-houses.php" method="GET">
                <div>
                    <label for="country">
                        Country
                        <input id="country" type="text">
                    </label>
                </div>
                <div>
                    <label for="city">
                        City
                        <input id="city" type="text">
                    </label>
                </div>
                <div id="dates">
                    <label for="check-in">
                        Check In
                        <input id="check-in" type="date">
                    </label>
                    <label for="check-out">
                        Check Out
                        <input id="check-out" type="date">
                    </label>
                </div>
                <div>
                    <label for="people">
                        People
                        <input id="people" type="number">
                    </label>
                </div>
                <div>
                    <input id="submit" type="submit" value="Search">
                </div>
            </form>
        </span>
    </section>

<?php } ?>