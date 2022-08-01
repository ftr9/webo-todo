const userModel = `create table users(
userid Int NOT NULL AUTO_INCREMENT,
username varchar(15) NOT NULL,
email varchar(50) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
CONSTRAINT pk_users_userid PRIMARY KEY (userid)
)`;
