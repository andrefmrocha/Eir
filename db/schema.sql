DROP TABLE IF EXISTS User;
CREATE TABLE User (
  id INTEGER PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  username VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR,
  country VARCHAR(2),
  bio VARCHAR
);
DROP TABLE IF EXISTS Tag;
CREATE TABLE Tag (
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL
);
DROP TABLE IF EXISTS PlaceType;
CREATE TABLE PlaceType (
  id INTEGER PRIMARY KEY,
  name VARCHAR NOT NULL
);
DROP TABLE IF EXISTS Region;
CREATE TABLE Region (
  id INTEGER PRIMARY KEY,
  country VARCHAR(2) NOT NULL,
  name VARCHAR NOT NULL,
  UNIQUE(country, name)
);
DROP TABLE IF EXISTS City;
CREATE TABLE City (
  id INTEGER PRIMARY KEY,
  region INTEGER REFERENCES Region(id) NOT NULL,
  name VARCHAR NOT NULL,
  UNIQUE(region, name)
);
DROP TABLE IF EXISTS PlaceLocation;
CREATE TABLE PlaceLocation(
  id INTEGER PRIMARY KEY,
  city INTEGER REFERENCES City(id) NOT NULL,
  address VARCHAR,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
);
DROP TABLE IF EXISTS Place;
CREATE TABLE Place (
  id INTEGER PRIMARY KEY,
  title VARCHAR NOT NULL,
  type INTEGER REFERENCES PlaceType(id),
  place_owner INTEGER REFERENCES User(id) NOT NULL,
  price_per_day REAL NOT NULL,
  max_guest_number INTEGER NOT NULL,
  description VARCHAR,
  place_location INT REFERENCES PlaceLocation(id) NOT NULL
);
DROP TABLE IF EXISTS Rental;
CREATE TABLE Rental (
  id INTEGER PRIMARY KEY,
  guest INTEGER REFERENCES User(id) NOT NULL,
  place INTEGER REFERENCES Place(id) NOT NULL,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  UNIQUE(place, checkin),
  UNIQUE(place, checkout),
  CHECK (checkin < checkout)
);
DROP TABLE IF EXISTS PlaceTag;
CREATE TABLE PlaceTag (
  place INTEGER REFERENCES Place(id),
  tag INTEGER REFERENCES Tag(id),
  PRIMARY KEY(place, tag)
);
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
    username,
    country,
    full_name,
    bio
  )
VALUES
  (
    1,
    'joaonmatos@gmail.com',
    '$2y$10$UxNzXmQyBMHndxhAQ7aBb.l4YkL.k / dfiIvOlYWLVkVWgbifb7bcC',
    'joaonmatos',
    'PT',
    'João Matos',
    NULL
  ),
  (
    2,
    'brendinhacorreia@gmx.br',
    '$2y$10$QA8fSnV6vHzD14LW65KISuXt3oDiilExT1w / 5gRdLUn9kBhPeQPn2',
    'bcorreia',
    'BR',
    'Brenda Correia',
    'Traveller, lifestyle influencer, proud mom to two babies. I am a super quiet guest and can negotiate reviews for a discount.'
  ),
  (
    3,
    'acelinedegrasse@rhyta.com',
    '$2y$10$0pbyO5DVZFLHh898P3Os5OA5mWkDqNb01v8fpMC2KijanWH3CiG3K',
    'catine',
    NULL,
    'Aceline DeGrasse',
    'Cat lover, loves culture. J''aime la France.'
  ),
  (
    4,
    'acastellanosr@dayrep.com',
    '$2y$10$M1thHXdgVJZf.3HBllYsneW.j4StLC0wPfKHFYcEKoBN9DeNFcmTO',
    'Siabourged60',
    'ES',
    'A. Castellanos Roque',
    NULL
  ),
  (
    5,
    'CharlesAKessler@armyspy.com',
    '$2y$10$9gNV9rrAdi0DnlV8wMNPQ.pWV8qO7vYfG5Xrq71YPUR67BQ.IDDwy',
    'Paracouls',
    'US',
    NULL,
    'Loan officer from Michigan. Love nature.'
  ),
  (
    6,
    'gustavoap@live.com.pt',
    '$2y$10$BszOsIuPg9NkP71Ea5vZc.jVhOO221vC8qZ9AArJAo9CHGyHOo8da',
    'gustavoalmeida92',
    NULL,
    NULL,
    NULL
  ),
  (
    7,
    'fakeemail@illegibledomain.net',
    '$2y$10$l7R4lhaBAxp9wM0JHOA4x. / dzvFbdttnP.xtrFu4mrZ.KiW / 0Y.9G',
    'weirdusename',
    'UK',
    'Mary Jane, but actually a catfish',
    'Hey Cutie <3, following this there is usually a description of sexual acts the ''person'' implies they want to perform with the possible scam victim, or a link to a fake dating website'
  ),
  (
    8,
    'GuilhermeGomesPereira@dayrep.com',
    '$2y$10$V99fD / OM8Mmi86uLrFFpSuiemDDPVYeLoLGLs0uXiHgOFU / i6ml42',
    'guigocor',
    'BR',
    'Guilherme G. Pereira',
    'Serial entrepreneur. Originally from Campinas, SP, but now living in Lisbon. Carpe Diem.'
  ),
  (
    9,
    'alysatepas@jourrapide.com',
    '$2y$10$ / d5wqZ / 2M / ltWvH6O0Rtwu / T7bijoCC3nFUoPsgiCnj4G84RzpL9W',
    'copypastealysa',
    'BE',
    'Alysa te Pas',
    NULL
  );
INSERT INTO Region(id, country, name)
VALUES
  (1, 'PT', 'Lisbon Metropolitan Area'),
  (2, 'PT', 'Terceira Island, Azores'),
  (3, 'ES', 'Biscay, Basque Country'),
  (4, 'ES', 'A Coruña Province, Galicia'),
  (5, 'DK', 'Copenhagen Metro Area');
INSERT INTO City(id, region, name)
VALUES
  (1, 1, 'Lisboa'),
  (2, 1, 'Sintra'),
  (3, 2, 'Vila Nova'),
  (4, 3, 'Morga'),
  (5, 4, 'San Sadurniño'),
  (6, 5, 'København');
INSERT INTO PlaceLocation(id, city, address, latitude, longitude)
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
  );
INSERT INTO Place(
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
  );
INSERT INTO PlaceTag(place, tag)
VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 2),
  (3, 3),
  (6, 1);
INSERT INTO Rental(guest, place, checkin, checkout)
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
