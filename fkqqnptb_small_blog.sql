# Host: localhost  (Version: 5.5.53)
# Date: 2018-02-25 22:43:29
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES gb2312 */;

#
# Structure for table "account"
#

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `phone` varchar(14) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `password` varchar(14) NOT NULL,
  `username` varchar(14) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `signature` varchar(66) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `primaryKey` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`primaryKey`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

#
# Data for table "account"
#

/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('11111111111','A11a111111111','roy','',56),('18368492446','A11a111111111','1','',57);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

#
# Structure for table "comment"
#

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `primaryKey` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(144) CHARACTER SET utf8 DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `username` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `signature` varchar(66) DEFAULT NULL,
  PRIMARY KEY (`primaryKey`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

#
# Data for table "comment"
#

/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (21,'second comment of test account','2018-01-28 16:06:36','2018.01.28',''),(22,'1','2018-02-10 19:57:07','1',''),(23,'2222222222','2018-02-10 20:00:52','1',''),(24,'2222222222','2018-02-10 20:17:18','1','????'),(25,'44444444444','2018-02-10 21:15:27','1','????');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

#
# Structure for table "time_record"
#

DROP TABLE IF EXISTS `time_record`;
CREATE TABLE `time_record` (
  `primaryKey` int(11) NOT NULL AUTO_INCREMENT,
  `planned_time` varchar(6666) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `actual_time` varchar(6666) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `begin_tracking_time` int(11) NOT NULL,
  `username` varchar(14) CHARACTER SET utf8 NOT NULL,
  `submit_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`primaryKey`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Data for table "time_record"
#

/*!40000 ALTER TABLE `time_record` DISABLE KEYS */;
INSERT INTO `time_record` VALUES (6,'[{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"0\",\"end\":\"2\",\"status\":\"完成\",\"timeSlotId\":\"0\",\"begin_timeLength\":\"0秒\",\"end_timeLength\":\"2秒\",\"trackingDayBegin\":\"81904\",\"trackingDayEnd\":\"81906\",\"trackingDayBegin_clockTime\":\"22点45分4秒\",\"trackingDayEnd_clockTime\":\"22点45分6秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"2\",\"end\":\"4\",\"status\":\"完成\",\"timeSlotId\":\"1\",\"begin_timeLength\":\"2秒\",\"end_timeLength\":\"4秒\",\"trackingDayBegin\":\"81906\",\"trackingDayEnd\":\"81908\",\"trackingDayBegin_clockTime\":\"22点45分6秒\",\"trackingDayEnd_clockTime\":\"22点45分8秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"4\",\"end\":\"6\",\"status\":\"完成\",\"timeSlotId\":\"2\",\"begin_timeLength\":\"4秒\",\"end_timeLength\":\"6秒\",\"trackingDayBegin\":\"81908\",\"trackingDayEnd\":\"81910\",\"trackingDayBegin_clockTime\":\"22点45分8秒\",\"trackingDayEnd_clockTime\":\"22点45分10秒\",\"timeLength_dailyFormat\":\"2秒\"}]','[{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"0\",\"end\":\"2\",\"status\":\"完成\",\"timeSlotId\":\"0\",\"begin_timeLength\":\"0秒\",\"end_timeLength\":\"2秒\",\"trackingDayBegin\":\"81904\",\"trackingDayEnd\":\"81906\",\"trackingDayBegin_clockTime\":\"22点45分4秒\",\"trackingDayEnd_clockTime\":\"22点45分6秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"2\",\"end\":\"4\",\"status\":\"完成\",\"timeSlotId\":\"1\",\"begin_timeLength\":\"2秒\",\"end_timeLength\":\"4秒\",\"trackingDayBegin\":\"81906\",\"trackingDayEnd\":\"81908\",\"trackingDayBegin_clockTime\":\"22点45分6秒\",\"trackingDayEnd_clockTime\":\"22点45分8秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"4\",\"end\":\"6\",\"status\":\"完成\",\"timeSlotId\":\"2\",\"begin_timeLength\":\"4秒\",\"end_timeLength\":\"6秒\",\"trackingDayBegin\":\"81908\",\"trackingDayEnd\":\"81910\",\"trackingDayBegin_clockTime\":\"22点45分8秒\",\"trackingDayEnd_clockTime\":\"22点45分10秒\",\"timeLength_dailyFormat\":\"2秒\"}]',1519483505,'1','2018-02-24 22:45:13'),(7,'[{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"0\",\"end\":\"3\",\"status\":\"完成\",\"timeSlotId\":\"0\",\"begin_timeLength\":\"0秒\",\"end_timeLength\":\"3秒\",\"trackingDayBegin\":\"82100\",\"trackingDayEnd\":\"82103\",\"trackingDayBegin_clockTime\":\"22点48分20秒\",\"trackingDayEnd_clockTime\":\"22点48分23秒\",\"timeLength_dailyFormat\":\"3秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"3\",\"end\":\"5\",\"status\":\"完成\",\"timeSlotId\":\"1\",\"begin_timeLength\":\"3秒\",\"end_timeLength\":\"5秒\",\"trackingDayBegin\":\"82103\",\"trackingDayEnd\":\"82105\",\"trackingDayBegin_clockTime\":\"22点48分23秒\",\"trackingDayEnd_clockTime\":\"22点48分25秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"5\",\"end\":\"7\",\"status\":\"完成\",\"timeSlotId\":\"2\",\"begin_timeLength\":\"5秒\",\"end_timeLength\":\"7秒\",\"trackingDayBegin\":\"82105\",\"trackingDayEnd\":\"82107\",\"trackingDayBegin_clockTime\":\"22点48分25秒\",\"trackingDayEnd_clockTime\":\"22点48分27秒\",\"timeLength_dailyFormat\":\"2秒\"}]','[{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"0\",\"end\":\"3\",\"status\":\"完成\",\"timeSlotId\":\"0\",\"begin_timeLength\":\"0秒\",\"end_timeLength\":\"3秒\",\"trackingDayBegin\":\"82100\",\"trackingDayEnd\":\"82103\",\"trackingDayBegin_clockTime\":\"22点48分20秒\",\"trackingDayEnd_clockTime\":\"22点48分23秒\",\"timeLength_dailyFormat\":\"3秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"3\",\"end\":\"5\",\"status\":\"完成\",\"timeSlotId\":\"1\",\"begin_timeLength\":\"3秒\",\"end_timeLength\":\"5秒\",\"trackingDayBegin\":\"82103\",\"trackingDayEnd\":\"82105\",\"trackingDayBegin_clockTime\":\"22点48分23秒\",\"trackingDayEnd_clockTime\":\"22点48分25秒\",\"timeLength_dailyFormat\":\"2秒\"},{\"show\":\"true\",\"name\":\"未定义名称\",\"begin\":\"5\",\"end\":\"7\",\"status\":\"完成\",\"timeSlotId\":\"2\",\"begin_timeLength\":\"5秒\",\"end_timeLength\":\"7秒\",\"trackingDayBegin\":\"82105\",\"trackingDayEnd\":\"82107\",\"trackingDayBegin_clockTime\":\"22点48分25秒\",\"trackingDayEnd_clockTime\":\"22点48分27秒\",\"timeLength_dailyFormat\":\"2秒\"}]',1519483701,'1','2018-02-24 22:48:30');
/*!40000 ALTER TABLE `time_record` ENABLE KEYS */;

#
# Structure for table "verification_code"
#

DROP TABLE IF EXISTS `verification_code`;
CREATE TABLE `verification_code` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(14) DEFAULT NULL,
  `verification_code` varchar(14) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  `username` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;

#
# Data for table "verification_code"
#

/*!40000 ALTER TABLE `verification_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification_code` ENABLE KEYS */;
