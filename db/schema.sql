DROP TABLE IF EXISTS Place;
CREATE TABLE Place (
    id INTEGER PRIMARY KEY,
    price_per_day REAL NOT NULL,
    description VARCHAR NOT NULL,
    location INT NOT NULL
);

INSERT INTO Place(price_per_day, description, location) VALUES (20, "Best place on earth!", 351);
INSERT INTO Place(price_per_day, description, location) VALUES (10, "Make out alive and you'll receive a discount!", 350);