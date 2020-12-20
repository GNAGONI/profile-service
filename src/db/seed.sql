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

CREATE OR REPLACE FUNCTION fill_data(profiles_id text[],  default_password_hash text)
	RETURNS void AS $$
DECLARE
	profile_id text;
BEGIN

	CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	  name text,
		email text,
	  password_hash text,
	  details json,
	  created_at timestamp DEFAULT NOW(),
	  updated_at timestamp DEFAULT NOW()
	);

	FOREACH profile_id IN ARRAY profiles_id
		LOOP
			INSERT INTO profiles(id, name, email, password_hash, details, created_at, updated_at)
			SELECT
				profile_id::uuid,
				'Mark',
				'user' || s || '@testmail.com',
				default_password_hash,
				'{"image": "123.com", "locale": "USA", "gender": "M", "age": "40"}',
				now(),
				now()
			FROM generate_series(1, 1) AS s(id);
		END LOOP;	

END;
$$ LANGUAGE plpgsql;

