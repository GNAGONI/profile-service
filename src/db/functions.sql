DROP FUNCTION IF EXISTS get_profile_by_id;
CREATE OR REPLACE FUNCTION get_profile_by_id(profile_id uuid)
RETURNS SETOF profiles AS $$
DECLARE
	profile_check BOOLEAN;	
BEGIN
  	SELECT EXISTS(
 			SELECT * FROM profiles
  		WHERE id = profile_id
  	) INTO profile_check;
	
 	IF (profile_check = false) THEN
 		RAISE EXCEPTION 'Profile with provided id does not exist'; 
 	END IF;
	
   	RETURN QUERY SELECT * FROM profiles
   	WHERE id = profile_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_profile_by_id;
CREATE OR REPLACE FUNCTION delete_profile_by_id(profile_id uuid) RETURNS SETOF profiles AS $$
DECLARE
	profile_check BOOLEAN;
BEGIN
	 SELECT EXISTS(
 		SELECT * FROM profiles
  		WHERE id = profile_id
  	) INTO profile_check;
	
	IF (profile_check = false) THEN
 		RAISE EXCEPTION 'Profile with provided id does not exist'; 
 	END IF;
	
	RETURN QUERY
		WITH dp as (DELETE FROM profiles WHERE id = profile_id RETURNING *)
  	SELECT * FROM dp;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_profile_by_email;
CREATE OR REPLACE FUNCTION get_profile_by_email(profile_email text)
	RETURNS SETOF profiles AS $$
DECLARE
	profile_check BOOLEAN;
BEGIN
	 SELECT EXISTS(
 		SELECT * FROM profiles
  	WHERE email = profile_email
  ) INTO profile_check;
	
	IF (profile_check = false) THEN
 		RAISE EXCEPTION 'Profile with provided email does not exist'; 
 	END IF;
	
	RETURN QUERY
	SELECT * FROM profiles
	WHERE email = profile_email;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS random_between;
CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) 
   RETURNS INT AS $$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ LANGUAGE plpgsql;