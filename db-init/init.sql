set FOREIGN_KEY_CHECKS = 0;
drop table if exists Department;
drop table if exists Employee;
drop table if exists Professor;
drop table if exists Assistant;
drop table if exists Course;
drop table if exists Course_Prerequisite;
drop table if exists Professor_Teaches_Course;
drop table if exists Assistant_Assists_Course;
drop table if exists Exam;
drop table if exists Student;
drop table if exists Enrollment;
set FOREIGN_KEY_CHECKS = 1;

create table Department (
    id int primary key,
    name varchar(255) not null,
    address varchar(255),
    phone varchar(255),
    email varchar(255)
);

create table Employee (
    id int primary key,
    name varchar(255) not null,
    hire_date date,
    department_id int,
    constraint foreign key (department_id) references Department(id) on delete cascade
);

create table Professor (
    employee_id int primary key,
    field_of_research varchar(255),
    office_number varchar(255),
    constraint foreign key (employee_id) references Employee(id) on delete cascade
);

create table Assistant (
    employee_id int primary key,
    role varchar(255),
    can_grade boolean,
    supervisor_id int,
    constraint foreign key (employee_id) references Employee(id) on delete cascade,
    constraint foreign key (supervisor_id) references Professor(employee_id) on delete cascade
);

create table Course (
    id int primary key,
    name varchar(255) not null,
    ECTS int,
    department_id int,
    constraint foreign key (department_id) references Department(id) on delete cascade
);

create table Course_Prerequisite (
    course_id int,
    prerequisite_id int,
    primary key (course_id, prerequisite_id),
    constraint foreign key (course_id) references Course(id) on delete cascade,
    constraint foreign key (prerequisite_id) references Course(id) on delete cascade
);

create table Professor_Teaches_Course (
    professor_id int,
    course_id int,
    primary key (professor_id, course_id),
    constraint foreign key (professor_id) references Professor(employee_id) on delete cascade,
    constraint foreign key (course_id) references Course(id) on delete cascade
);

create table Assistant_Assists_Course (
    assistant_id int,
    course_id int,
    primary key (assistant_id, course_id),
    constraint foreign key (assistant_id) references Assistant(employee_id) on delete cascade,
    constraint foreign key (course_id) references Course(id) on delete cascade
);

create table Exam (
    id int primary key,
    course_id int,
    name varchar(255) not null,
    date date,
    ECTS int,
    constraint foreign key (course_id) references Course(id) on delete cascade
);

create table Student (
    matriculation_number int primary key,
    name varchar(255) not null,
    date_of_birth date
);

create table Enrollment (
    student_id int,
    course_id int,
    primary key (student_id, course_id),
    constraint foreign key (student_id) references Student(matriculation_number) on delete cascade,
    constraint foreign key (course_id) references Course(id) on delete cascade
);