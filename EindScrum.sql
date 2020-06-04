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
('Aaron', NULL),
('Aimane', NULL),
('Beau', NULL),
('George', NULL),
('Iz-Dine', NULL),
('Jim', NULL),
('Jimmy', NULL),
('Kenza', NULL),
('Kevin', NULL),
('Lara', NULL),
('Lars', NULL),
('Leah', NULL),
('Laurens', NULL),
('Mohammed', NULL),
('Riccardo', NULL),
('Ruben', NULL),
('Sam', NULL),
('Shailesh', NULL),
('Silvester', NULL),
('Steven', NULL),
('Stijn', NULL),
('Thomas', NULL),
('Yari', NULL),
('Youssef', NULL),
('Zanhua Li', NULL),
('test', NULL);


-- CREATE TABLE issues(
-- 	studentsID INT,
--     studentID INT,
--     FOREIGN KEY (idCoach) REFERENCES COACHES(ID),
--     FOREIGN KEY (idStudent) REFERENCES STUDENTS(ID),


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

-- insert into issues (naam, issue, idCoach)
-- values('Laurens', 'probleem', 2);

-- SELECT * FROM issues;
-- SHOW TABLES;
-- DESCRIBE issues ;