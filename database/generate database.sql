CREATE TABLE ActualTotalLoad (Datetime datetime NOT NULL,
ResolutionCode varchar(255), 
TotalLoadValue float, 
UpdateTime datetime NULL, 
AreaAreaName varchar(255) NOT NULL, 
PRIMARY KEY (Datetime, AreaAreaName));
CREATE TABLE AggrGenerationPerType (DateTime datetime NOT NULL, 
ResolutionCode varchar(255), 
ProductionType varchar(255) NOT NULL, 
ActualGenerationOutput float, 
ActualConsumption float, 
UpdateTime datetime NULL, 
AreaAreaName varchar(255) NOT NULL, 
PRIMARY KEY (DateTime, ProductionType, AreaAreaName));
CREATE TABLE Area (AreaTypeCode varchar(255) NOT NULL, 
AreaName varchar(255) NOT NULL, 
MapCode varchar(255) NOT NULL, 
PRIMARY KEY (AreaName));
CREATE TABLE PhysicalFlows (DateTime datetime NOT NULL,
ResolutionCode varchar(255), 
FlowValue float, 
UpdateTime datetime NULL,
InAreaAreaName varchar(255) NOT NULL, 
OutAreaAreaName varchar(255) NOT NULL,
 
PRIMARY KEY (DateTime, InAreaAreaName, OutAreaAreaName));
CREATE TABLE Subscriptions (Username varchar(255) NOT NULL, 
SubscriptionStartTime datetime NULL, 
SubscriptionEndTime datetime NULL, 
SubcriptionType varchar(255), 
PRIMARY KEY (Username));
ALTER TABLE ActualTotalLoad ADD CONSTRAINT FKActualTota412327 FOREIGN KEY (AreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE AggrGenerationPerType ADD CONSTRAINT FKAggrGenera687323 FOREIGN KEY (AreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl871357 FOREIGN KEY (InAreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl555898 FOREIGN KEY (OutAreaAreaName) REFERENCES Area (AreaName);
