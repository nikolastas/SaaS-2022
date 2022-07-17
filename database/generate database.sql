
CREATE TABLE ActualTotalLoad (Datetime datetime NOT NULL,
ResolutionCode varchar(255), 
TotalLoadValue float, 
UpdateTime datetime NULL, 
MapCode varchar(255) NOT NULL,
PRIMARY KEY (Datetime, MapCode));
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
CREATE TABLE PhysicalFlows (DateTime datetime NOT NULL,
ResolutionCode varchar(255), 
FlowValue float, 
UpdateTime datetime NULL,
InMapCode varchar(255) NOT NULL,
OutMapCode varchar(255) NOT NULL,
 
PRIMARY KEY (DateTime, InMapCode, OutMapCode));
CREATE TABLE Subscriptions (Username varchar(255) NOT NULL, 
SubscriptionStartTime datetime NULL, 
SubscriptionEndTime datetime NULL, 
SubcriptionType varchar(255), 
PRIMARY KEY (Username));
ALTER TABLE ActualTotalLoad ADD CONSTRAINT FKActualTota412327 FOREIGN KEY (MapCode) REFERENCES Area (MapCode);
ALTER TABLE AggrGenerationPerType ADD CONSTRAINT FKAggrGenera687323 FOREIGN KEY (MapCode) REFERENCES Area (MapCode);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl871357 FOREIGN KEY (InMapCode) REFERENCES Area (MapCode);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl555898 FOREIGN KEY (OutMapCode) REFERENCES Area (MapCode);

