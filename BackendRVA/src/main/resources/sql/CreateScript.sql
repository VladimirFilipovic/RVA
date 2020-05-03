create table fakultet 
(
	id integer not null,
	naziv varchar (100) not null,
	sediste varchar (50) not null
);

create table status
(
	id integer not null,
	naziv varchar (100) not null,
	oznaka varchar (10) not null
);

create table departman
(
	id integer not null,
	naziv varchar (100) not null,
	oznaka varchar (10) not null,
	fakultet integer not null
);

create table student
(
	id integer not null,
	ime varchar (50) not null,
	prezime varchar (50) not null,
	broj_indeksa varchar (20) not null,
	status integer not null,
	departman integer not null
);

--primary keys
Alter table fakultet
	add constraint PK_Fakultet 
	primary key (id);
Alter table departman
	add constraint PK_Departman 
	primary key (id);	
Alter table student
	add constraint PK_Student 
	primary key (id);
Alter table status
	add constraint PK_Status 
	primary key (id);

--foreign keys
Alter table departman
	add constraint FK_Departman_Fakultet
	foreign key (fakultet) 
	references fakultet(id);
	
Alter table student
	add constraint FK_Student_Departman
	foreign key (departman) 
	references departman(id);
	
Alter table student
	add constraint FK_Student_Status
	foreign key (status) 
	references status(id);
	
--indexi
Create index IDXFK_Departman_Fakultet
	on departman(fakultet);
Create index IDXFK_Student_Departman
	on student(departman);	
Create index IDXFK_Student_Status
	on student(status);		

--sequence
Create sequence fakultet_seq
INCREMENT 1;
Create sequence departman_seq
INCREMENT 1;
Create sequence status_seq
INCREMENT 1;
Create sequence student_seq
INCREMENT 1;

	

