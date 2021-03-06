CREATE TABLE users (
    id VARCHAR(65535) PRIMARY KEY NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(65535) NOT NULL,
    home_number VARCHAR(65535),
    mobile_number VARCHAR(65535) NOT NULL,
    address VARCHAR(65535) NOT NULL,
    city TEXT NOT NULL,
    state_region TEXT NOT NULL,
    zipcode VARCHAR(65535),
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP DEFAULT now() NOT NULL,
    message TEXT,
    verified BOOLEAN DEFAULT TRUE NOT NULL
);