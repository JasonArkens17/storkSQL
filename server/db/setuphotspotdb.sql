DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userid INT,
  spotid INT
);

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  rating VARCHAR,
  latitude REAL,
  longitude REAL,
  yelp_id VARCHAR
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  username VARCHAR,
  password VARCHAR,
  facebookId BIGINT,
  facebookAccessToken VARCHAR
);

--  heroku pg:psql --app [NAME OF APP] -f server/db/setuphotspotdb.sql
