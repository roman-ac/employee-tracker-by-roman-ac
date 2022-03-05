USE employee_db;

INSERT INTO departments (department)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (title, salary, dep_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Rambo", 1, null),
        ("Mike", "Muoio", 2, 1),
        ("Natalie", "Rodriguez", 3, 2),
        ("David", "Hunt", 4, 3),
        ("Alia", "White", 5, null),
        ("Sarah", "Larkin", 2, null),
        ("Tom", "Hollant", 4, 7),
        ("Christian", "Flett", 1, 2);