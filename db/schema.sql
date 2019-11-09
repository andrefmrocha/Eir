DROP TABLE IF EXISTS User;
CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  username VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR,
  country VARCHAR(2),
  bio VARCHAR
);
DROP TABLE IF EXISTS PlaceLocation;
CREATE TABLE PlaceLocation(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country VARCHAR(2) NOT NULL,
  city VARCHAR,
  address VARCHAR,
  latitude REAL,
  longitude REAL
);
DROP TABLE IF EXISTS Place;
CREATE TABLE Place (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR NOT NULL,
  place_owner INTEGER REFERENCES User(id) NOT NULL,
  price_per_day REAL NOT NULL,
  description VARCHAR,
  country VARCHAR(2) NOT NULL,
  city place_location INT REFERENCES PlaceLocation(id) NOT NULL
);
DROP TABLE IF EXISTS Rental;
CREATE TABLE Rental (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest INTEGER REFERENCES User(id) NOT NULL,
  place INTEGER REFERENCES Place(id) NOT NULL,
  checkin_date DATE NOT NULL,
  checkout_date DATE NOT NULL,
  UNIQUE(place, checkin_date, checkout_date)
);