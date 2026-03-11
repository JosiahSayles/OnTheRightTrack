DROP TABLE IF EXISTS job_applications;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id serial PRIMARY KEY, 
    firstname text NOT NULL, 
    lastname text NOT NULL, 
    email text UNIQUE NOT NULL, 
    password text NOT NULL
);

CREATE TABLE job_applications (
    id serial PRIMARY KEY, 
    companyname text NOT NULL, 
    jobtitle text NOT NULL, 
    location text NOT NULL, 
    applicationdate date NOT NULL, 
    status VARCHAR CHECK(status IN ('Applied', 'Rejected', 'Interviewing', 'Pending')),
    joburl text, 
    notes text, 
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

