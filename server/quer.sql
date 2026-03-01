users table edit 

ALTER TABLE users
ADD COLUMN role ENUM('admin','recruiter','candidate') 
    NOT NULL DEFAULT 'candidate',
ADD COLUMN status ENUM('pending','approved','rejected') 
    NOT NULL DEFAULT 'pending';