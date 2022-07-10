
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

ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl871357 FOREIGN KEY (InMapCode) REFERENCES Area (MapCode);
ALTER TABLE PhysicalFlows ADD CONSTRAINT FKPhysicalFl555898 FOREIGN KEY (OutMapCode) REFERENCES Area (MapCode);
