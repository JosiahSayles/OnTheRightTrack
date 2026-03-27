DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS job_applications;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id serial PRIMARY KEY, 
    firstname text NOT NULL, 
    lastname text NOT NULL, 
    email text UNIQUE NOT NULL, 
    password text NOT NULL,
    avatarurl text 
);

CREATE TABLE documents (
    id serial PRIMARY KEY, 
    type VARCHAR CHECK (type IN ('resume', 'cover_letter')),
    filename text NOT NULL, 
    fileurl text NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, filename)
);

CREATE TABLE job_applications (
    id serial PRIMARY KEY, 
    companyname text NOT NULL, 
    jobtitle text NOT NULL, 
    location text NOT NULL, 
    applicationdate date NOT NULL, 
    status VARCHAR CHECK(status IN ('Applied', 'Rejected', 'Interviewing', 'Offer')),
    joburl text, 
    notes text, 
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resume_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
    cover_letter_id INTEGER REFERENCES documents(id) ON DELETE SET NULL
);
