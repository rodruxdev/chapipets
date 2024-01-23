DROP DATABASE IF EXISTS chapipets;
CREATE DATABASE chapipets;

USE chapipets;

-- create user table
CREATE TABLE user (
    ID_USER BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    NAME VARCHAR(255),
    DESCRIPTION TEXT,
    EMAIL VARCHAR(255) UNIQUE,
    CELLPHONE VARCHAR(15),
    PASSWORD VARCHAR(255),
    ROLE VARCHAR(10),
    DATE_CREATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE_MODIFIED TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create pet table
CREATE TABLE pet (
    ID_PET INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    TYPE VARCHAR(100),
    NAME VARCHAR(100),
    DESCRIPTION TEXT,
    BREED VARCHAR(100),
    AGE VARCHAR(20),
    SIZE VARCHAR(20),
    COLOR VARCHAR(20),
    IMAGE VARCHAR(255),
    PET_STATE VARCHAR(20),
    STATE VARCHAR(10),
    DATE_CREATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DATE_MODIFIED TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ID_USER BINARY(16),
    FOREIGN KEY (ID_USER) REFERENCES user(ID_USER)
);

-- Insert user
INSERT INTO user (NAME, DESCRIPTION, EMAIL, CELLPHONE, PASSWORD, ROLE)
VALUES ('rodruxdev', 'super admin', 'rodrux@example.com', '78412345', '', 'admin');

SET @user_id = (SELECT ID_USER FROM user ORDER BY ID_USER ASC LIMIT 1);

-- Insert pets
INSERT INTO pet (TYPE, NAME, DESCRIPTION, BREED, AGE, SIZE, COLOR, IMAGE, PET_STATE, STATE, ID_USER)
VALUES
('dog', 'Buddy', 'Friendly dog', 'Labrador', 'pediatric', 'Medium', 'Brown', 'dog.jpg', 'available', 'enabled', @user_id),
('cat', 'Whiskers', 'Playful cat', 'Siamese', 'young adult', 'Small', 'White', 'cat.jpg', 'adopted', 'disabled', @user_id),
('fish', 'Nemo', 'Colorful fish', 'Clownfish', '1', 'mature adult', 'Orange', 'fish.jpg', 'available', 'enabled', @user_id),
('bird', 'Tweetie', 'Chirpy bird', 'Canary', '1', 'senior', 'Yellow', 'bird.jpg', 'available', 'enabled', @user_id),
('rabbit', 'Fluffy', 'Cute rabbit', 'Lop', '2', 'geriatric', 'Gray', 'rabbit.jpg', 'available', 'enabled', @user_id);
