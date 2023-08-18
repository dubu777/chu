-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 13.124.89.62    Database: chu
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consulting`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `cancel_date` datetime(6) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `review_content` varchar(255) DEFAULT NULL,
  `review_score` double DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `customer_seq` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKgw8veexq731ojruip2n68f8fc` (`customer_seq`),
  KEY `FKh40cr8h4i8jmhe2eshlxdp5du` (`designer_seq`),
  CONSTRAINT `FKgw8veexq731ojruip2n68f8fc` FOREIGN KEY (`customer_seq`) REFERENCES `customer` (`seq`),
  CONSTRAINT `FKh40cr8h4i8jmhe2eshlxdp5du` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting`
--

LOCK TABLES `consulting` WRITE;
/*!40000 ALTER TABLE `consulting` DISABLE KEYS */;
INSERT INTO `consulting` VALUES (1,'2023-08-14 12:54:22.647040','2023-08-15','09:30:00','2023-08-14 08:08:29.967206',NULL,NULL,'ddd',NULL,NULL,5,'1',4,1),(10,NULL,'2023-08-15','12:30:00','2023-08-14 16:57:07.953782','10.png','10.png','잦은 탈색으로 인해 머리 끝이 녹아있는 상태입니다..',NULL,NULL,5,'10',6,1),(11,NULL,'2023-08-16','15:00:00','2023-08-14 17:02:17.205901','11.png','11.png','16일 3시 예약 신청합니다.\n잦은 탈색으로 인해 머리 끝이 많이 녹은 상태입니다..',NULL,'유니 디자이너님 친절한 상담 감사합니다! 레이어드컷이 하고 싶었는데 덕분에 확신이 생겼어요.',5,'11',6,7),(12,NULL,'2023-08-15','13:30:00','2023-08-14 17:08:26.562739','12.png','12.png','15일 1시30분 상담 예약합니다. 잦은 탈색으로 인해 머리 끝 손상이 심한 편입니다.',NULL,NULL,5,'12',6,7),(13,NULL,'2023-08-15','13:30:00','2023-08-14 17:10:51.692346','13.png','13.png','15일 1시30분 상담 예약합니다. 잦은 탈색으로 인해 머리 끝 손상이 심한 편입니다.',NULL,NULL,5,'13',6,7),(14,NULL,'2023-08-15','16:00:00','2023-08-14 17:13:57.747914','14.png','14.png','18일 16시 상담 예약합니다. 잦은 탈색으로 인해 머리 끝 손상이 심한 편입니다.','앞머리 유무에 관한 고민을 하셨지만, 동그란 얼굴형에는 앞머리보다 이마의 장점을 강조할 수 있는 단발 또는 반묶음 스타일을 추천합니다. 탈색같은 경우에는 붉은 기가 적은 탈색을 권장합니다.','우와앙',3,'14',6,7),(15,NULL,'2023-08-15','13:30:00','2023-08-15 05:43:12.621166','15.png','15.png','저는 머리가 잘 빠집니다. M자 탈모가 조금 있는데 신경 써서 상담 부탁드립니다!',NULL,NULL,5,'15',2,6),(16,NULL,'2023-08-16','13:00:00','2023-08-15 05:46:25.244705','16.png','16.png','저는 머리가 잘 빠집니다. M자 탈모가 조금 있는데 신경 써서 상담 부탁드립니다!',NULL,NULL,5,'16',2,6),(17,NULL,'2023-08-16','14:00:00','2023-08-15 05:49:41.082708','17.png','17.png','1234567890',NULL,NULL,5,'17',2,6),(18,NULL,'2023-08-17','11:00:00','2023-08-15 05:54:47.402653','18.png','18.png','좋은 상담 부탁드립니다.',NULL,NULL,5,'18',2,6),(19,NULL,'2023-08-16','11:00:00','2023-08-15 05:56:40.904774','19.png','19.png','좋은 상담 부탁드립니다!',NULL,NULL,5,'19',2,6),(20,NULL,'2023-08-16','18:30:00','2023-08-15 06:01:57.206758','20.png','20.png','항상 좋은 상담 부탁드립니다.',NULL,NULL,5,'20',2,6),(21,NULL,'2023-08-15','09:30:00','2023-08-15 08:26:58.634210',NULL,NULL,'안녕하세요',NULL,NULL,5,'21',4,5),(22,NULL,'2023-08-15','19:30:00','2023-08-15 08:28:28.956046',NULL,NULL,'안녕하세요',NULL,NULL,5,'22',4,5),(23,NULL,'2023-08-15','19:00:00','2023-08-15 08:30:00.924141',NULL,NULL,'안녕하세요',NULL,NULL,5,'23',4,5),(24,NULL,'2023-08-15','17:30:00','2023-08-15 08:32:24.322465','24.png','24.png','안녕하세요',NULL,NULL,5,'24',4,5),(25,NULL,'2023-08-16','18:30:00','2023-08-15 09:53:00.005765','25.png','25.png','안녕하세요',NULL,NULL,5,'25',4,10),(26,NULL,'2023-08-16','16:00:00','2023-08-15 10:03:42.341775','26.png','26.png','안녕하세요!','히피펌을 추천합ㄴ',NULL,5,'26',4,11),(27,NULL,'2023-08-16',NULL,'2023-08-15 17:53:48.614553',NULL,NULL,'',NULL,NULL,5,'27',1,2),(28,NULL,'2023-08-16',NULL,'2023-08-15 17:53:52.940371',NULL,NULL,'',NULL,NULL,5,'28',1,2),(29,NULL,'2023-08-19','15:00:00','2023-08-16 04:39:02.991918','29.png','29.png','잘 부탁드립니다!',NULL,NULL,5,'29',4,4),(30,'2023-08-16 06:10:50.892034','2023-08-26','10:30:00','2023-08-16 06:10:11.240005','30.png','30.png','안녕하세요!',NULL,NULL,5,'30',4,11),(31,'2023-08-16 06:22:09.821085','2023-08-26','10:30:00','2023-08-16 06:21:38.131394','31.png','31.png','안녕하세요',NULL,NULL,5,'31',4,11),(32,'2023-08-16 06:35:45.556294','2023-08-26','09:30:00','2023-08-16 06:34:28.187251','32.png','32.png','',NULL,NULL,5,'32',4,11),(33,'2023-08-16 06:43:46.475068','2023-08-27','10:00:00','2023-08-16 06:39:15.076490','33.png','33.png','',NULL,NULL,5,'33',4,11),(34,NULL,'2023-09-01','09:00:00','2023-08-16 06:42:26.666094','34.png','34.png','',NULL,'친절하고 좋아요~',4,'34',4,11),(35,'2023-08-16 07:20:25.771209','2023-09-01','10:30:00','2023-08-16 07:19:19.043231','35.png','35.png','',NULL,NULL,5,'35',4,11),(36,'2023-08-16 13:43:32.564649','2023-08-18','11:30:00','2023-08-16 13:41:27.672067','36.png','36.png','잘 부탁드립니다.',NULL,NULL,5,'36',24,7),(38,NULL,'2023-08-17','16:00:00','2023-08-16 14:29:05.798715','38.png','38.png','안녕하세요! 류민지입니다! 저는 반곱슬기가 있고 요즘 스트레스로 인해 얇은 모발 상태를 갖고 있습니다! 이 점 참고해서 상담 해주시면 감사하겠습니다. 저는 앞머리를 넘기고 싶은게 고민이에요!',NULL,NULL,5,'38',3,7),(39,NULL,'2023-08-16','14:30:00','2023-08-16 14:40:22.400551','39.png','39.png','안녕하세요',NULL,NULL,5,'39',4,7);
/*!40000 ALTER TABLE `consulting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulting_result`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting_result` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `consulting_seq` int DEFAULT NULL,
  `face_seq` int DEFAULT NULL,
  `hair_style_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKawsc9ck4muyy68eb8goj7xnkv` (`consulting_seq`),
  KEY `FKeqcyb9ixld2txrmf73fkljhsn` (`face_seq`),
  KEY `FK91om4pwf4oxl2emqijtp2gryl` (`hair_style_seq`),
  CONSTRAINT `FK91om4pwf4oxl2emqijtp2gryl` FOREIGN KEY (`hair_style_seq`) REFERENCES `hair_style_dict` (`seq`),
  CONSTRAINT `FKawsc9ck4muyy68eb8goj7xnkv` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`),
  CONSTRAINT `FKeqcyb9ixld2txrmf73fkljhsn` FOREIGN KEY (`face_seq`) REFERENCES `face_dict` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting_result`
--

LOCK TABLES `consulting_result` WRITE;
/*!40000 ALTER TABLE `consulting_result` DISABLE KEYS */;
INSERT INTO `consulting_result` VALUES (1,26,1,6),(2,26,1,10),(3,26,1,2),(4,26,1,5),(5,26,1,9),(6,26,1,3),(7,26,1,2),(8,14,1,22),(9,14,1,7),(10,14,1,3),(11,14,1,20);
/*!40000 ALTER TABLE `consulting_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulting_target_info`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting_target_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `consulting_seq` int DEFAULT NULL,
  `portfolio_seq` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt9pr10h3ua51q6rlv4ggpdf8l` (`consulting_seq`),
  KEY `FK2dunh60yihwqyfdvi0dx3en19` (`portfolio_seq`),
  CONSTRAINT `FK2dunh60yihwqyfdvi0dx3en19` FOREIGN KEY (`portfolio_seq`) REFERENCES `designer_portfolio` (`seq`),
  CONSTRAINT `FKt9pr10h3ua51q6rlv4ggpdf8l` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting_target_info`
--

LOCK TABLES `consulting_target_info` WRITE;
/*!40000 ALTER TABLE `consulting_target_info` DISABLE KEYS */;
INSERT INTO `consulting_target_info` VALUES (1,1,4),(2,1,14),(8,10,4),(9,10,8),(10,10,9),(11,10,14),(12,10,23),(13,11,36),(14,11,37),(16,11,39),(17,11,41),(18,11,42),(19,11,47),(20,11,48),(21,12,36),(22,12,37),(23,12,39),(24,12,41),(25,12,42),(26,12,47),(27,12,48),(28,12,NULL),(29,13,36),(30,13,37),(31,13,39),(32,13,41),(33,13,42),(34,13,47),(35,13,48),(36,13,49),(37,14,36),(38,14,37),(39,14,39),(40,14,41),(41,14,42),(42,14,47),(43,14,48),(44,14,49),(45,15,25),(46,15,26),(47,15,27),(48,15,28),(49,15,29),(50,15,30),(51,15,31),(52,15,32),(53,16,25),(54,16,26),(55,16,27),(56,16,28),(57,16,29),(58,16,30),(59,16,31),(60,16,32),(61,17,25),(62,17,26),(63,17,27),(64,17,28),(65,17,29),(66,17,30),(67,17,31),(68,17,32),(69,18,25),(70,18,26),(71,18,27),(72,18,28),(73,18,30),(74,18,32),(75,18,50),(76,18,51),(77,19,25),(78,19,26),(79,19,27),(80,19,28),(81,19,30),(82,19,32),(83,19,50),(84,19,51),(85,20,25),(86,20,26),(87,20,27),(88,20,30),(89,20,32),(90,20,50),(91,20,51),(92,20,52),(93,21,24),(94,21,33),(95,21,34),(96,21,35),(97,21,43),(98,21,44),(99,21,45),(100,21,46),(101,22,24),(102,22,33),(103,22,34),(104,22,35),(105,22,43),(106,22,44),(107,22,45),(108,22,46),(109,23,24),(110,23,33),(111,23,34),(112,23,35),(113,23,43),(114,23,44),(115,23,45),(116,23,46),(117,24,24),(118,24,33),(119,24,34),(120,24,35),(121,24,43),(122,24,44),(123,24,45),(124,24,46),(125,25,54),(126,25,55),(127,25,56),(128,25,57),(129,25,58),(130,25,59),(131,25,60),(132,25,61),(133,26,62),(134,26,63),(135,26,64),(136,26,65),(137,26,66),(138,26,67),(139,26,68),(140,26,72),(141,29,15),(142,29,16),(143,29,17),(144,29,73),(145,29,74),(146,30,62),(147,30,63),(148,30,64),(149,30,65),(150,30,66),(151,30,67),(152,30,68),(153,30,72),(154,31,62),(155,31,63),(156,31,64),(157,31,65),(158,31,66),(159,31,67),(160,31,68),(161,31,72),(162,32,62),(163,32,63),(164,32,64),(165,32,65),(166,32,66),(167,32,67),(168,32,68),(169,32,72),(170,33,62),(171,33,63),(172,33,64),(173,33,65),(174,33,66),(175,33,67),(176,33,68),(177,33,72),(178,34,62),(179,34,63),(180,34,64),(181,34,65),(182,34,66),(183,34,67),(184,34,68),(185,34,72),(186,35,62),(187,35,63),(188,35,64),(189,35,65),(190,35,66),(191,35,67),(192,35,68),(193,35,72),(194,36,36),(195,36,37),(197,36,39),(198,36,41),(199,36,42),(200,36,47),(209,38,36),(210,38,37),(211,38,39),(212,38,41),(213,38,42),(214,38,47),(215,38,48),(216,38,49),(217,39,36),(218,39,37),(219,39,39),(220,39,41),(221,39,42),(222,39,47),(223,39,48),(224,39,49);
/*!40000 ALTER TABLE `consulting_target_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulting_virtual_img`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting_virtual_img` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `is_selected` bit(1) DEFAULT NULL,
  `consulting_seq` int DEFAULT NULL,
  `portfolio_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK9e1pgsx6siw5x83r8su9d65yq` (`consulting_seq`),
  KEY `FKab50r34obwy6hwg5ebg32qmit` (`portfolio_seq`),
  CONSTRAINT `FK9e1pgsx6siw5x83r8su9d65yq` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`),
  CONSTRAINT `FKab50r34obwy6hwg5ebg32qmit` FOREIGN KEY (`portfolio_seq`) REFERENCES `designer_portfolio` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting_virtual_img`
--

LOCK TABLES `consulting_virtual_img` WRITE;
/*!40000 ALTER TABLE `consulting_virtual_img` DISABLE KEYS */;
INSERT INTO `consulting_virtual_img` VALUES (1,'14_36.png','14_36.png',_binary '\0',14,36),(2,'14_37.png','14_37.png',_binary '\0',14,37),(3,'14_39.png','14_39.png',_binary '',14,39),(4,'14_41.png','14_41.png',_binary '\0',14,41),(5,'14_42.png','14_42.png',_binary '\0',14,42),(6,'14_47.png','14_47.png',_binary '\0',14,47),(7,'14_48.png','14_48.png',_binary '\0',14,48),(8,'14_49.png','14_49.png',_binary '\0',14,49),(9,'20_25.png','20_25.png',_binary '\0',20,25),(10,'20_26.png','20_26.png',_binary '\0',20,26),(11,'20_27.png','20_27.png',_binary '\0',20,27),(12,'20_30.png','20_30.png',_binary '\0',20,30),(13,'20_32.png','20_32.png',_binary '\0',20,32),(14,'20_50.png','20_50.png',_binary '\0',20,50),(15,'20_51.png','20_51.png',_binary '\0',20,51),(16,'20_52.png','20_52.png',_binary '\0',20,52),(17,'38_18.png','38_18.png',_binary '\0',38,18),(18,'38_19.png','38_19.png',_binary '\0',38,19),(19,'38_20.png','38_20.png',_binary '\0',38,20),(20,'38_21.png','38_21.png',_binary '\0',38,21),(21,'38_22.png','38_22.png',_binary '\0',38,22),(22,'38_75.png','38_75.png',_binary '\0',38,75),(23,'38_76.png','38_76.png',_binary '\0',38,76),(24,'38_77.png','38_77.png',_binary '\0',38,77);
/*!40000 ALTER TABLE `consulting_virtual_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `id` varchar(255) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `face_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKo1kkcfnsno8rlnsjhw5kv4har` (`face_seq`),
  CONSTRAINT `FKo1kkcfnsno8rlnsjhw5kv4har` FOREIGN KEY (`face_seq`) REFERENCES `face_dict` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXMxMjMiLCJpYXQiOjE2OTIxNTgwNzksImV4cCI6MTY5MjE2NDA3OX0.edXmn8ogRfwzX9OxSFtKkdVIX_p0Het4lhWa5dF8Y-U','2023-08-14 07:05:33.700247','i0692631@naver.com','F','cus123',NULL,NULL,'고갱','$2a$10$d3HlvaF/SIL3XU88yQg5sOhX2dtPihwL6QnGgQ2RBsDth1w.i78tW',NULL,1),(2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0anN3bHM4MDYyIiwiaWF0IjoxNjkyMTg4MTY3LCJleHAiOjE2OTIxOTQxNjd9.1EGGWCFbELsgkWcAZJ385D8_e83gF-2Lg8NSKxPscXo','2023-08-14 07:15:22.239659','tjswls8062@naver.com','M','tjswls8062',NULL,NULL,'김선진','$2a$10$s16Tyr0K6AilUQyr0.DfQe0xHw8nyONs6kkn8WWXWuqudxTFYk43e',NULL,1),(3,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXMxMjM0IiwiaWF0IjoxNjkyMTk2OTU0LCJleHAiOjE2OTIyMDI5NTR9.BFHW8OPkW3un8k3Bwjjg2Lt_2ruZKgC2NsS27u9DkIc','2023-08-14 07:20:45.201851','i0692631@gmail.com','F','cus1234','1DB6D3F4-44D9-4F63-9C0C-32C2F87E94F8.jpg','1DB6D3F4-44D9-4F63-9C0C-32C2F87E94F8.jpg','류민지','$2a$10$iiUgXVW.ldkDBBZCip2BUOi4lTcqBHSjoUaezyN4pQfHMxke4zGZ2',NULL,5),(4,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3amgxMjI0IiwiaWF0IjoxNjkyMTk2MzM4LCJleHAiOjE2OTIyMDIzMzh9.buPv7D6GpCvBOLnL7stOsLYUl4smXroLvQPJxRu7LjY','2023-08-14 07:23:47.094893','wjh5296@gmail.com','M','wjh1224','이수혁.png','이수혁.png','원재현','$2a$10$GNi50AI2Qj1GO8ZeLy/QB.cUPJA8EigG3nFnGNEQwuEf1VDvM4bAm',NULL,1),(5,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VydHkxIiwiaWF0IjoxNjkyMTk3ODg3LCJleHAiOjE2OTIyMDM4ODd9.bAJn5AbujXcz-aTfFq2XS-om7d56pdVPhNtnxXJc8T4','2023-08-14 07:42:14.949269','98hajin@naver.com','F','qwerty1',NULL,NULL,'김하진','$2a$10$kIe8MynNA6ZPztY.qw/RauSYSb0RpSkcsTHxVqAyleJO9nxuULMn2',NULL,2),(6,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLshqHsp4DsnKQiLCJpYXQiOjE2OTIxOTg5OTcsImV4cCI6MTY5MjIwNDk5N30.8d5Ql2hV9R5dABLyMvPzKrG3JrCrYntx0n_F7ncFyko','2023-08-14 07:45:39.235519','wldbs8241@gmail.com','F','송지윤','53a528cd-ae18-43ab-a47f-0e4328b65d59.jpg','53a528cd-ae18-43ab-a47f-0e4328b65d59.jpg','송지윤','$2a$10$NUPanIHfPC5xmL.twFGHOeWJgm.7YS0bhv4EQtFgvgcLOmYcKwVY6',NULL,1),(7,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFhYSIsImlhdCI6MTY5MjAyMTMyMywiZXhwIjoxNjkyMDI3MzIzfQ.VmKYm0K6XvkDWGE4cOhbsyuspXq8k4YZIf1h0T09v-8','2023-08-14 08:22:03.200407','aaaaa@ssafy.com','F','aaaaa',NULL,NULL,'전지현','$2a$10$.8lncw4jf9QrjPW1dtGXkeQZEKPvamaB0gOvuamDI41mFRJGxMeF2',NULL,1),(8,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYmJiYiIsImlhdCI6MTY5MjAwMjE0NCwiZXhwIjoxNjkyMDA4MTQ0fQ.DWE_y9uTwOlxtu7SPv-1koQtO8LKD_44sHGWHs5ocNM','2023-08-14 08:35:29.887943','bbbbb@ssafy.com','F','bbbbb',NULL,NULL,'송혜교','$2a$10$YsLcWdWMqn3n/7N.8I6n4uRUcCLFPER8eZboIxBSm86zPm0obe0u.',NULL,1),(9,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjY2NjYyIsImlhdCI6MTY5MjAwMzEwMywiZXhwIjoxNjkyMDA5MTAzfQ.mf7QeoU9lOYonzE-AXT_VxyscmUGJgys2XCPgT7L8sw','2023-08-14 08:51:33.685897','ccccc@ssafy.com','F','ccccc',NULL,NULL,'김태희','$2a$10$aUXdWBzlYzdStelbeYo2desXCDa1Q0oc9IafOrkA9ZT.gf7nwHhDO',NULL,1),(10,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZGRkZCIsImlhdCI6MTY5MjAxMjY0MywiZXhwIjoxNjkyMDE4NjQzfQ.2skySW2n1xv2GD_59IW4en2ZNtirY184Yl-TUSLjBUg','2023-08-14 11:29:56.126505','ddddd@ssafy.com','F','ddddd',NULL,NULL,'한소희','$2a$10$.VyljAAWcMbFCuvrmYG/A.jkgJW90RPGsBRT11YqrcmcWV8aIvjGm',NULL,1),(11,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTEyMzQiLCJpYXQiOjE2OTIwMTc5MTcsImV4cCI6MTY5MjAyMzkxN30.zMfKw_lYIaD9vdHbYaYgqckPazK7CXHAZurR36BN69o','2023-08-14 12:58:17.485565','ssafy1234@naver.com','M','ssafy1234',NULL,NULL,'제발되라김선진','$2a$10$VkUbRe10l/h9p23rjkc38.z1fwsB8kTLRYJtUzapsP7scNTHqbPU.',NULL,1),(12,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZWVlZSIsImlhdCI6MTY5MjAxODAyMiwiZXhwIjoxNjkyMDI0MDIyfQ.UhdkEHkVuqPV8Mv7OrXUA-WukDFdy5VHYuTKy_j79Ck','2023-08-14 13:00:12.589062','eeeee@ssafy.com','M','eeeee',NULL,NULL,'선선진','$2a$10$m5JoAjrrxRtqDOtOJ7acqe78eM.Cw5wmdtW2OWRMkXUsHymeIFQPq',NULL,1),(13,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZmZmZiIsImlhdCI6MTY5MjAxODE3OCwiZXhwIjoxNjkyMDI0MTc4fQ.LJKH7KVN_FonK-k3g--O4cZCCDNJwziXa-Yy3q5zX0U','2023-08-14 13:02:50.816121','fffff@ssafy.com','M','fffff',NULL,NULL,'원재현','$2a$10$g71UV3lYY/2PY1J7XV6lXueFnQQq3tjQFRwUqjq9wxrnWy9nKzG.G',NULL,1),(14,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZ2dnZyIsImlhdCI6MTY5MjAxODMwOSwiZXhwIjoxNjkyMDI0MzA5fQ.rMllDKjibVQKolTMltTPIlek_QUt1NJA5a2smrecTeg','2023-08-14 13:05:00.411870','ggggg@naver.com','M','ggggg',NULL,NULL,'킴선진','$2a$10$ZiAX3R/YelW1CHH1e0CtUe4r8/M9yMtvC5T4WS80jlLk5pVSsT.Om',NULL,1),(15,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaGhoaCIsImlhdCI6MTY5MjAxODU0MiwiZXhwIjoxNjkyMDI0NTQyfQ.0EzgPgoGe8uQ1Y2Hp5ZQt7PsF5CvyVBxiZy-8wkPfmg','2023-08-14 13:08:38.590845','hhhhh@naver.com','M','hhhhh',NULL,NULL,'킴선진','$2a$10$4ezxbyJAmDmA91wz30Iad.GzpDlu/8bQhhcn/HMqOF5F6trn2KJfi',NULL,1),(16,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTEyMzQ1IiwiaWF0IjoxNjkyMDE4ODI1LCJleHAiOjE2OTIwMjQ4MjV9.O9gL4P7jJDP_CwYXgTMrD-fyqdfCNy6afQq4-kgh8jU','2023-08-14 13:13:32.101321','ssafy12345@naver.com','M','ssafy12345',NULL,NULL,'선진아넌할수있어','$2a$10$jFZIAEbmxkqZjEmXgqc1nujXx6VMWdCa.PdLU8R7rLv4e7PAN7H/y',NULL,1),(17,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqampqaiIsImlhdCI6MTY5MjAxODg1NiwiZXhwIjoxNjkyMDI0ODU2fQ.VpVdgeA0oXV4ql_2nLNxoAoDphHANK9ndf4_zxwRppQ','2023-08-14 13:14:03.463651','jjjjj@ssafy.com','M','jjjjj',NULL,NULL,'선진킴','$2a$10$mL24yGqh55HQJkHnncejueCz2Yqcy0EodH7eZzPCpmkmDHDh.m9qe',NULL,1),(18,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ODA2MiIsImlhdCI6MTY5MjAyMzY0MiwiZXhwIjoxNjkyMDI5NjQyfQ.4K6x5LWCzq3y5ErbzBsIkD4ZDVpDHWnifhVgNq9diHU','2023-08-14 14:33:48.241039','tjswls8062@skuniv.ac.kr','M','test8062',NULL,NULL,'선진테스트','$2a$10$VNXzc9bKSMjR2gdFNaM9/.tQP9c6gsZFizL.BkKMVpLPKvNNLjpY2',NULL,1),(19,NULL,'2023-08-14 15:56:35.322672','qwer1234@naver.com','F','qwer1234',NULL,NULL,'민지','$2a$10$cbOIPwX5oMca5xUOKCEC2.SgF2q/ufwGuq68qqZItkFGMTWrjEqLC',NULL,1),(20,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2UxMjMiLCJpYXQiOjE2OTIwMjg2NjEsImV4cCI6MTY5MjAzNDY2MX0.nRpOZiFJnHeM9bX_avSqymKSwiOXxgBpH0eJJSlL4t8','2023-08-14 15:57:32.326871','qwe123@naver.com','M','qwe123',NULL,NULL,'민지','$2a$10$hasYd1I4azvmU1tw7tX.5eT3CpW26QmKu5waDklBaZmxdbI5vmlOO',NULL,1),(21,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnKDri4giLCJpYXQiOjE2OTIxOTQ1MDMsImV4cCI6MTY5MjIwMDUwM30.Tid2SRfHM6438wbsl4jpSAel69JN61yoDevMAKcwiBs','2023-08-14 18:31:28.651680','wldbs82@naver.com','F','유니',NULL,NULL,'유니','$2a$10$z5kiTBCJBpWs1DEzZ1FARuNN33lyYOEibeKbXMNCT92jFTQmJKY8q',NULL,1),(23,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aG9yIiwiaWF0IjoxNjkyMTk0NDg3LCJleHAiOjE2OTIyMDA0ODd9.Hk7m1vwSn8LNqQk0qQMQQkxohmGKJOCjpGiKht6lRnA','2023-08-16 12:19:48.715696','tjswls8062@gmail.com','M','thor',NULL,NULL,'김선진','$2a$10$UIBrFkJuo0ynNJq4piH3BuZIkcFd0lgWAKKsS/vpvd14b6Z8yUtcm',NULL,1),(24,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaWFpMjMiLCJpYXQiOjE2OTIxOTc2MDEsImV4cCI6MTY5MjIwMzYwMX0.DXNb89Y-sEYtXEdBjscSoJM-AI1TD5RLWoaJQgoUeVo','2023-08-16 12:56:50.920406','miai23@naver.com','M','miai23','이수혁2.png','이수혁2.png','원재현','$2a$10$BnbhuMDJYyeOXUlWrSvaoOk4brhhy.KEDd04CCUa/iq4WMto2YYb6',NULL,3);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_alert`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_alert` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `checked_date` datetime(6) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `is_check` bit(1) DEFAULT NULL,
  `consulting_seq` int DEFAULT NULL,
  `customer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKsnmqv1x3pc8n46qenb0kket44` (`consulting_seq`),
  KEY `FKbcuesf9hgxvl5n7h700j62xr` (`customer_seq`),
  CONSTRAINT `FKbcuesf9hgxvl5n7h700j62xr` FOREIGN KEY (`customer_seq`) REFERENCES `customer` (`seq`),
  CONSTRAINT `FKsnmqv1x3pc8n46qenb0kket44` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_alert`
--

LOCK TABLES `customer_alert` WRITE;
/*!40000 ALTER TABLE `customer_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_hair_condition`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_hair_condition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_seq` int DEFAULT NULL,
  `hair_condition_seq` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK26e06xp5l9gjj4tkgglf5ijlj` (`customer_seq`),
  KEY `FKbxu3b1kd44cuab5w8788y5dlk` (`hair_condition_seq`),
  CONSTRAINT `FK26e06xp5l9gjj4tkgglf5ijlj` FOREIGN KEY (`customer_seq`) REFERENCES `customer` (`seq`),
  CONSTRAINT `FKbxu3b1kd44cuab5w8788y5dlk` FOREIGN KEY (`hair_condition_seq`) REFERENCES `hair_condition_dict` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_hair_condition`
--

LOCK TABLES `customer_hair_condition` WRITE;
/*!40000 ALTER TABLE `customer_hair_condition` DISABLE KEYS */;
INSERT INTO `customer_hair_condition` VALUES (4,4,3),(5,4,4),(6,3,9),(7,3,2),(8,6,7),(9,6,10),(10,6,9),(11,24,3),(12,24,8),(13,5,2),(14,5,5),(15,5,6);
/*!40000 ALTER TABLE `customer_hair_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `certification_num` varchar(255) DEFAULT NULL,
  `cost` int DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `review_score` double DEFAULT NULL,
  `salon_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer`
--

LOCK TABLES `designer` WRITE;
/*!40000 ALTER TABLE `designer` DISABLE KEYS */;
INSERT INTO `designer` VALUES (1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLshqHsp4DsnKQiLCJpYXQiOjE2OTIxNTc0MDQsImV4cCI6MTY5MjE2MzQwNH0.4ZPnXpSl33iwDS2_L4wmRoinZ1s590kC0gklZZGctbI',NULL,'990914',8000,'2023-08-14 07:02:52.874339','wldbs8241@naver.com','F','송지윤','112401902.2.jpg','112401902.2.jpg','탈색 전문 디자이너 지윤입니다 ✨',36.3505388992836,127.38483484675,'송지윤','$2a$10$XSoAPbvxtDAw3dI7XIoLpegCBvOxfEgslqtwmtijIuPAshgCD9VL6',5,'손수헤어'),(2,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaWx5MTIzIiwiaWF0IjoxNjkyMTk2NDk1LCJleHAiOjE2OTIyMDI0OTV9.KEidoUq5wJgH8EHEd5Aucn9SQGSQ85_Jao3velv-2aQ','대전 동구 가양남로13번길 81','213564684321',9000,'2023-08-14 07:04:50.518337','i0692631@naver.com','F','lily123','IMG_6057.jpeg','IMG_6057.jpeg','!!! 인생 헤어 찾아드려요 :)',36.3428723597666,127.44566978124,'민지','$2a$10$U/bBMzJLrtaSe8yCYdHB3OpkKD62MSTlIm2OQg.bJQ9UVqrv90RUS',5,'차홍'),(3,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3amgxMjI0IiwiaWF0IjoxNjkyMjAwMDc3LCJleHAiOjE2OTIyMDYwNzd9.gcLNaHF8RGQBAVpTv4m72KlgF4oeJK_p1jN81ojFyL0','대전 유성구 학하중앙로 21','1234',6000,'2023-08-14 07:07:19.455604','wjh5296@gmail.com','M','wjh1224','원재현 증명사진.jpg','원재현 증명사진.jpg','안녕하세요!',36.3484062434513,127.298947763002,'원재현','$2a$10$FuNundlUFus8HCq9Vps0fObRprdsCZRtQHtuHNQDorgtN8ljF5zxu',5,'로이드밤'),(4,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5OGhhamluIiwiaWF0IjoxNjkyMTg4MTkxLCJleHAiOjE2OTIxOTQxOTF9.YuAe-gUbZSEsrvlQ9lqE94PHN0HTLnTkIJDS3WTyoI0','대전 유성구 학하중앙로 5','987654321',5000,'2023-08-14 07:27:19.894689','98hajin@naver.com','F','98hajin','2.jpg','2.jpg','남성 커트 전문 디자이너 하진입니다 ^__^',36.3489884890015,127.297324413194,'하진','$2a$10$6Pn9YaVmI8pZrAOJG/Fj3O1u9iAGlHPUjcBndo3r6H6kAi3up9b46',5,'지니헤어'),(5,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHUiLCJpYXQiOjE2OTIxOTE2NTksImV4cCI6MTY5MjE5NzY1OX0.gJ7sW8MbUgsDRGLrls-BZAWtFXVQpXfrF4SSdHeTRRo','대전 유성구 동서대로 639','1111',5000,'2023-08-14 14:27:19.871676','chuchu@gmail.com','M','chu','장발.jpg','장발.jpg','아이롱펌 전문입니다. 친절하게 상담해드릴게요!',36.333056192309,127.333649072247,'이동욱','$2a$10$tqeeM8vH7n3OjVQAyyzlneI7prF5QB6IgMZ2R41ANYAVixnMCsSBi',5,'SJ뷰티헤어'),(6,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0anN3bHM4MDYyIiwiaWF0IjoxNjkyMTY2NTAzLCJleHAiOjE2OTIxNzI1MDN9.vxLC308naF7zKbczez2h0RnG0lh574T-eW3l0_r5MSM',NULL,'12345678',5000,'2023-08-14 14:31:10.184971','tjswls8062@naver.com','M','tjswls8062','KakaoTalk_20230816_151624396.jpg','KakaoTalk_20230816_151624396.jpg',NULL,NULL,NULL,'김선진','$2a$10$pDEscBKRrlboNBaiBFuHJ.Q3WeQ/dgHKXdQ1hVDKuHATNvww19lle',5,NULL),(7,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnKDri4giLCJpYXQiOjE2OTIxOTg4MjcsImV4cCI6MTY5MjIwNDgyN30.SjCnWyL1JBgogg6NoQ6U6iah_GrdoSUWUNLMQ3sb2Qo','대전 서구 월평로13번길 42','990914',12000,'2023-08-14 14:42:35.525718','wldbs8241@gmail.com','F','유니','img.jpg','img.jpg','차홍 수석디자이너 유니입니다 :)~',36.3568739258538,127.358635551017,'유니','$2a$10$0zABvMieCqyEEr36SdkPNezk8UXQZst1Ma9sHbpVrK6PqO2SokUs2',4.5,'준오헤어'),(8,NULL,NULL,'11111',5000,'2023-08-15 09:46:47.905316','miai23@naver.com','M','chuchu','이수혁2.png','이수혁2.png',NULL,NULL,NULL,'이수혁','$2a$10$V0Uux.p8pXD59vYHXYSBruunHNOYVjoqxaCuy1wKSQ4Aw6PaTYGbG',5,NULL),(10,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3amg1Mjk2IiwiaWF0IjoxNjkyMTU4NjM5LCJleHAiOjE2OTIxNjQ2Mzl9.3m_qYIbQCUg3y-JI4HbOA3asKiuB3757DnbUyTi3lic','대전 유성구 학하중앙로 21','1111',5000,'2023-08-15 09:49:58.205527','miai23@gmail.com','M','wjh5296','김우빈.png','김우빈.png','안녕하세요!',36.3484054259895,127.2989503221,'김장호','$2a$10$M.qgagtV2cNrXpagmNziBeUPJDoidmn1pqrORvPvBZGUfTuBsKx4W',5,'차홍'),(11,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLrpZjsirnrspQiLCJpYXQiOjE2OTIxOTEzMTUsImV4cCI6MTY5MjE5NzMxNX0.9nFIWZooiU8zHAFgMzZ499LdpK0svHyoI3PeWDBoGxo','대전 유성구 노은로 150','1111',5000,'2023-08-15 10:01:03.442439','wjh52961@gmail.com','M','류승범','류승범.png','류승범.png','친절하고 디테일한 상담으로 고객만족 실천하자!',36.3729364285756,127.318408827921,'류승범','$2a$10$5KxTPXteto0e5V5DmOaBPemO0QR5DsM/4Mp7MZZXsTXlo5Vu/TTEe',4.833333333333333,'승범헤어샵'),(12,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbGxhIiwiaWF0IjoxNjkyMTg3NjY1LCJleHAiOjE2OTIxOTM2NjV9.0kDsGZqWm7pOCNC6ZUFwBo1m3AWeqXfemWEhKHY3cAw','대전 유성구 한밭대로 502','990914',9900,'2023-08-16 12:00:45.772005','wldbs8241@icloud.com','F','ella','블랙핑크_지수_배우_프로필_4.jpeg','블랙핑크_지수_배우_프로필_4.jpeg','10여년의 경력을 바탕으로 고객에게 신뢰를 주는 디자이너 ella입니다🙂',36.3584023856827,127.354171588147,'ella','$2a$10$AsU8hErAliWVMPKt9EZ.lOsKzm4t98jzZVt2200WGpCDTnSxqxBXG',5,'에비수헤어');
/*!40000 ALTER TABLE `designer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer_alert`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_alert` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `checked_date` datetime(6) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `is_check` bit(1) DEFAULT NULL,
  `consulting_seq` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKgrv8qjghq6ksicyex8mmkwh6a` (`consulting_seq`),
  KEY `FKi1mn6x94vwtxpf1y72au5xmjb` (`designer_seq`),
  CONSTRAINT `FKgrv8qjghq6ksicyex8mmkwh6a` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`),
  CONSTRAINT `FKi1mn6x94vwtxpf1y72au5xmjb` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_alert`
--

LOCK TABLES `designer_alert` WRITE;
/*!40000 ALTER TABLE `designer_alert` DISABLE KEYS */;
INSERT INTO `designer_alert` VALUES (1,NULL,'2023-08-14 12:54:22.514403',_binary '\0',1,1),(2,NULL,'2023-08-16 06:10:50.773640',_binary '',30,11),(3,NULL,'2023-08-16 06:22:09.751807',_binary '',31,11),(4,NULL,'2023-08-16 06:35:45.274536',_binary '',32,11),(5,NULL,'2023-08-16 06:43:46.379114',_binary '\0',33,11),(6,NULL,'2023-08-16 07:20:25.652247',_binary '\0',35,11),(7,NULL,'2023-08-16 13:43:32.526127',_binary '',36,7);
/*!40000 ALTER TABLE `designer_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer_fixed_slot`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_fixed_slot` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `day` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK5bp64y9hy5lc3myfhp2njda42` (`designer_seq`),
  CONSTRAINT `FK5bp64y9hy5lc3myfhp2njda42` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_fixed_slot`
--

LOCK TABLES `designer_fixed_slot` WRITE;
/*!40000 ALTER TABLE `designer_fixed_slot` DISABLE KEYS */;
/*!40000 ALTER TABLE `designer_fixed_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer_like`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_like` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `like_status` bit(1) DEFAULT NULL,
  `customer_seq` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKna6ak1o3br51sj5gdbtngu2rm` (`customer_seq`),
  KEY `FK7qajaxp2u0hemnqlfxiek2epu` (`designer_seq`),
  CONSTRAINT `FK7qajaxp2u0hemnqlfxiek2epu` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`),
  CONSTRAINT `FKna6ak1o3br51sj5gdbtngu2rm` FOREIGN KEY (`customer_seq`) REFERENCES `customer` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_like`
--

LOCK TABLES `designer_like` WRITE;
/*!40000 ALTER TABLE `designer_like` DISABLE KEYS */;
INSERT INTO `designer_like` VALUES (1,'2023-08-14 08:41:47.815770',_binary '',5,1),(2,'2023-08-14 11:43:59.232556',_binary '\0',3,2),(3,'2023-08-14 11:44:57.053271',_binary '',3,4),(4,'2023-08-14 12:16:30.230684',_binary '\0',2,2),(5,'2023-08-14 14:43:18.205286',_binary '',18,6),(6,'2023-08-14 17:10:13.841830',_binary '',6,7),(7,'2023-08-15 05:45:46.889422',_binary '',2,6),(8,'2023-08-15 13:36:13.476701',_binary '',3,1),(9,'2023-08-15 15:15:00.054471',_binary '',4,7),(10,'2023-08-15 16:22:31.935298',_binary '',7,1),(11,'2023-08-15 17:27:39.025846',_binary '',4,6),(12,'2023-08-15 17:29:05.506272',_binary '',2,7),(13,'2023-08-16 07:01:50.768340',_binary '',4,11),(14,'2023-08-16 12:31:36.054386',_binary '',6,12),(15,'2023-08-16 12:31:42.820917',_binary '',6,1),(16,'2023-08-16 12:31:43.421818',_binary '',4,1),(17,'2023-08-16 12:31:45.730121',_binary '',4,2),(18,'2023-08-16 12:31:46.901746',_binary '',4,3),(19,'2023-08-16 12:31:48.625346',_binary '',4,4),(20,'2023-08-16 12:31:50.148232',_binary '',4,5),(21,'2023-08-16 12:31:53.151686',_binary '',4,8),(22,'2023-08-16 12:31:53.964403',_binary '',4,10),(23,'2023-08-16 12:31:55.688185',_binary '',4,12),(24,'2023-08-16 12:33:14.603318',_binary '',23,12),(25,'2023-08-16 12:34:10.328697',_binary '',23,1),(26,'2023-08-16 12:34:15.773366',_binary '',23,4),(27,'2023-08-16 12:34:19.180818',_binary '',23,7),(28,'2023-08-16 13:18:13.528274',_binary '',24,1),(29,'2023-08-16 13:18:19.270289',_binary '',24,2),(30,'2023-08-16 13:18:24.646653',_binary '',24,12),(31,'2023-08-16 13:18:26.747720',_binary '',24,7);
/*!40000 ALTER TABLE `designer_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer_portfolio`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_portfolio` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `orders` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKktd0t0rl81ny583uhpafxnvhm` (`designer_seq`),
  CONSTRAINT `FKktd0t0rl81ny583uhpafxnvhm` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_portfolio`
--

LOCK TABLES `designer_portfolio` WRITE;
/*!40000 ALTER TABLE `designer_portfolio` DISABLE KEYS */;
INSERT INTO `designer_portfolio` VALUES (4,'2023-08-14 07:14:46.791361','p_4.png','p_4.png',NULL,1),(8,'2023-08-14 07:22:57.730052','p_8.png','p_8.png',NULL,1),(9,'2023-08-14 07:23:08.534681','p_9.png','p_9.png',NULL,1),(14,'2023-08-14 07:30:00.140690','p_14.png','p_14.png',NULL,1),(15,'2023-08-14 08:45:12.485228','p_15.png','p_15.png',NULL,4),(16,'2023-08-14 08:45:15.798293','p_16.png','p_16.png',NULL,4),(17,'2023-08-14 08:45:28.423691','p_17.png','p_17.png',NULL,4),(18,'2023-08-14 11:58:37.477230','p_18.png','p_18.png',NULL,2),(19,'2023-08-14 11:58:57.555892','p_19.png','p_19.png',NULL,2),(20,'2023-08-14 11:59:07.001932','p_20.png','p_20.png',NULL,2),(21,'2023-08-14 11:59:18.236249','p_21.png','p_21.png',NULL,2),(22,'2023-08-14 12:17:05.451380','p_22.png','p_22.png',NULL,2),(23,'2023-08-14 13:49:40.475365','p_23.png','p_23.png',NULL,1),(24,'2023-08-14 14:27:49.135785','p_24.png','p_24.png',NULL,5),(25,'2023-08-14 14:31:37.206655','p_25.png','p_25.png',NULL,6),(26,'2023-08-14 14:31:41.579394','p_26.png','p_26.png',NULL,6),(27,'2023-08-14 14:31:49.851877','p_27.png','p_27.png',NULL,6),(28,'2023-08-14 14:31:55.404344','p_28.png','p_28.png',NULL,6),(29,'2023-08-14 14:32:02.146373','p_29.png','p_29.png',NULL,6),(30,'2023-08-14 14:32:11.291571','p_30.png','p_30.png',NULL,6),(31,'2023-08-14 14:32:22.236109','p_31.png','p_31.png',NULL,6),(32,'2023-08-14 14:32:25.176022','p_32.png','p_32.png',NULL,6),(33,'2023-08-14 14:39:03.223355','p_33.png','p_33.png',NULL,5),(34,'2023-08-14 14:39:08.159468','p_34.png','p_34.png',NULL,5),(35,'2023-08-14 14:39:21.754314','p_35.png','p_35.png',NULL,5),(36,'2023-08-14 14:44:21.539419','p_36.png','p_36.png',NULL,7),(37,'2023-08-14 14:44:26.997882','p_37.png','p_37.png',NULL,7),(39,'2023-08-14 14:44:39.868116','p_39.png','p_39.png',NULL,7),(41,'2023-08-14 14:44:58.327094','p_41.png','p_41.png',NULL,7),(42,'2023-08-14 14:45:05.390558','p_42.png','p_42.png',NULL,7),(43,'2023-08-14 14:45:18.077582','p_43.png','p_43.png',NULL,5),(44,'2023-08-14 14:47:54.124914','p_44.png','p_44.png',NULL,5),(45,'2023-08-14 14:53:23.355477','p_45.png','p_45.png',NULL,5),(46,'2023-08-14 14:56:21.570281','p_46.png','p_46.png',NULL,5),(47,'2023-08-14 15:06:37.102681','p_47.png','p_47.png',NULL,7),(48,'2023-08-14 15:08:13.264722','p_48.png','p_48.png',NULL,7),(49,'2023-08-14 17:09:49.113480','p_49.png','p_49.png',NULL,7),(50,'2023-08-15 05:52:50.499288','p_50.png','p_50.png',NULL,6),(51,'2023-08-15 05:53:56.377272','p_51.png','p_51.png',NULL,6),(52,'2023-08-15 06:00:55.080425','p_52.png','p_52.png',NULL,6),(53,'2023-08-15 09:44:38.134530','p_53.png','p_53.png',NULL,5),(54,'2023-08-15 09:50:13.797044','p_54.png','p_54.png',NULL,10),(55,'2023-08-15 09:50:16.587045','p_55.png','p_55.png',NULL,10),(56,'2023-08-15 09:50:21.140564','p_56.png','p_56.png',NULL,10),(57,'2023-08-15 09:50:24.957209','p_57.png','p_57.png',NULL,10),(58,'2023-08-15 09:50:29.463074','p_58.png','p_58.png',NULL,10),(59,'2023-08-15 09:50:33.024338','p_59.png','p_59.png',NULL,10),(60,'2023-08-15 09:50:39.822939','p_60.png','p_60.png',NULL,10),(61,'2023-08-15 09:51:52.827731','p_61.png','p_61.png',NULL,10),(62,'2023-08-15 10:01:32.714608','p_62.png','p_62.png',NULL,11),(63,'2023-08-15 10:01:37.529694','p_63.png','p_63.png',NULL,11),(64,'2023-08-15 10:01:41.312072','p_64.png','p_64.png',NULL,11),(65,'2023-08-15 10:01:58.319621','p_65.png','p_65.png',NULL,11),(66,'2023-08-15 10:02:02.077397','p_66.png','p_66.png',NULL,11),(67,'2023-08-15 10:02:06.998437','p_67.png','p_67.png',NULL,11),(68,'2023-08-15 10:02:10.903431','p_68.png','p_68.png',NULL,11),(72,'2023-08-15 10:02:45.416647','p_72.png','p_72.png',NULL,11),(73,'2023-08-15 17:11:25.700229','p_73.png','p_73.png',NULL,4),(74,'2023-08-15 17:11:34.231621','p_74.png','p_74.png',NULL,4),(75,'2023-08-16 14:35:42.948064','p_75.png','p_75.png',NULL,2),(76,'2023-08-16 14:36:49.160305','p_76.png','p_76.png',NULL,2),(77,'2023-08-16 14:36:55.044365','p_77.png','p_77.png',NULL,2);
/*!40000 ALTER TABLE `designer_portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designer_tag_info`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designer_tag_info` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  `hair_style_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK8s6hg81c3dtplot3fcw7gaej3` (`designer_seq`),
  KEY `FK4q7v88l6ivpdvncicrmscvvec` (`hair_style_seq`),
  CONSTRAINT `FK4q7v88l6ivpdvncicrmscvvec` FOREIGN KEY (`hair_style_seq`) REFERENCES `hair_style_dict` (`seq`),
  CONSTRAINT `FK8s6hg81c3dtplot3fcw7gaej3` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designer_tag_info`
--

LOCK TABLES `designer_tag_info` WRITE;
/*!40000 ALTER TABLE `designer_tag_info` DISABLE KEYS */;
INSERT INTO `designer_tag_info` VALUES (28,'2023-08-15 09:56:27.015141',10,1),(29,'2023-08-15 09:56:27.039092',10,2),(30,'2023-08-15 09:56:27.043385',10,6),(31,'2023-08-15 09:56:27.047044',10,7),(48,'2023-08-16 03:49:35.973583',2,1),(49,'2023-08-16 03:49:35.976194',2,3),(50,'2023-08-16 03:49:35.978760',2,7),(51,'2023-08-16 03:49:35.980991',2,8),(52,'2023-08-16 03:50:54.059213',7,2),(53,'2023-08-16 03:50:54.061998',7,3),(54,'2023-08-16 03:50:54.064297',7,5),(55,'2023-08-16 12:06:54.477824',12,2),(56,'2023-08-16 12:06:54.483808',12,4),(57,'2023-08-16 12:06:54.486631',12,5),(58,'2023-08-16 12:06:54.489103',12,10),(59,'2023-08-16 12:06:54.491344',12,9),(60,'2023-08-16 13:12:40.987648',11,4),(61,'2023-08-16 13:12:40.992818',11,3),(62,'2023-08-16 13:12:40.995341',11,9),(63,'2023-08-16 13:12:40.997844',11,10),(64,'2023-08-16 13:12:41.000473',11,7),(65,'2023-08-16 13:16:36.770656',5,4),(66,'2023-08-16 13:16:36.773209',5,1),(67,'2023-08-16 13:16:36.775368',5,5),(68,'2023-08-16 13:16:36.777501',5,6),(79,'2023-08-16 14:41:46.205434',4,1),(80,'2023-08-16 14:41:46.230712',4,2),(81,'2023-08-16 14:41:46.235162',4,7),(82,'2023-08-16 14:41:46.238896',4,11),(83,'2023-08-16 14:41:46.242702',4,23),(84,'2023-08-16 14:43:31.284083',3,1),(85,'2023-08-16 14:43:31.287488',3,3),(86,'2023-08-16 14:43:31.290651',3,21),(87,'2023-08-16 14:43:31.293946',3,17),(88,'2023-08-16 14:43:31.296754',3,5),(89,'2023-08-16 14:43:31.299249',3,19),(90,'2023-08-16 14:43:31.301797',3,6);
/*!40000 ALTER TABLE `designer_tag_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `confusion_img_path` varchar(255) DEFAULT NULL,
  `customer_seq` int DEFAULT NULL,
  `input_img_path` varchar(255) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `target_img_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,NULL,1,'1.png',3,'1.png'),(2,'2.png',2,'2.png',4,'2.png'),(3,'3.png',3,'3.png',4,'3.png'),(4,NULL,4,'4.png',2,'4.png'),(5,'5.png',5,'5.png',4,'5.png'),(6,NULL,6,'6.png',3,'6.png'),(7,NULL,7,'7.png',3,'7.png'),(8,NULL,8,'8.png',3,'8.png'),(9,NULL,9,'9.png',3,'9.png'),(10,NULL,10,NULL,0,NULL),(11,NULL,12,'12.png',1,NULL),(12,NULL,13,NULL,0,NULL),(13,NULL,14,'14.png',3,'14.png'),(14,NULL,15,'15.png',3,'15.png'),(15,NULL,11,'11.png',1,NULL),(16,NULL,17,'17.png',3,'17.png'),(17,NULL,16,'16.png',3,'16.png'),(18,NULL,21,'21.png',1,NULL),(20,'23.png',23,'23.png',4,'23.png');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `face_dict`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `face_dict` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `face_label` varchar(255) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `face_dict`
--

LOCK TABLES `face_dict` WRITE;
/*!40000 ALTER TABLE `face_dict` DISABLE KEYS */;
INSERT INTO `face_dict` VALUES (1,'역삼각형','face1.png','face1.png'),(2,'계란형','face2.png','face2.png'),(3,'긴 얼굴형','face3.png','face3.png'),(4,'둥근형','face4.png','face4.png'),(5,'각진형','face5.png','face5.png'),(6,'선택안함','face6.png','face6.png');
/*!40000 ALTER TABLE `face_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_condition_dict`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_condition_dict` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_condition_dict`
--

LOCK TABLES `hair_condition_dict` WRITE;
/*!40000 ALTER TABLE `hair_condition_dict` DISABLE KEYS */;
INSERT INTO `hair_condition_dict` VALUES (1,'선택 안함'),(2,'얇은 모발'),(3,'굵은 모발'),(4,'두피 각질'),(5,'모발 힘 부족'),(6,'모발 갈라짐'),(7,'탈색모'),(8,'곱슬'),(9,'반곱슬'),(10,'염색모');
/*!40000 ALTER TABLE `hair_condition_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_style_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_style_category` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_style_category`
--

LOCK TABLES `hair_style_category` WRITE;
/*!40000 ALTER TABLE `hair_style_category` DISABLE KEYS */;
INSERT INTO `hair_style_category` VALUES (1,'펌'),(2,'컷');
/*!40000 ALTER TABLE `hair_style_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_style_dict`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_style_dict` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `gender` char(1) DEFAULT NULL,
  `hair_style_label` varchar(255) DEFAULT NULL,
  `hair_style_category_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK77j20a6oikjyma06v37trpudy` (`hair_style_category_seq`),
  CONSTRAINT `FK77j20a6oikjyma06v37trpudy` FOREIGN KEY (`hair_style_category_seq`) REFERENCES `hair_style_category` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_style_dict`
--

LOCK TABLES `hair_style_dict` WRITE;
/*!40000 ALTER TABLE `hair_style_dict` DISABLE KEYS */;
INSERT INTO `hair_style_dict` VALUES (1,'F','젤리펌',1),(2,'F','히피펌',1),(3,'M','가르마펌',1),(4,'M','쉐도우펌',1),(5,'F','레이어드컷',2),(6,'F','허쉬컷',2),(7,'M','가일컷',2),(8,'M','울프컷',2),(9,'F','중단발',2),(10,'F','단발',2),(11,'M','투블럭',2),(12,'M','리프컷',2),(13,'M','애즈펌',1),(14,'F','긴머리 C컬',1),(15,'F','긴머리 S컬',1),(16,'M','포마드펌',1),(17,'M','아이롱펌',1),(18,'F','숏컷',2),(19,'F','히메컷',2),(20,'F','레인펌',1),(21,'F','구름펌',1),(22,'F','버드컷',2),(23,'F','윈드컷',2);
/*!40000 ALTER TABLE `hair_style_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hair_style_img`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_style_img` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `hair_style_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK7gtlf4850rvkruyr5frbdu4l0` (`hair_style_seq`),
  CONSTRAINT `FK7gtlf4850rvkruyr5frbdu4l0` FOREIGN KEY (`hair_style_seq`) REFERENCES `hair_style_dict` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_style_img`
--

LOCK TABLES `hair_style_img` WRITE;
/*!40000 ALTER TABLE `hair_style_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `hair_style_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_available_slot`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_available_slot` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `state` char(1) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `consulting_seq` int DEFAULT NULL,
  `designer_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK9gufgwkmfm0lef0956e6wec1c` (`consulting_seq`),
  KEY `FK6lc8c79va1gb8vsm8f8m49b5u` (`designer_seq`),
  CONSTRAINT `FK6lc8c79va1gb8vsm8f8m49b5u` FOREIGN KEY (`designer_seq`) REFERENCES `designer` (`seq`),
  CONSTRAINT `FK9gufgwkmfm0lef0956e6wec1c` FOREIGN KEY (`consulting_seq`) REFERENCES `consulting` (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_available_slot`
--

LOCK TABLES `reservation_available_slot` WRITE;
/*!40000 ALTER TABLE `reservation_available_slot` DISABLE KEYS */;
INSERT INTO `reservation_available_slot` VALUES (6,'2023-08-14 08:50:00.814781','2023-08-15','P','09:00:00',NULL,4),(7,'2023-08-14 08:50:00.819321','2023-08-15','P','10:00:00',NULL,4),(31,'2023-08-14 11:53:16.483283','2023-08-14','P','15:30:00',NULL,2),(32,'2023-08-14 11:53:16.486092','2023-08-14','P','17:30:00',NULL,2),(33,'2023-08-14 11:53:16.488357','2023-08-14','P','19:30:00',NULL,2),(34,'2023-08-14 11:53:16.490715','2023-08-14','P','20:30:00',NULL,2),(35,'2023-08-14 11:53:16.492965','2023-08-14','P','21:30:00',NULL,2),(36,'2023-08-14 11:53:16.500169','2023-08-15','P','16:00:00',NULL,2),(37,'2023-08-14 11:53:16.502688','2023-08-15','P','17:00:00',NULL,2),(38,'2023-08-14 11:53:16.504899','2023-08-15','P','17:30:00',NULL,2),(39,'2023-08-14 11:53:16.506989','2023-08-15','P','18:30:00',NULL,2),(40,'2023-08-14 11:53:16.509144','2023-08-15','P','20:30:00',NULL,2),(50,'2023-08-14 11:53:35.266806','2023-08-15','P','15:00:00',NULL,3),(51,'2023-08-14 11:53:35.270176','2023-08-15','P','15:30:00',NULL,3),(52,'2023-08-14 11:53:35.272701','2023-08-15','P','16:00:00',NULL,3),(53,'2023-08-14 11:53:35.279055','2023-08-14','P','15:30:00',NULL,3),(54,'2023-08-14 11:53:35.281520','2023-08-14','P','16:00:00',NULL,3),(55,'2023-08-14 11:53:35.283967','2023-08-14','P','15:00:00',NULL,3),(56,'2023-08-14 11:53:35.286294','2023-08-14','P','18:00:00',NULL,3),(57,'2023-08-14 11:53:35.288443','2023-08-14','P','18:30:00',NULL,3),(58,'2023-08-14 11:53:35.290619','2023-08-14','P','19:00:00',NULL,3),(59,'2023-08-14 14:32:58.720862','2023-08-15','P','11:30:00',NULL,6),(60,'2023-08-14 14:32:58.726153','2023-08-15','P','12:30:00',NULL,6),(61,'2023-08-14 14:32:58.728756','2023-08-15','P','12:00:00',NULL,6),(65,'2023-08-14 14:52:26.886210','2023-08-14','P','09:30:00',NULL,6),(66,'2023-08-14 14:52:26.888797','2023-08-14','P','13:30:00',NULL,6),(67,'2023-08-14 14:52:26.890836','2023-08-14','P','16:00:00',NULL,6),(68,'2023-08-14 14:52:26.892887','2023-08-14','P','18:00:00',NULL,6),(78,'2023-08-14 16:50:58.041755','2023-08-16','P','12:00:00',NULL,1),(79,'2023-08-14 16:50:58.044376','2023-08-16','P','12:30:00',NULL,1),(80,'2023-08-14 16:50:58.046534','2023-08-16','P','13:00:00',NULL,1),(81,'2023-08-14 16:50:58.048592','2023-08-16','P','16:30:00',NULL,1),(82,'2023-08-14 16:50:58.050714','2023-08-16','P','17:00:00',NULL,1),(83,'2023-08-14 16:50:58.052837','2023-08-16','P','17:30:00',NULL,1),(84,'2023-08-14 16:50:58.061757','2023-08-14','P','13:30:00',NULL,1),(85,'2023-08-14 16:50:58.064257','2023-08-14','P','14:00:00',NULL,1),(86,'2023-08-14 16:50:58.066303','2023-08-14','P','14:30:00',NULL,1),(87,'2023-08-14 16:50:58.071829','2023-08-15','R','12:30:00',NULL,1),(88,'2023-08-14 16:50:58.074046','2023-08-15','P','14:00:00',NULL,1),(89,'2023-08-14 16:50:58.076013','2023-08-15','P','15:30:00',NULL,1),(99,'2023-08-14 16:58:51.357917','2023-08-15','R','13:30:00',NULL,7),(100,'2023-08-14 16:58:51.360499','2023-08-15','P','14:00:00',NULL,7),(101,'2023-08-14 16:58:51.362518','2023-08-15','P','14:30:00',NULL,7),(102,'2023-08-14 16:58:51.368189','2023-08-16','R','15:00:00',NULL,7),(103,'2023-08-14 16:58:51.370162','2023-08-16','P','15:30:00',NULL,7),(104,'2023-08-14 16:58:51.372154','2023-08-16','P','16:00:00',NULL,7),(105,'2023-08-14 16:58:51.377464','2023-08-17','P','15:00:00',NULL,7),(106,'2023-08-14 16:58:51.379684','2023-08-17','P','15:30:00',NULL,7),(107,'2023-08-14 16:58:51.381706','2023-08-17','R','16:00:00',NULL,7);
/*!40000 ALTER TABLE `reservation_available_slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worldcup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worldcup` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `customer_seq` int DEFAULT NULL,
  `hair_style_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK3avlumuo7d49mmori2yotd6gj` (`customer_seq`),
  KEY `FK69rfcd119bx5iq11e99ltsqgk` (`hair_style_seq`),
  CONSTRAINT `FK3avlumuo7d49mmori2yotd6gj` FOREIGN KEY (`customer_seq`) REFERENCES `customer` (`seq`),
  CONSTRAINT `FK69rfcd119bx5iq11e99ltsqgk` FOREIGN KEY (`hair_style_seq`) REFERENCES `hair_style_dict` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worldcup`
--

LOCK TABLES `worldcup` WRITE;
/*!40000 ALTER TABLE `worldcup` DISABLE KEYS */;
/*!40000 ALTER TABLE `worldcup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worldcup_img`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worldcup_img` (
  `seq` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `saved_img_name` varchar(255) DEFAULT NULL,
  `upload_img_name` varchar(255) DEFAULT NULL,
  `hair_style_seq` int DEFAULT NULL,
  `worldcup_seq` int DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKixiauplcnp79yxlldsghqoygr` (`hair_style_seq`),
  KEY `FK5akat73yy5xr5wh1fkuwl5pv3` (`worldcup_seq`),
  CONSTRAINT `FK5akat73yy5xr5wh1fkuwl5pv3` FOREIGN KEY (`worldcup_seq`) REFERENCES `worldcup` (`seq`),
  CONSTRAINT `FKixiauplcnp79yxlldsghqoygr` FOREIGN KEY (`hair_style_seq`) REFERENCES `hair_style_dict` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worldcup_img`
--

LOCK TABLES `worldcup_img` WRITE;
/*!40000 ALTER TABLE `worldcup_img` DISABLE KEYS */;
/*!40000 ALTER TABLE `worldcup_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17  1:18:16
