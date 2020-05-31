DROP DATABASE scrum;
CREATE DATABASE scrum;
USE scrum;

CREATE TABLE COACHES(
naamCoach varchar(30)  NOT NULL,
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO COACHES (naamCoach, ID)
VALUES ('Ties', NULL), ('Klaas', NULL);


CREATE TABLE STUDENTS(
naamStudent varchar(30) NOT NULL,
ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO STUDENTS (naamStudent, ID)
VALUES 
('Laurens', NULL), 
('Iz-Dine', NULL), 
('Kenza', NULL), 
('Sam', NULL),
('test', NULL);


CREATE TABLE issues(
    naam VARCHAR(30) NOT NULL,
    issue VARCHAR(500) NOT NULL,
    ArrivalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idStudent INT,
    idCoach INT,
    FOREIGN KEY (idCoach) REFERENCES COACHES(ID),
    FOREIGN KEY (idStudent) REFERENCES STUDENTS(ID),
    idIssue INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);

INSERT INTO issues (naam, issue, idCoach, idStudent)
                VALUES ('test', 'test', 1, 4);
-- insert into issues (naam, issue, idCoach)
-- values('Laurens', 'probleem', 2);

-- SELECT * FROM issues;
-- SHOW TABLES;
-- DESCRIBE issues ;