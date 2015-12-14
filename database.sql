CREATE DATABASE `bookstore`;
USE `bookstore`;

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `ISBN`      CHAR(13) NOT NULL,
  `title`     CHAR(200) DEFAULT NULL,
  `author`    CHAR(50)  DEFAULT NULL,
  `publisher` CHAR(50)  DEFAULT NULL,
  `year`      INT(4)    DEFAULT NULL,
  `price`     DOUBLE    DEFAULT NULL,
  `bkformat`  CHAR(20)  DEFAULT NULL,
  `keywords`  CHAR(100) DEFAULT NULL,
  `subject`   CHAR(100) DEFAULT NULL,
  `copies`    INT(11)   DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `login`      CHAR(30) NOT NULL,
  `password`   CHAR(30) NOT NULL,
  `name`       CHAR(30)  DEFAULT NULL,
  `credit_num` CHAR(30)  DEFAULT NULL,
  `address`    CHAR(100) DEFAULT NULL,
  `phone_num`  INT(11)   DEFAULT NULL,
  PRIMARY KEY (`login`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

# Dump of table feedbacks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `feedbacks`;

CREATE TABLE `feedbacks` (
  `login`   CHAR(30) NOT NULL DEFAULT '',
  `ISBN`    CHAR(13) NOT NULL DEFAULT '',
  `score`   INT(11)           DEFAULT 0,
  `content` CHAR(200)         DEFAULT NULL,
  `date`    TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`login`, `ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`login`) REFERENCES `customers` (`login`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

# Dump of table invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `invoiceid`    INT(11) NOT NULL AUTO_INCREMENT,
  `login`        CHAR(30)         DEFAULT NULL,
  `order_date`   TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
  `order_status` CHAR(20)         DEFAULT NULL,
  PRIMARY KEY (`invoiceid`),
  KEY `login` (`login`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`login`) REFERENCES `customers` (`login`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

# Dump of table Orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `invoiceid` INT(11)  NOT NULL DEFAULT '0',
  `ISBN`      CHAR(13) NOT NULL DEFAULT '',
  `price`     DOUBLE            DEFAULT NULL,
  `copies`    INT(11)           DEFAULT NULL,
  PRIMARY KEY (`invoiceid`, `ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`invoiceid`) REFERENCES `invoices` (`invoiceid`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

# Dump of table ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `login`       CHAR(30) NOT NULL DEFAULT '',
  `ISBN`        CHAR(13) NOT NULL DEFAULT '',
  `rater_login` CHAR(30) NOT NULL DEFAULT '',
  `rating`      INT(1)            DEFAULT NULL,
  PRIMARY KEY (`login`, `ISBN`, `rater_login`),
  KEY `rater_login` (`rater_login`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`login`) REFERENCES `customers` (`login`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`rater_login`) REFERENCES `customers` (`login`),
  CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`ISBN`) REFERENCES `books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


# SEED DATA
# -----------------------------------------------------------
INSERT INTO books (ISBN, title, author, publisher, year, price, bkformat, keywords, subject, copies) VALUES
  ('9781449389673', 'Photoshop Elements 9: The Missing Manual', 'Barbara Brundage', 'Pogue Press', 2010, 20, 'hardcover', 'photography', 'self-help', 100),
  ('9780804139297', 'Database Management Systems', 'Zhang MeiHui', 'Pewpew Press', 2010, 99, 'hardcover', 'photography', 'self-help', 9),
  ('9780804139298', 'Transactions: Are they serializable?', 'Zhang MeiHui', 'Pewpew Press', 2010, 199, 'hardcover', 'photography', 'self-help', 9),
  ('9780804139299', 'In-Memory Big Data Management And Processing', 'Zhang MeiHui', 'Pewpew Press', 2010, 9, 'hardcover', 'photography', 'self-help', 9),
  ('9781449389671', 'Another Photoshop', 'Barbara Brundage', 'Pogue Press', 2011, 20, 'hardcover', 'photography', 'self-help', 2),
  ('9781594487712','Where Good Ideas Come From: The Natural History of Innovation','Steven Johnson','Riverhead Hardcover',2010,64,'hardcover','history','innovation',3),
  ('9780321474049','The Digital Photography Book','Scott Kelby','Peachpit Press',2006,84,'softcover','photography','guidebook',9),
  ('9780684801520','The Great Gatsby','F. Scott Fitzgerald','Scribner',1995,71,'hardcover','fiction','fiction',2),
  ('9780803612259','Davis s Drug Guide For Nurses (book With Cd-rom) And Mednotes: Nurse s Pocket Pharmacology Guide','Judith Hopfer Deglin, April Hazard Vallerand','F. A. Davis Company',2004,59,'hardcover','Nursing','guidebook',4),
  ('9780393072228','The Shallows: What the Internet Is Doing to Our Brains','Nicholas Carr','W. W. Norton & Company ',2010,73,'hardcover','Internet','self-help',5),
  ('9780321441461','Data Structures and Algorithm Analysis in C++ (3rd Edition)','Mark A. Weiss','Addison Wesley',2006,95,'hardcover','Computer Science','guidebook',4),
  ('9781848000698','The Algorithm Design Manual','Steven S. Skiena','Springer',2008,46,'hardcover','Computer Science','guidebook',9),
  ('9781449389550','Hackers & Painters: Big Ideas from the Computer Age','Paul Graham','O Reilly Media',2010,52,'softcover','Computer Science','guidebook',1),
  ('9780596529321','Programming Collective Intelligence: Building Smart Web 2.0 Applications','Toby Segaran','O Reilly Media',2007,28,'softcover','Computer Science','guidebook',3),
  ('9780321370136','Data Structures and Algorithm Analysis in Java (2nd Edition)','Mark A. Weiss','Addison Wesley',2006,57,'hardcover','Computer Science','guidebook',9),
  ('9780321358288','Introduction to the Design and Analysis of Algorithms (2nd Edition)','Anany V. Levitin','Addison Wesley',2006,71,'softcover','Computer Science','guidebook',6),
  ('9780596802356','Data Analysis with Open Source Tools','Philipp K. Janert','O Reilly Media',2010,63,'softcover','Computer Science','guidebook',4),
  ('9780672325670','Sams Teach Yourself SQL in 10 Minutes (3rd Edition)','Ben Forta','Sams',2004,81,'softcover','Computer Science','guidebook',1),
  ('9781449389734','Hadoop: The Definitive Guide','Tom White','Yahoo Press',2010,81,'softcover','Computer Science','guidebook',5),
  ('9781423902454','Network+ Guide to Networks (Networking (Course Technology))','Tamara Dean','Course Technology',2009,65,'softcover','Computer Science','guidebook',4);
INSERT INTO
  customers (login, PASSWORD, NAME)
VALUES
  ('testUser1', 'password1', 'John Lee'),
  ('testUser2', 'password2', 'Mary Ann'),
  ('testUser3', 'password3', 'Madeline Seow'),
  ('testUser4', 'password4', 'Zack Burns'),
  ('testUser5', 'password5', 'Othello');
INSERT INTO
  feedbacks (login, ISBN, score, content)
VALUES
  ('testUser1', '9780804139297', 10, 'This book is a great read!'),
  ('testUser2', '9780804139297', 9, 'Amazing purchase, try it out yourself!'),
  ('testUser3', '9780804139297', 8, 'ITS A MUST BUY'),
  ('testUser4', '9780804139297', 7, 'Decent, worth a read if you are free.'),
  ('testUser5', '9780804139297', 6, 'Mehhhh. Only worth it if you really want it...'),
  ('testUser1', '9781848000698', 10, 'A must for every algorithm student!'),
  ('testUser2', '9781848000698', 8, 'Helped me so much for work! Great book!'),
  ('testUser3', '9781848000698', 7, 'Works so much :) Didnt regret buying it'),
  ('testUser1', '9780321441461', 5, 'Too technical :( Hard to understand'),
  ('testUser4', '9780321441461', 1, 'Hated this book'),
  ('testUser5', '9781449389671', 5, 'What kind of name is this???'),
  ('testUser2', '9781449389671', 3, 'RIPOFF DONT BUY'),
  ('testUser3', '9781449389671', 2, 'This book doesnt make sense'),
  ('testUser2', '9780321358288', 6, 'Interesting read but priced too high'),
  ('testUser5', '9780321358288', 4, 'Nah, bad pricing for such a short book'),
  ('testUser1', '9780321358288', 8, 'Wow it is really useful and I love it!');
INSERT INTO
  ratings (login, ISBN, rater_login, rating)
VALUES # testUser2,3,4 rating testUser1's feedback on ISBN 9780804139297
  ('testUser1', '9780804139297', 'testUser2', 2),
  ('testUser1', '9780804139297', 'testUser3', 1),
  ('testUser1', '9780804139297', 'testUser4', 0);
INSERT INTO
  ratings (login, ISBN, rater_login, rating)
VALUES # testUser2,3,4 rating testUser1's feedback on ISBN 9780804139297
  ('testUser2', '9780804139297', 'testUser1', 2),
  ('testUser2', '9780804139297', 'testUser3', 1),
  ('testUser2', '9780804139297', 'testUser4', 1);
INSERT INTO invoices (login) VALUES
  ('testUser1'),
  ('testUser2'),
  ('testUser3');
# Seed orders so buying book 1 recommends 2,3, buying 2 recommends 1, buying 3 recommends 1
INSERT INTO orders (invoiceid, ISBN, price, copies) VALUES
  (1, 9781848000698, 10.50, 2),
  (1, 9780321441461, 12, 2),
  (2, 9780321441461, 12, 5),
  #   (2, 9780804139299, 29.99, 1),
  (3, 9781848000698, 9.99, 55),
  (3, 9780321358288, 29.99, 100);
#   (3, 9780804139298, 19.99, 999);
