create database techAlchemy;
use techAlchemy;

CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    `email` VARCHAR(100),
    `password` VARCHAR(100),
    PRIMARY KEY (`id`), 
    UNIQUE(`email`)
);

ALTER TABLE user ADD COLUMN is_deleted BOOL NOT NULL DEFAULT false;
ALTER TABLE user ADD COLUMN creation_date DATETIME;
ALTER TABLE user ADD COLUMN last_update DATETIME;
ALTER TABLE user ADD COLUMN last_updated_by VARCHAR(150);
delimiter //
CREATE TRIGGER user_insert_trigger BEFORE INSERT ON user
FOR EACH ROW BEGIN
    SET NEW.creation_date=NOW();
    SET NEW.last_updated_by=USER();
    SET NEW.last_update=NOW();
END;//
CREATE TRIGGER user_update_trigger BEFORE UPDATE ON user
FOR EACH ROW
BEGIN
    SET NEW.last_updated_by=USER();
    SET NEW.last_update = NOW();
END;//
delimiter ;