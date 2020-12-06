DROP FUNCTION IF EXISTS get_profile_by_id;
CREATE OR REPLACE FUNCTION get_profile_by_id(profile_id uuid)
 		RETURNS SETOF profiles AS $$
 	SELECT * FROM profiles
 	WHERE id = profile_id;
$$ LANGUAGE SQL;

DROP FUNCTION IF EXISTS delete_profile_by_id;
DROP FUNCTION IF EXISTS delete_profile_by_id;
CREATE OR REPLACE FUNCTION delete_profile_by_id(profile_id uuid) RETURNS SETOF profiles AS $$
BEGIN
	RETURN QUERY
		WITH dp as (DELETE FROM profiles WHERE id = profile_id RETURNING *)
  	SELECT * FROM dp;
END;
$$ LANGUAGE plpgsql;