USE scrum;

DROP TABLE issues;
CREATE TABLE issues(
    naam VARCHAR(30) NOT NULL,
    issue VARCHAR(500) NOT NULL,
    coach VARCHAR(2) NOT NULL,
    lokaal VARCHAR(20) NULL,
    ArrivalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idIssue INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);

DROP TABLE COACHES;
CREATE TABLE COACHES(
naam varchar(30) NOT NULL,
idCoach INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO COACHES (naam, idCoach)
VALUES ('Ties', NULL), ('Klaas', NULL);

DROP TABLE STUDENTS;
CREATE TABLE STUDENTS(
naam varchar(30) NOT NULL,
idStudent INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
INSERT INTO STUDENTS (naam, idStudent)
VALUES ('Laurens', NULL), ('Iz-Dine', NULL), ('Kenza', NULL), ('Kenza', NULL), ('Sam', NULL);
