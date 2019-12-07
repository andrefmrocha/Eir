<?php
    function storeUserPhoto(){
        print_r($_FILES['photo']);
        // error_log("Yikes $var");
        $original = imagecreatefromjpeg($_FILES['photo']['tmp_name']);

        $width = imagesx($original);
        $height = imagesy($original);

        $square = min($width, $height);

        $photo = imagecreatetruecolor(400, 400);

        imagecopyresized($photo, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 400, 400, $square, $square);

        $photo_id = uniqid();
        imagejpeg($photo, "../assets/user_photos/eir_$photo_id.jpg");
        return $photo_id;
    }


    // TO-DO Implement resizing
    function storePLacePhoto($photo){
        $original = imagecreatefromjpeg($_FILES['profile-picture']['tmp_name']);

        $width = imagesx($original);
        $height = imagesy($original);

        $square = min($width, $height);

        $photo = imagecreatetruecolor(1600, 900);

        imagecopyresized($photo, $original, 0, 0, ($width>$square)?($width-$square)/2:0, ($height>$square)?($height-$square)/2:0, 400, 400, $square, $square);

        $photo_id = uniqid();
        imagejpeg($photo, "../assets/place_photos/eir_$photo_id.jpg");
        return $photo_id;
    }