DROP TABLE IF EXISTS User;
CREATE TABLE User (
  id INTEGER PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  birth_date DATE NOT NULL,
  country VARCHAR(2),
  bio VARCHAR,
  photo VARCHAR
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
CREATE TABLE PlaceLocation (
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
  description VARCHAR NOT NULL,
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
  CONSTRAINT CheckinBeforeCheckout CHECK (checkin < checkout)
);
DROP TABLE IF EXISTS PlaceTag;
CREATE TABLE PlaceTag (
  place INTEGER REFERENCES Place(id),
  tag INTEGER REFERENCES Tag(id),
  PRIMARY KEY(place, tag)
);
DROP TABLE IF EXISTS Rating;
CREATE TABLE Rating (
  id INTEGER PRIMARY KEY,
  place INTEGER REFERENCES Place(id),
  rating REAL NOT NULL,
  comment VARCHAR,
  CONSTRAINT RatingValue CHECK (
    rating >= 0
    AND rating <= 5
  )
);
DROP TABLE IF EXISTS PlacePhoto;
CREATE TABLE PlacePhoto (
  id INTEGER PRIMARY KEY,
  place INTEGER REFERENCES Place(id) NOT NULL,
  author INTEGER REFERENCES User(id) NOT NULL,
  resource_id VARCHAR UNIQUE NOT NULL
);
DROP TRIGGER IF EXISTS RentalDatesAreAvailableOnInsert;
CREATE TRIGGER RentalDatesAreAvailableOnInsert BEFORE
INSERT ON Rental FOR EACH ROW
  WHEN EXISTS (
    SELECT
      *
    FROM (
        SELECT
          *
        FROM Rental
        WHERE
          Rental.place = New.place
      ) AS existing
    WHERE
      (
        (
          New.checkin >= existing.checkin
          AND New.checkin < existing.checkout
        )
        OR (
          New.checkout > existing.checkin
          AND New.checkout <= existing.checkout
        )
      )
  ) BEGIN
SELECT
  RAISE(
    ABORT,
    'The inserted dates overlap with an existing rental'
  );
END;
DROP TRIGGER IF EXISTS RentalDatesAreAvailableOnUpdate;
CREATE TRIGGER RentalDatesAreAvailableUpdate BEFORE
UPDATE ON Rental FOR EACH ROW
  WHEN EXISTS (
    SELECT
      *
    FROM (
        SELECT
          *
        FROM Rental
        WHERE
          Rental.place = New.place
      ) AS existing
    WHERE
      (
        (
          New.checkin >= existing.checkin
          AND New.checkin < existing.checkout
        )
        OR (
          New.checkout > existing.checkin
          AND New.checkout <= existing.checkout
        )
      )
  ) BEGIN
SELECT
  RAISE(
    ABORT,
    'The new dates overlap with an existing rental'
  );
END;
