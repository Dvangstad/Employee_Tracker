USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"),
("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 100000, 56);

INSERT INTO employee (first_name)