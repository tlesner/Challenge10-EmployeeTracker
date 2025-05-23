//intereacts with the 'main menu'

import { pool } from './connection.js'

export default class Db {
    constructor() {

    }

    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql,args);
            return result
        } finally {
            client.release();
        }
    }


    async findAllEmployees() {
        const sqlQuery = "SELECT * FROM employee WHERE status = $1  ORDER BY last_name ASC;";
        const parameters = [
            "active"
        ]
        return this.query(sqlQuery, parameters);
    };

    async addNewEmployee(newEmployee: any) {
        const sqlQuery = "INSERT INTO employee (first_name, last_name, role_id, manager_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;";

        const parameters: (string | number) [] = [
            newEmployee.first_name.trim(),
            newEmployee.last_name.trim(),
            newEmployee.role_id,
            newEmployee.manager_id,
            "active"
        ]
        return this.query(sqlQuery, parameters);
    };
    async updateEmployee(id: number, salary: number, title: string, department: number) {
        const sqlQuery = `UPDATE employee_role SET title=$1, salary=$2, department=$3 WHERE id=$4 RETURNING *;`;

        const parameters: (string | number)[] = [
            title,
            salary,
            department,
            id
        ];

        return this.query(sqlQuery, parameters);
    };

    async updateEmployeeRoleOnly(id: number, roleId: number) {        
        const sqlQuery = `UPDATE employee SET role_id=$1 WHERE id=$2 RETURNING *;`;
        const parameters: (string | number)[] = [
            roleId,
            id
        ];

        return this.query(sqlQuery, parameters);
    };


    async removeEmployee(id: number) {
        console.log(`Deleting this ID:`, id);
        const deleteSqlQuery = `UPDATE employee SET status = $1 WHERE id = $2 RETURNING *;`
        const parameters: (number | string)[] = [
            'deleted',
            id
        ]

        return this.query(deleteSqlQuery, parameters)

    };


    async findAllRoles() {
        const sqlQuery = "SELECT * FROM employee_role WHERE status = $1 ORDER BY salary DESC;"
        const parameters = [
            "active"
        ]
        return this.query(sqlQuery, parameters);
    };
    
    async addRole(salary: number, title: string, department: number) {
        const sqlQuery = `INSERT INTO employee_role (title, salary, department, status) VALUES
        ($1, $2, $3, $4) RETURNING *;`;

        const parameters: (string | number)[] = [
            title,
            salary,
            department,
            'active'
        ];

        return this.query(sqlQuery, parameters);
    };

    async updateEmployeeRole(id: number, salary: number, title: string, department: number) {
        const sqlQuery = `UPDATE employee_role SET title=$1, salary=$2, department=$3 WHERE id=$4 RETURNING *;`;

        const parameters: (string | number)[] = [
            title,
            salary,
            department,
            id
        ];

        return this.query(sqlQuery, parameters);
    };

    async findAllManagers() {
        const sqlQuery = `SELECT * FROM employee WHERE id IN (select manager_id FROM employee WHERE manager_id IS NOT NULL AND status = $1) AND status = $1;`
        const parameters = [
            "active"
        ]
        return this.query(sqlQuery, parameters);
    };

    async findAllDepartments() {
        const sqlQuery = `SELECT * FROM department WHERE status = $1;`
        const parameters = [
            "active"
        ]
        return this.query(sqlQuery, parameters);
    };

    async removeRole(id: number) {
        console.log(`Deleting this ID:`, id);
        const deleteSqlQuery = `UPDATE employee_role SET status = $1 WHERE id = $2 RETURNING *;`
        const parameters: (number | string)[] = [
            'deleted',
            id
        ]

        return this.query(deleteSqlQuery, parameters)
    };


    async addDepartment(department_name: string) {
        const sqlQuery = `INSERT INTO department (department_name, status) VALUES
        ($1, $2) RETURNING *;`;

        const parameters: string [] = [
            department_name,
            'active'
        ];

        return this.query(sqlQuery, parameters);
    }

    async removeDepartment(id: number) {
        console.log(`Deleting this department:`, id);
        const deleteSqlQuery = `UPDATE department SET status = $1 WHERE id = $2 RETURNING *;`
        const parameters: (number | string)[] = [
            'deleted',
            id
        ]

        return this.query(deleteSqlQuery, parameters)
    }


}

