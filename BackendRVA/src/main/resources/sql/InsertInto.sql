--fakulteti
Insert into "fakultet"("id","naziv","sediste")
	values(nextval('fakultet_seq'),'FTN','Novi Sad');
Insert into "fakultet"("id","naziv","sediste")
	values(nextval('fakultet_seq'),'ETF','Beograd');	
Insert into "fakultet"("id","naziv","sediste")
	values(nextval('fakultet_seq'),'FON','Beograd');	
Insert into "fakultet"("id","naziv","sediste")
	values(nextval('fakultet_seq'),'Filozofski','Novi Sad');
	
--statusi
insert into "status"("id","naziv","oznaka")
	values(nextval('status_seq'),'Budžet','b');
insert into "status"("id","naziv","oznaka")
	values(nextval('status_seq'),'Samofinansiranje','sf');
insert into "status"("id","naziv","oznaka")
	values(nextval('status_seq'),'Zamrznut','z');
insert into "status"("id","naziv","oznaka")
	values(nextval('status_seq'),'Neponznat','n');	
	
--departmani ftn
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za saobraćaj','DZS',1);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za indrustrijsko inženjerstvo','DZII',1);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za arhitekturu i urbanizam','DZAIU',1);
	
--departmani etf	
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za robotiku','DZR',2);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za softversko inženjerstvo','DZSI',2);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za mehaniku','DZM',2);	
	
--departmani fon	
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za informacioni inženjering','DZII',3);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za menadžment','DZM',3);
	
--departmani za filozofski
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za filozofiju','DZII',4);
insert into "departman"("id","naziv","oznaka","fakultet")
	values(nextval('departman_seq'),'Departman za psihologiju','DZM',4);
	
--studenti ftn
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Boban','Mićin','SA-15/2017',1,1);
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Mata','Prevara','II-25/2014',2,2);	
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Mića','Pećinac','AH-22/2018',2,3);
	
--studenti etf
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Aleksa','Škemba','RO-15/2017',1,4);
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Đole','Bogdanović','SI-25/2014',2,5);	
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Čarls','Bukovski','M-22/2018',2,6);		
	
--studenti fon
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Mira','Vukobratić','II-15/2017',1,7);
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Dušanka','Jadžić','ME-25/2014',2,8);	

--studenti filozofski
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Baja','Komšija','F-15/2017',1,9);
insert into "student"("id","ime","prezime","broj_indeksa","status","departman")
	values(nextval('student_seq'),'Milica','Cicović','P-10/2015',1,10);	

	
	