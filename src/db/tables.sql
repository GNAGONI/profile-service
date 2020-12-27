CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  email text,
  password_hash text,
  details json,
  user_type_credentials text,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);
