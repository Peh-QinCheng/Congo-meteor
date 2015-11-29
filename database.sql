CREATE DATABASE `bookstore`;
USE `bookstore`;

DROP TABLE IF EXISTS `Books`;

CREATE TABLE `Books` (
  `ISBN`      CHAR(13) NOT NULL,
  `title`     CHAR(50)  DEFAULT NULL,
  `author`    CHAR(50)  DEFAULT NULL,
  `publisher` CHAR(50)  DEFAULT NULL,
  `year`      DATE      DEFAULT NULL,
  `price`     DOUBLE    DEFAULT NULL,
  `bkformat`  CHAR(20)  DEFAULT NULL,
  `keywords`  CHAR(100) DEFAULT NULL,
  `subject`   CHAR(100) DEFAULT NULL,
  `copies`    INT(11)   DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


# Dump of table Customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
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


# Dump of table Feedbacks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Feedbacks`;

CREATE TABLE `Feedbacks` (
  `login`   CHAR(30) NOT NULL DEFAULT '',
  `ISBN`    CHAR(13) NOT NULL DEFAULT '',
  `score`   INT(11)           DEFAULT NULL,
  `content` CHAR(200)         DEFAULT NULL,
  `date`    DATE              DEFAULT NULL,
  PRIMARY KEY (`login`, `ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


# Dump of table Invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Invoices`;

CREATE TABLE `Invoices` (
  `invoiceid`    INT(11) NOT NULL,
  `login`        CHAR(30) DEFAULT NULL,
  `order_date`   DATE     DEFAULT NULL,
  `order_status` CHAR(20) DEFAULT NULL,
  PRIMARY KEY (`invoiceid`),
  KEY `login` (`login`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


# Dump of table Orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `invoiceid` INT(11)  NOT NULL DEFAULT '0',
  `ISBN`      CHAR(13) NOT NULL DEFAULT '',
  `price`     DOUBLE            DEFAULT NULL,
  `copies`    INT(11)           DEFAULT NULL,
  PRIMARY KEY (`invoiceid`, `ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`invoiceid`) REFERENCES `Invoices` (`invoiceid`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;


# Dump of table Ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Ratings`;

CREATE TABLE `Ratings` (
  `login`       CHAR(30) NOT NULL DEFAULT '',
  `ISBN`        CHAR(13) NOT NULL DEFAULT '',
  `rater_login` CHAR(30) NOT NULL DEFAULT '',
  `rating`      INT(11)           DEFAULT NULL,
  PRIMARY KEY (`login`, `ISBN`, `rater_login`),
  KEY `rater_login` (`rater_login`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`rater_login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;