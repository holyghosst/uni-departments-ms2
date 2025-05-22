# Uni Departments

The university has multiple departments. Each department has a unique ID, a name and a contact information, consisting of address, phone and email. University departments hire employees who have a unique ID,
a name and a hire date. Professors and assistants are employees; professors have a field of research and an
office number, while assistants have a role and may or may not have the grading privilege. Each assistant
is supervised by a single professor and each professor may supervise multiple assistants. An employee can
work for only one department. University departments also offer courses, a course can be offered by only
one department.

Courses are identified by a unique ID and also have a name and an associated number of ECTS. Courses
are taught by one or many professors and can be assisted by one or more assistants. Each course includes
one or more exams. Each exam is uniquely identified as part of a course, has a name, a date and a number
of ECTS. Additionally, a course can be a prerequisite for another course, and each course can have multiple
prerequisites.

Students enrolled at the university have a unique matriculation number, a name and a date of birth.
Students can be enrolled in multiple courses.

## 1. UI
UI with some dummy data has been implemented so far

To run locally:
```
cd uni-departments-m2
npm install
npm run dev
```