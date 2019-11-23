INSERT INTO PlaceType (id, name)
VALUES
  (1, 'Apartment'),
  (2, 'Beach House'),
  (3, 'Vacation House'),
  (4, 'Resort'),
  (5, 'Hostel'),
  (6, 'Hotel');
INSERT INTO Tag (id, name)
VALUES
  (1, 'Baby Friendly'),
  (2, 'Pet Friendly'),
  (3, 'Breakfast Included'),
  (4, 'Green Spaces');
INSERT INTO User (
    id,
    email,
    password_hash,
    birth_date,
    country,
    full_name,
    bio,
    photo
  )
VALUES
  (
    1,
    'joaonmatos@gmail.com',
    '$2y$10$UxNzXmQyBMHndxhAQ7aBb.l4YkL.k / dfiIvOlYWLVkVWgbifb7bcC',
    strftime('%s', '1999-11-15'),
    'PT',
    'João Matos',
    NULL,
    '5dc95ffc7a20e'
  ),
  (
    2,
    'brendinhacorreia@gmx.br',
    '$2y$10$QA8fSnV6vHzD14LW65KISuXt3oDiilExT1w / 5gRdLUn9kBhPeQPn2',
    strftime('%s', '1986-03-27'),
    'BR',
    'Brenda Correia',
    'Traveller, lifestyle influencer, proud mom to two babies. I am a super quiet guest and can negotiate reviews for a discount.',
    NULL
  ),
  (
    3,
    'acelinedegrasse@rhyta.com',
    '$2y$10$0pbyO5DVZFLHh898P3Os5OA5mWkDqNb01v8fpMC2KijanWH3CiG3K',
    strftime('%s', '1994-01-02'),
    NULL,
    'Aceline DeGrasse',
    'Cat lover, loves culture. J''aime la France.',
    NULL
  ),
  (
    4,
    'acastellanosr@dayrep.com',
    '$2y$10$M1thHXdgVJZf.3HBllYsneW.j4StLC0wPfKHFYcEKoBN9DeNFcmTO',
    strftime('%s', '1962-08-13'),
    'ES',
    'A. Castellanos Roque',
    NULL,
    NULL
  ),
  (
    5,
    'CharlesAKessler@armyspy.com',
    '$2y$10$9gNV9rrAdi0DnlV8wMNPQ.pWV8qO7vYfG5Xrq71YPUR67BQ.IDDwy',
    strftime('%s', '1974-04-25'),
    'US',
    'Charles Kessler',
    'Loan officer from Michigan. Love nature.',
    '5dc9608e33c1b'
  ),
  (
    6,
    'gustavoap@live.com.pt',
    '$2y$10$BszOsIuPg9NkP71Ea5vZc.jVhOO221vC8qZ9AArJAo9CHGyHOo8da',
    strftime('%s', '1988-06-23'),
    NULL,
    'Gustavo Almeida',
    NULL,
    NULL
  ),
  (
    7,
    'fakeemail@illegibledomain.net',
    '$2y$10$l7R4lhaBAxp9wM0JHOA4x. / dzvFbdttnP.xtrFu4mrZ.KiW / 0Y.9G',
    strftime('%s', '2000-01-01'),
    'UK',
    'A Catfish/Scammer',
    'Hey Cutie <3, following this there is usually a description of sexual acts the ''person'' implies they want to perform with the possible scam victim, or a link to a fake dating website',
    '5dc961ec5fa9e'
  ),
  (
    8,
    'GuilhermeGomesPereira@dayrep.com',
    '$2y$10$V99fD / OM8Mmi86uLrFFpSuiemDDPVYeLoLGLs0uXiHgOFU / i6ml42',
    strftime('%s', '1969-02-10'),
    'BR',
    'Guilherme G. Pereira',
    'Serial entrepreneur. Originally from Campinas, SP, but now living in Lisbon. Carpe Diem.',
    NULL
  ),
  (
    9,
    'alysatepas@jourrapide.com',
    '$2y$10$ / d5wqZ / 2M / ltWvH6O0Rtwu / T7bijoCC3nFUoPsgiCnj4G84RzpL9W',
    strftime('%s', '1982-07-12'),
    'BE',
    'Alysa te Pas',
    NULL,
    '5dc9621423a8a'
  );
INSERT INTO Region (id, country, name)
VALUES
  (1, 'PT', 'Lisbon Metropolitan Area'),
  (2, 'PT', 'Terceira Island, Azores'),
  (3, 'ES', 'Biscay, Basque Country'),
  (4, 'ES', 'A Coruña Province, Galicia'),
  (5, 'DK', 'Copenhagen Metro Area'),
  (6, 'US', 'New York');
INSERT INTO City (id, region, name)
VALUES
  (1, 1, 'Lisboa'),
  (2, 1, 'Sintra'),
  (3, 2, 'Vila Nova'),
  (4, 3, 'Morga'),
  (5, 4, 'San Sadurniño'),
  (6, 5, 'København'),
  (7, 6, 'New York');
INSERT INTO PlaceLocation (id, city, address, latitude, longitude)
VALUES
  (
    1,
    1,
    'Av. Forças Armadas 22',
    38.748188,
    -9.150062
  ),
  (
    2,
    2,
    'R. Germana Tânger 107, 3C',
    38.818438,
    -9.383188
  ),
  (
    3,
    3,
    'R. do Passo 27',
    38.782293,
    -27.149776
  ),
  (
    4,
    4,
    'Morgakoene Auzoa, 19B',
    43.300438,
    -2.750312
  ),
  (
    5,
    5,
    'Agra Abaixo, 8',
    43.537063,
    -8.070562
  ),
  (
    6,
    6,
    'Verstergade 39',
    55.676687,
    12.568813
  ),
  (
    7,
    7,
    '510 East 6th Street',
    40.725088,
    -73.983283
  );
INSERT INTO Place (
    id,
    title,
    type,
    place_owner,
    price_per_day,
    max_guest_number,
    description,
    place_location
  )
VALUES
  (
    1,
    'City Living Lisbon',
    1,
    8,
    145.5,
    4,
    'Enjoy the best stay in Lisbon with our modern apartment. Recently refurbished, it has all the conveniences you need, such as WiFi, an Espresso machine, heating and AC, and much more, and is in a central location with great public transport accessibility.',
    1
  ),
  (
    2,
    'The Jungle Book',
    5,
    6,
    23.5,
    18,
    'Located on an old abandoned factory in a run-down suburb, you wouldn''t expect a hostel to win a Best Hostel in Portugal for three years in a row, but here we are. We have the best environment for the energetic traveler such as yourself, so come join us. We have community dinner every night and offer free transfers for a night out in the city.',
    2
  ),
  (
    3,
    'Island Retreat',
    3,
    5,
    70.0,
    2,
    'Experience the best of atlantic nature in the beautify Azores. Our traditional Azorean house provides you with a authentic experience, and you can use it as a base to explore Terceira island. Breakfast delivery included for an extra €8.5/person/day fee.',
    3
  ),
  (
    4,
    ' Basque Experience ',
    3,
    4,
    140.0,
    6,
    'Explore the traditional Biscay villages, the land, the sea and the fishers, the gastronomy, and everything else the Basque Country has to offer you, and stay at our appartment.',
    4
  ),
  (
    5,
    ' Galician Experience ',
    3,
    4,
    92.90,
    4,
    ' Explore the traditional Galician villages, the land, the sea and the fishers, the gastronomy, and everything else this Spanish region has to  offer you, and stay at our contry house.',
    5
  ),
  (
    6,
    ' City Living Copenhagen ',
    1,
    8,
    230.0,
    2,
    ' Enjoy the best stay in Copenhagen with our modern apartment.Recently refurbished, it has all the conveniences you need, such as WiFi, an Espresso machine, heating and AC, and much more, and is in a central location with great public transport accessibility.',
    6
  ),
  (
    7,
    'Luxury Flats NYC',
    1,
    5,
    230.0,
    5,
    'In the East Village district of New York, close to NYU - New York University, Luxury Flats NYC has free WiFi and washing machine. This appartment has accomodations with a balcony.' || char(10) || 'The appartment is composed of 3 separate bedrooms, a living room, a fully equiped kitchen with a dishwasher and oven, and 3 bathrooms. A TV is available.' || char(10) || 'Bloomingdales is 1.8 km from the apartement, while Flatiron Building is 1.9 km from the property. The nearest airport is LaGuardia Airport, 14.5 km from Luxury Flats NYC.' || char(10) || 'East Village is a great choice for travellers interested in food, restaurants and culture',
    7
  );
INSERT INTO PlaceTag (place, tag)
VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 2),
  (3, 3),
  (6, 1);
INSERT INTO Rental (guest, place, checkin, checkout)
VALUES
  (
    2,
    1,
    strftime('%s', '2019-12-13'),
    strftime('%s', '2019-12-16')
  ),
  (
    1,
    6,
    strftime('%s', '2019-11-14'),
    strftime('%s', '2019-11-16')
  ),
  (
    9,
    3,
    strftime('%s', '2020-02-01'),
    strftime('%s', '2020-02-09')
  ),
  (
    5,
    4,
    strftime('%s', '2019-12-21'),
    strftime('%s', '2019-12-27')
  ),
  (
    6,
    6,
    strftime('%s', '2019-11-16'),
    strftime('%s', '2019-11-19')
  ),
  (
    3,
    5,
    strftime('%s', '2020-01-04'),
    strftime('%s', '2020-01-07')
  );
INSERT INTO Rating (place, rating, comment)
VALUES
  (1, 3, 'Good place but lacked space'),
  (1, 5, 'Best Place on Earth!'),
  (2, 4, 'Had fun.'),
  (
    3,
    3,
    'Should have expected an island to be this humid'
  ),
  (4, 5, 'Interesting experience!'),
  (5, 5, 'Interesting experience!'),
  (6, 5, 'Loved the place!');
INSERT INTO PlacePhoto (place, author, resource_id)
VALUES
  (1, 4, '5dc959eea7d5f'),
  (2, 6, '5dc959efbd9c7'),
  (3, 5, '5dc959f080098'),
  (4, 4, '5dc959f207b24'),
  (5, 4, '5dc959f2bb151'),
  (6, 8, '5dc959f41a10c'),
  (7, 5, '5dd291670d21f'),
  (7, 5, '5dd2919bd1e59'),
  (7, 5, '5dd291b456a1a'),
  (7, 5, '5dd291d7395d2'),
  (7, 5, '5dd29204b2273'),
  (7, 5, '5dd2921e5a591'),
  (7, 5, '5dd2923c89025'),
  (1, 4, '5dd94c9056d22'),
  (1, 4, '5dd94ce8b087c'),
  (1, 2, '5dd94cd89d11b');
