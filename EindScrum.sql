DROP DATABASE scrum;
CREATE DATABASE scrum;
USE scrum;

CREATE TABLE COACHES(
naamCoach varchar(30) NOT NULL,
idCoach INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO COACHES (naamCoach, idCoach)
VALUES ('Ties', NULL);


CREATE TABLE STUDENTS(
naamStudent varchar(30) NOT NULL,
idStudent INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO STUDENTS (naamStudent, idStudent)
VALUES ('Laurens', NULL), ('Iz-Dine', NULL), ('Kenza', NULL), ('Kenza', NULL), ('Sam', NULL);


CREATE TABLE issues(
    naam VARCHAR(30) NOT NULL,
    issue VARCHAR(500) NOT NULL,
    lokaal VARCHAR(20) NULL,
    ArrivalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    naamCoach  varchar(30) NOT NULL,
    FOREIGN KEY (naamCoach) REFERENCES COACHES(naamCoach),
    idStudent INT,
    FOREIGN KEY (idStudent) REFERENCES STUDENTS(idStudent),
    idIssue INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);

SELECT * FROM issues;
SHOW TABLES;
DESCRIBE issues ;