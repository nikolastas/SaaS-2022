CREATE TABLE ActualTotalLoad (Datetime datetime NOT NULL,
ResolutionCode varchar(255), 
TotalLoadValue float, 
UpdateTime datetime NULL, 
MapCode varchar(255) NOT NULL,
PRIMARY KEY (Datetime, MapCode));

CREATE TABLE Area (AreaTypeCode varchar(255) NOT NULL, 
AreaName varchar(255) NOT NULL, 
MapCode varchar(255) NOT NULL, 
PRIMARY KEY (MapCode));

ALTER TABLE ActualTotalLoad ADD CONSTRAINT FKActualTota412327 FOREIGN KEY (MapCode) REFERENCES Area (MapCode);

