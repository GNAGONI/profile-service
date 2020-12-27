DROP FUNCTION IF EXISTS fill_data;

CREATE OR REPLACE FUNCTION fill_data(profiles_id text[],  default_password_hash text)
	RETURNS void AS $$
DECLARE
	profile_id text;
BEGIN
	INSERT INTO profiles(id, name, email, password_hash, details, user_type_credentials, created_at, updated_at)
	SELECT
		profiles_id[s]::uuid,
		'Mark',
		'user' || s || '@testmail.com',
		default_password_hash,
		'{"image": "123.com", "locale": "USA", "gender": "M", "age": "40"}',
		'commonUser/1234',
		now(),
		now()
	FROM generate_series(1, array_length(profiles_id, 1)) AS s(id);
END;
$$ LANGUAGE plpgsql;

