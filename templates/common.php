<?php
function drawHeader($scripts)
{ ?>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/ac3e82986f.js" crossorigin="anonymous"></script>
        <script src="../js/hamburguer.js" type="module"></script>
        <?php foreach ($scripts as $script) { ?>
            <script src=<?= $script ?> type="module"></script>
        <?php } ?>
        <link href="../styles/style.css" rel="stylesheet">
        <link href="../styles/responsive.css" rel="stylesheet">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="icon" sizes="16x16 32x32 64x64" href="../assets/favicon/favicon.ico">
        <link rel="icon" type="image/png" sizes="196x196" href="../assets/favicon/favicon-192.png">
        <link rel="icon" type="image/png" sizes="160x160" href="../assets/favicon/favicon-160.png">
        <link rel="icon" type="image/png" sizes="96x96" href="../assets/favicon/favicon-96.png">
        <link rel="icon" type="image/png" sizes="64x64" href="../assets/favicon/favicon-64.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/favicon-32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon/favicon-16.png">
        <link rel="apple-touch-icon" href="../assets/favicon/favicon-57.png">
        <link rel="apple-touch-icon" sizes="114x114" href="../assets/favicon/favicon-114.png">
        <link rel="apple-touch-icon" sizes="72x72" href="../assets/favicon/favicon-72.png">
        <link rel="apple-touch-icon" sizes="144x144" href="../assets/favicon/favicon-144.png">
        <link rel="apple-touch-icon" sizes="60x60" href="../assets/favicon/favicon-60.png">
        <link rel="apple-touch-icon" sizes="120x120" href="../assets/favicon/favicon-120.png">
        <link rel="apple-touch-icon" sizes="76x76" href="../assets/favicon/favicon-76.png">
        <link rel="apple-touch-icon" sizes="152x152" href="../assets/favicon/favicon-152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/favicon-180.png">
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
        <meta name="msapplication-TileColor" content="#FFFFFF">
        <meta name="msapplication-TileImage" content="../assets/favicon/favicon-144.png">
        <meta name="msapplication-config" content="../assets/favicon/browserconfig.xml">
        <title>Eir</title>
    </head>

    <body>
        <nav>
            <a href="/">
                <img src="../assets/logo.svg" alt="Eir logo">
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