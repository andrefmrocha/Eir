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
DROP TABLE IF EXISTS PlaceLocation;
CREATE TABLE PlaceLocation(
  id INTEGER PRIMARY KEY,
  country VARCHAR(2) NOT NULL,
  region VARCHAR NOT NULL,
  city VARCHAR,
  address VARCHAR,
  latitude REAL,
  longitude REAL
);
DROP TABLE IF EXISTS Place;
CREATE TABLE Place (
  id INTEGER PRIMARY KEY,
  title VARCHAR NOT NULL,
  place_owner INTEGER REFERENCES User(id) NOT NULL,
  price_per_day REAL NOT NULL,
  small_description VARCHAR,
  big_description VARCHAR,
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
INSERT INTO PlaceLocation(id, country, city, region, address)
VALUES
  (
    1,
    'PT',
    'Lisboa',
    'Lisbon Metro',
    'Av. Forças Armadas 32'
  ),
  (
    2,
    'PT',
    'Mem Martins',
    'Lisbon Metro',
    'R. Germana Tânger 107 3C'
  ),
  (
    3,
    'PT',
    'Vila Nova',
    'Terceira Island, Azores',
    'R Refugo 44'
  ),
  (
    4,
    'ES',
    'Morga',
    'Biscay',
    'c/ Valadouro 26'
  ),
  (
    5,
    'ES',
    'San Sadurniño',
    'A Coruña',
    'c/ Quevedo 52'
  ),
  (
    6,
    'DK',
    'København V',
    'Copenhagen Metro',
    'Verstergade 65'
  );
INSERT INTO Place(
    id,
    title,
    place_owner,
    price_per_day,
    small_description,
    place_location
  )
VALUES
  (
    1,
    'City Living Lisbon',
    8,
    145.5,
    'Enjoy the best stay in Lisbon with our modern apartment. Recently refurbished, it has all the conveniences you need, such as WiFi, an Espresso machine, heating and AC, and much more, and is in a central location with great public transport accessibility.',
    1
  ),
  (
    2,
    'The Jungle Book',
    6,
    23.5,
    'Located on an old abandoned factory in a run-down suburb, you wouldn''t expect a hostel to win a Best Hostel in Portugal for three years in a row, but here we are. We have the best environment for the energetic traveler such as yourself, so come join us. We have community dinner every night and offer free transfers for a night out in the city.',
    2
  ),
  (
    3,
    'Island Retreat',
    5,
    70.0,
    'Experience the best of atlantic nature in the beautify Azores. Our traditional Azorean house provides you with a authentic experience, and you can use it as a base to explore Terceira island. Breakfast delivery included for an extra €8.5/person/day fee.',
    3
  ),
  (
    4,
    'Basque Experience',
    4,
    140.0,
    'Explore the traditional Biscay villages, the land, the sea and the fishers, the gastronomy, and everything else the Basque Country has to offer you, and stay at our appartment.',
    4
  ),
  (
    5,
    'Galician Experience',
    4,
    92.90,
    'Explore the traditional Galician villages, the land, the sea and the fishers, the gastronomy, and everything else this Spanish region has to offer  you, and stay at our contry house.',
    5
  ),
  (
    6,
    'City Living Copenhagen',
    8,
    230.0,
    'Enjoy the best stay in Copenhagen with our modern apartment. Recently refurbished, it has all the conveniences you need, such as WiFi, an Espresso machine, heating and AC, and much more, and is in a central location with great public transport accessibility.',
    6
  );
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
