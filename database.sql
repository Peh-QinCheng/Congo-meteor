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

INSERT INTO books (ISBN, title) VALUES ('9780804139297', 'Book 1');
INSERT INTO books (ISBN, title) VALUES ('9780804139298', 'Book 2');
INSERT INTO books (ISBN, title) VALUES ('9780804139299', 'Book 3');

INSERT INTO books (ISBN, title, author, publisher, year, price, bkformat, keywords, subject, copies) VALUES
  ('9781449389673', 'Photoshop Elements 9: The Missing Manual', 'Barbara Brundage', 'Pogue Press', 2010, 20,
   'hardcover', 'photography', 'self-help', 20),
  ('9781594487712', 'Where Good Ideas Come From: The Natural History of Innovation', 'Steven Johnson', 'Pogue Press',
   2010, 20, 'hardcover', 'photography', 'self-help', 9),
  ('9781449389671', 'Another Photoshop', 'Barbara Brundage', 'Pogue Press', 2011, 20, 'hardcover', 'photography',
   'self-help', 2);

INSERT INTO
  customers (login, PASSWORD, NAME)
VALUES
  ('testUser1', 'password1', 'username1'),
  ('testUser2', 'password2', 'username2'),
  ('testUser3', 'password3', 'username3'),
  ('testUser4', 'password4', 'username4'),
  ('testUser5', 'password5', 'username5');

INSERT INTO
  feedbacks (login, ISBN, score, content)
VALUES
  ('testUser1', '9780804139297', 10, 'Feedback1'),
  ('testUser2', '9780804139297', 9, 'Feedback2'),
  ('testUser3', '9780804139297', 8, 'Feedback3'),
  ('testUser4', '9780804139297', 7, 'Feedback4'),
  ('testUser5', '9780804139297', 6, 'Feedback5');

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
  (1, 9780804139297, 10.50, 2),
  (1, 9780804139298, 12, 2),
  (2, 9780804139298, 12, 5),
  #   (2, 9780804139299, 29.99, 1),
  (3, 9780804139297, 9.99, 55),
  (3, 9780804139299, 29.99, 100);
#   (3, 9780804139298, 19.99, 999);
