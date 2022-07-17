
CREATE TABLE aggrgenerationpertype (DateTime datetime NOT NULL, 
ResolutionCode varchar(255), 
ProductionType varchar(255) NOT NULL, 
ActualGenerationOutput float, 
ActualConsumption float, 
UpdateTime datetime NULL, 
MapCode varchar(255) NOT NULL,
PRIMARY KEY (DateTime, ProductionType, MapCode));

CREATE TABLE area (AreaTypeCode varchar(255) NOT NULL, 
AreaName varchar(255) NOT NULL, 
MapCode varchar(255) NOT NULL, 
PRIMARY KEY (MapCode));


ALTER TABLE aggrgenerationpertype ADD CONSTRAINT FKAggrGenera687323 FOREIGN KEY (MapCode) REFERENCES area (MapCode);

