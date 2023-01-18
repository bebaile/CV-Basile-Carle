-- MySQL Script generated by MySQL Workbench
-- Wed Jan 18 12:01:36 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema my_cv
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_cv
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_cv` DEFAULT CHARACTER SET utf8 ;
USE `my_cv` ;

-- -----------------------------------------------------
-- Table `my_cv`.`availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`availability` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`availability` (
  `idavailability` INT NOT NULL,
  `day` VARCHAR(10) NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  PRIMARY KEY (`idavailability`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`contact_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`contact_details` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`contact_details` (
  `idcontact_details` INT NOT NULL,
  `adress` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `linkedin` VARCHAR(45) NOT NULL,
  `github` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcontact_details`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`meeting_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`meeting_request` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`meeting_request` (
  `idmeeting_request` INT NOT NULL,
  `day` DATETIME NOT NULL,
  `duration` INT NOT NULL DEFAULT 30,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`idmeeting_request`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`messages` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(1024) NOT NULL,
  `username` VARCHAR(16) NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id_user` INT NOT NULL,
  `meeting_request_idmeeting_request` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id_user`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_messages_user_idx` (`user_id_user` ASC) VISIBLE,
  INDEX `fk_messages_meeting_request1_idx` (`meeting_request_idmeeting_request` ASC) VISIBLE,
  CONSTRAINT `fk_messages_user`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `my_cv`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_meeting_request1`
    FOREIGN KEY (`meeting_request_idmeeting_request`)
    REFERENCES `my_cv`.`meeting_request` (`idmeeting_request`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`professional_objectives`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`professional_objectives` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`professional_objectives` (
  `idprofessional_objectives` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idprofessional_objectives`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`section_content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`section_content` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`section_content` (
  `idsection_content` INT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` NVARCHAR(200) NOT NULL,
  PRIMARY KEY (`idsection_content`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_cv`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_cv`.`user` ;

CREATE TABLE IF NOT EXISTS `my_cv`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `company` VARCHAR(45) NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
