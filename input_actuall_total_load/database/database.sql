CREATE TABLE actualtotalload (Datetime datetime NOT NULL,
resolutioncode varchar(255), 
totalloadValue float, 
updatetime datetime NULL, 
mapcode varchar(255) NOT NULL,
PRIMARY KEY (Datetime, mapcode));

CREATE TABLE area (AreaTypeCode varchar(255) NOT NULL, 
areaname varchar(255) NOT NULL, 
mapcode varchar(255) NOT NULL, 
PRIMARY KEY (mapcode));

ALTER TABLE actualtotalload ADD CONSTRAINT FKActualTota412327 FOREIGN KEY (mapcode) REFERENCES area (mapcode);

