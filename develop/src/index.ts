//CLI main menu code
import inquirer from 'inquirer';

import Db from './db/index.js';

const db = new Db();

initialPrompts();

function initialPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES',
                    },
                    {
                        name: 'Add Employee',
                        value: 'ADD_EMPLOYEE',
                    },
                    {
                        name: 'Remove Employee',
                        value: 'REMOVE_EMPLOYEE',
                    },
                    {
                        name: 'View All Roles',
                        value: 'VIEW_ROLES',
                    },
                    {
                        name: 'Add Role',
                        value: 'ADD_ROLE',
                    },
                    {
                        name: 'Update Employee Role',
                        value: 'UPDATE_ROLE',
                    },
                    {
                        name: 'Remove Role',
                        value: 'REMOVE_ROLE',
                    },
                    {
                        name: 'View All Departments',
                        value: 'VIEW_DEPARTMENTS',
                    },
                    {
                        name: 'Add Department',
                        value: 'ADD_DEPARTMENT',
                    },
                    {
                        name: 'Remove Department',
                        value: 'REMOVE_DEPARTMENT',
                    },
                    {
                        name: 'Quit',
                        value: 'QUIT',
                    },
                ],
            },
        ])
        .then((res) => {
            const choice = res.choice;

            switch (choice) {
                case 'VIEW_EMPLOYEES':
                    viewEmployees();
                    break;

                case 'ADD_EMPLOYEE':
                    addEmployee();
                    break;

                case 'REMOVE_EMPLOYEE':
                    removeEmployee();
                    break;

                case 'VIEW_ROLES':
                    viewRoles();
                    break;

                case 'ADD_ROLE':
                    addRole();
                    break;

                case 'UPDATE_ROLE':
                    updateEmployeeRole();
                    break;

                case 'REMOVE_ROLE':
                    removeRole();
                    break;

                case 'VIEW_DEPARTMENTS':
                    viewDepartments();
                    break;

                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;

                case 'REMOVE_DEPARTMENT':
                    removeDepartment();
                    break;

                case 'QUIT':
                    quit();
                    break;

                default:
                    quit();
                    break;
            }
        });
}
// TODO: come back through and refactor
function viewEmployees() {
    db.findAllEmployees()
        .then((result) => {
            const employees = result.rows;
            console.table(employees);
        })
        .then(() => initialPrompts());
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                message: "What is the employees first name?",
                type: 'input',
            },
            {
                name: 'last_name',
                message: "What is the employees last name?",
                type: 'input',
            },
        ])
        .then((res) => {
            const firstName = res.first_name;
            const lastName = res.last_name;

            db.findAllRoles()
                .then((response) => {
                    const roles = response?.rows;
                    const roleChoices = roles.map((role) => {
                        const id = role.id;
                        const title = role.title;

                        return {
                            name: title,
                            value: id,
                        };
                    });
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: "What is the employee's role?",
                                choices: roleChoices,
                            },
                        ])
                        .then((res) => {
                            const roleId = res.roleId;

                            db.findAllEmployees().then((res) => {
                                const employees = res?.rows;
                                const managerChoices = employees?.map(
                                    (employee) => {
                                        const id = employee.id;
                                        const firstName = employee.first_name;
                                        const lastName = employee.last_name;

                                        return {
                                            name: `${firstName} ${lastName}`,
                                            value: id,
                                        };
                                    }
                                );
                                managerChoices.unshift({
                                    name: 'None',
                                    value: null,
                                });

                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            name: 'managerId',
                                            message: 'Who is this employees supervisor?',
                                            choices: managerChoices,
                                        },
                                    ])
                                    .then((res) => {
                                        const newEmployee = {
                                            first_name: firstName,
                                            last_name: lastName,
                                            manager_id: res.managerId,
                                            role_id: roleId,
                                        };
                                        db.addNewEmployee(newEmployee);
                                    })
                                    .then(() => {
                                        console.log(
                                            `Added ${firstName} ${lastName} to the database.`
                                        );
                                    })
                                    .then(() => {
                                        initialPrompts();
                                    });
                            });
                        });
                });
        });
}

function removeEmployee() {
    let removeEmployee: { name: string, value: number }[] = [];
    db.findAllEmployees()
        .then((result) => {
            removeEmployee = result.rows.map(r => {
                return {
                    name: r.first_name + ' ' + r.last_name,
                    value: r.id
                };
            });
        })
        .then(() => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Which employee do you want to delete?",
                        choices: removeEmployee,
                    },
                ])
                .then((result) => {
                    console.log(result);
                    const id = result.id;
                    db.removeEmployee(id)
                        .then((result) => {
                            const employee = result.rows;
                            console.table(employee);
                        })
                        .then(() => initialPrompts());
                });
        });
}
function updateEmployeeRole() {
    db.findAllRoles()
        .then((result) => {
            const roles = result.rows.map(row => {
                return {
                    name: row.title,
                    value: row.id
                }
            });
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: 'Which role do you want to update?',
                        choices: roles
                    }
                ])
                .then((result) => {
                    const roleIdToUpdate = result.id
                    db.findAllDepartments()
                        .then((result) => {
                            const departments = result.rows.map(row => {
                                return {
                                    name: row.department_name,
                                    value: row.id
                                }
                            })
                            inquirer
                                .prompt([
                                    {
                                        name: 'department',
                                        message: "What deaprtment would you like to update this role to?",
                                        type: 'list',
                                        choices: departments,
                                    }
                                ])
                                .then((result) => {
                                    const departmentIdUpdate = result.department
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'input',
                                                name: 'salary',
                                                message: 'What would you like to update the salary to?',
                                            },
                                            {
                                                type: 'input',
                                                name: 'title',
                                                message: 'What would you like to rename this position to?',
                                            }
                                        ])
                                        .then((result) => {
                                            const salary = result.salary
                                            const title = result.title
                                            db.updateEmployeeRole(roleIdToUpdate, salary, title, departmentIdUpdate)
                                                .then(() => initialPrompts());
                                        })
                                })
                        })
                })

        })
}

function viewRoles() {
    db.findAllRoles()
        .then((result) => {
            const roles = result.rows;
            console.table(roles);
        })
        .then(() => initialPrompts());
}
function addRole() {
    let departments = []
    db.findAllDepartments()
        .then((result) => {
            departments = result.rows.map(row => {
                return {
                    name: row.department_name,
                    value: row.id
                }
            })
            inquirer
                .prompt([
                    {
                        name: 'department',
                        message: "What department_id are you adding this role to?",
                        type: 'list',
                        choices: departments,
                    }
                ])
                .then((result) => {
                    const department = result.department
                    inquirer
                        .prompt([
                            {
                                name: 'salary',
                                message: "What is the compensation of this role?",
                                type: 'input',
                            },
                            {
                                name: 'title',
                                message: "What is name of the department?",
                                type: 'input',
                            }
                        ])
                        .then((result) => {
                            const salary = result.salary
                            const title = result.title

                            db.addRole(salary, title, department)
                                .then(() => {
                                    console.log(
                                        `Added ${department} to the database.`
                                    );
                                })
                                .then(() => {
                                    initialPrompts();
                                });
                        })
                })
        })

}
function removeRole() {
    let roleChoices: any[] = []
    db.findAllRoles()
        .then((result) => {
            roleChoices = result.rows.map(r => {
                return {
                    name: r.title,
                    value: r.id
                }
            });
        })
        .then(() => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "Which role do you want to delete?",
                        choices: roleChoices,
                    },
                ])
                .then((result) => {
                    console.log(result)
                    const id = result.roleId;
                    db.removeRole(id)
                        .then((result) => {
                            const roles = result.rows;
                            console.table(roles);
                        })
                        .then(() => initialPrompts());
                })
        })
}
function viewDepartments() {
    db.findAllDepartments()
        .then((result) => {
            const departments = result.rows;
            console.table(departments);
        })
        .then(() => initialPrompts());
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'department_name',
                message: "What department are you adding?",
                type: 'input',
            }
        ])
        .then((result) => {
            const department = result.department_name

            db.addDepartment(department)
                .then(() => {
                    console.log(
                        `Added ${department} to the database.`
                    );
                })
                .then(() => {
                    initialPrompts();
                });
        })
}

function removeDepartment() {
    let departments: any[] = []
    db.findAllDepartments()
        .then((result) => {
            departments = result.rows.map(r => {
                return {
                    name: r.department_name,
                    value: r.id
                }
            });
        })
        .then(() => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'id',
                        message: "Which department do you want to delete?",
                        choices: departments,
                    },
                ])
                .then((result) => {
                    console.log(result)
                    const id = result.id;
                    db.removeDepartment(id)
                        .then((result) => {
                            const department = result.rows;
                            console.table(department);
                        })
                        .then(() => initialPrompts());
                })
        })
}
function quit() {
    console.log('Securing the neural net. Have a great day!')
    process.exit(0)
}