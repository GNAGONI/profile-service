DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS fill_data;
DROP FUNCTION IF EXISTS random_between;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) 
   RETURNS INT AS $$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fill_data(profile_number integer)
	RETURNS void AS $$
BEGIN

	CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	  name text,
	  details json,
	  created_at timestamp DEFAULT NOW(),
	  updated_at timestamp DEFAULT NOW()
	);


	INSERT INTO profiles(id, name, details, created_at, updated_at)
		SELECT
			uuid_generate_v4(),
			'Jack',
			'{"image": "123.com", "locale": "USA", "gender": "M", "age": "40"}',
			now(),
			now()
		FROM generate_series(1, profile_number) AS s(id);

END;
$$ LANGUAGE plpgsql;

