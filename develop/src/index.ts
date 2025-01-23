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
						name: 'Remove Role',
						value: 'REMOVE_ROLE',
					},
					{
						name: 'View All Departments',
						value: 'VIEW_DEPARTMENTS',
					},
					{
						name: 'Add Department',
						value: 'ADD_DEAPRTMENT',
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
			console.log('choice:', choice); //returns the choice you made.

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
            console.log('firstname last name:', firstName, lastName )

			db.findAllRoles()
            .then((response) => {
                console.log("🚀 findAllRoles ~ response:", response)
                
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

function removeEmployee() {}
// function updateEmployeeRole() {}
function viewRoles() {
    db.findAllRoles()
		.then((result) => {
			const roles = result.rows;
			console.table(roles);
		})
		.then(() => initialPrompts());
}
function addRole() {}
function removeRole() {
    let roleChoices: any [] = []
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
function viewDepartments() {}
function addDepartment() {}
function removeDepartment() {}
function quit() {}