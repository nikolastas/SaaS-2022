
CREATE TABLE AggrGenerationPerType (DateTime datetime NOT NULL, 
ResolutionCode varchar(255), 
ProductionType varchar(255) NOT NULL, 
ActualGenerationOutput float, 
ActualConsumption float, 
UpdateTime datetime NULL, 
MapCode varchar(255) NOT NULL,
PRIMARY KEY (DateTime, ProductionType, MapCode));

CREATE TABLE Area (AreaTypeCode varchar(255) NOT NULL, 
AreaName varchar(255) NOT NULL, 
MapCode varchar(255) NOT NULL, 
PRIMARY KEY (MapCode));


ALTER TABLE AggrGenerationPerType ADD CONSTRAINT FKAggrGenera687323 FOREIGN KEY (MapCode) REFERENCES Area (MapCode);

