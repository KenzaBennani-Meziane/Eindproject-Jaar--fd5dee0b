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


CREATE TABLE ISSUES(
    naam VARCHAR(30) NOT NULL,
    issue VARCHAR(500) NOT NULL,
    arrivalDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idStudent INT,
    FOREIGN KEY (idStudent) REFERENCES STUDENTS(ID),
    ID INT AUTO_INCREMENT PRIMARY KEY NOT NULL
);
insert into ISSUES (naam, issue)
value('Laurens', 'ik heb een probleem');
insert into ISSUES (naam, issue)
value('Sam', 'ties help');
insert into ISSUES (naam, issue)
value('Kenza', 'klaas help');
insert into ISSUES (naam, issue)
value('Iz-Dine', 'me pdo werkt niet');





CREATE TABLE coachIssue(
 idCoach INT,
 FOREIGN KEY (idCoach) REFERENCES COACHES(ID),
 idIssue INT,
 FOREIGN KEY (idIssue) REFERENCES ISSUES(ID),

 PRIMARY KEY (idCoach, idIssue)
);
insert into coachIssue (idCoach, idIssue)
value(1,1);
insert into coachIssue (idCoach, idIssue)
value(1,2);
insert into coachIssue (idCoach, idIssue)
value(2,3);
insert into coachIssue (idCoach, idIssue)
value(2,4);

SELECT * FROM issues;
SHOW TABLES;
DESCRIBE issues;
