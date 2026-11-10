CREATE TABLE IF NOT EXISTS owner (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  processor TEXT,
  ram TEXT,
  storage TEXT,
  display TEXT,
  condition TEXT DEFAULT 'Good' CHECK (condition IN ('Excellent','Good','Fair')),
  warranty TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id SERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS login_attempts_ip_at_idx ON login_attempts (ip, at);

INSERT INTO settings (key, value) VALUES
  ('shop_name', 'Bharat Tech Solutions'),
  ('whatsapp_number', '919773746917'),
  ('phone', '+91 97737 46917'),
  ('address', 'Add your shop address here'),
  ('email', ''),
  ('hours', '10 AM to 8 PM (Sunday closed)')
ON CONFLICT (key) DO NOTHING;
