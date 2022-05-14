CREATE TABLE ActualTotalLoad (Datetime timestamp NOT NULL, TotalLoadValue float, UpdateTime timestamp NULL, ResolutionCode varchar(255), AreaAreaName varchar(255) NOT NULL, PRIMARY KEY (Datetime, AreaAreaName));
CREATE TABLE AggrGenerationPerType (DateTime timestamp NOT NULL, ResolutionCode varchar(255), ProductionType varchar(255) NOT NULL, ActualGenerationOutput float, ActualConsumption float, UpdateTime timestamp NULL, AreaAreaName varchar(255) NOT NULL, PRIMARY KEY (DateTime, ProductionType, AreaAreaName));
CREATE TABLE Area (AreaTypeCode varchar(255) NOT NULL, AreaName varchar(255) NOT NULL, MapCode varchar(255) NOT NULL, PRIMARY KEY (AreaName));
CREATE TABLE PhysicalFlows (DateTime int(10) NOT NULL, FlowValue float, UpdateTime timestamp NULL, ResolutionCode int(10), InAreaAreaName varchar(255) NOT NULL, OutAreaAreaName varchar(255) NOT NULL, PRIMARY KEY (DateTime, InAreaAreaName, OutAreaAreaName));
CREATE TABLE Subscriptions (Username varchar(255) NOT NULL, SubscriptionStartTime timestamp NULL, SubscriptionEndTime timestamp NULL, SubcriptionType varchar(255), PRIMARY KEY (Username));
ALTER TABLE ActualTotalLoad ADD CONSTRAINT FKActualTota412327 FOREIGN KEY (AreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE AggrGenerationPerType ADD CONSTRAINT FKAggrGenera687323 FOREIGN KEY (AreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl871357 FOREIGN KEY (InAreaAreaName) REFERENCES Area (AreaName);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl555898 FOREIGN KEY (OutAreaAreaName) REFERENCES Area (AreaName);
