DROP Database if exists ecommerce;
CREATE Database ecommerce;
use ecommerce;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `username` varchar(255) binary DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`username`, `password`, `role`) VALUES ('admin', 'admin', 'admin');

DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'game id',
  `name` varchar(255) DEFAULT NULL COMMENT 'game name',
  `price` decimal(10,2) DEFAULT NULL,
  `description` mediumtext COMMENT 'short description about this game',
  `release_date` datetime DEFAULT NULL COMMENT 'release date of this game',
  `status` int DEFAULT NULL COMMENT '0 = crowdfunding, 1 = release',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'picture id',
  `picture_url` longtext,
  `game_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `picture_fk_1` (`game_id`),
  CONSTRAINT `picture_fk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'order id',
  `amount` decimal(10,2) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_fk_1` (`user_id`),
  CONSTRAINT `order_fk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_tag`;
CREATE TABLE `user_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `game_order`;
CREATE TABLE `game_order` (
  `order_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `game_tag`;
CREATE TABLE `game_tag` (
  `game_id` int unsigned NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`game_id`,`tag_name`),
  CONSTRAINT `game_tag_fk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'comment id',
  `content` text,
  `rating` int DEFAULT NULL,
  `game_id` int unsigned NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `game_funding`;
CREATE TABLE `game_funding` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `received_funding` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend` (
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
