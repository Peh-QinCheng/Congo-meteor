CREATE DATABASE `bookstore`;
USE `bookstore`;

DROP TABLE IF EXISTS `Books`;

CREATE TABLE `Books` (
  `ISBN` char(13) NOT NULL,
  `title` char(50) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `publisher` char(50) DEFAULT NULL,
  `year` date DEFAULT NULL,
  `price` double DEFAULT NULL,
  `bkformat` char(20) DEFAULT NULL,
  `keywords` char(100) DEFAULT NULL,
  `subject` char(100) DEFAULT NULL,
  `copies` int(11) DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `login` char(30) NOT NULL,
  `password` char(30) NOT NULL,
  `name` char(30) DEFAULT NULL,
  `credit_num` char(30) DEFAULT NULL,
  `address` char(100) DEFAULT NULL,
  `phone_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Feedbacks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Feedbacks`;

CREATE TABLE `Feedbacks` (
  `login` char(30) NOT NULL DEFAULT '',
  `ISBN` char(13) NOT NULL DEFAULT '',
  `score` int(11) DEFAULT NULL,
  `content` char(200) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`login`,`ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Invoices`;

CREATE TABLE `Invoices` (
  `invoiceid` int(11) NOT NULL,
  `login` char(30) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` char(20) DEFAULT NULL,
  PRIMARY KEY (`invoiceid`),
  KEY `login` (`login`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `invoiceid` int(11) NOT NULL DEFAULT '0',
  `ISBN` char(13) NOT NULL DEFAULT '',
  `price` double DEFAULT NULL,
  `copies` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoiceid`,`ISBN`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`invoiceid`) REFERENCES `Invoices` (`invoiceid`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Ratings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Ratings`;

CREATE TABLE `Ratings` (
  `login` char(30) NOT NULL DEFAULT '',
  `ISBN` char(13) NOT NULL DEFAULT '',
  `rater_login` char(30) NOT NULL DEFAULT '',
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`login`,`ISBN`,`rater_login`),
  KEY `rater_login` (`rater_login`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`rater_login`) REFERENCES `Customers` (`login`),
  CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;