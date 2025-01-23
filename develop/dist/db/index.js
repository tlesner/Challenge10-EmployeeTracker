//intereacts with the 'main menu'
import { pool } from './connection.js';
export default class Db {
    constructor() {
    }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        }
        finally {
            client.release();
        }
    }
    async findAllEmployees() {
        const sqlQuery = "SELECT * FROM employee WHERE status = $1  ORDER BY last_name ASC;";
        const parameters = [
            "active"
        ];
        return this.query(sqlQuery, parameters);
    }
    ;
    async addNewEmployee(newEmployee) {
        console.log("STUB: addNewEmployee", newEmployee);
    }
    ;
    async findAllRoles() {
        const sqlQuery = "SELECT * FROM employee_role WHERE status = $1 ORDER BY salary DESC;";
        const parameters = [
            "active"
        ];
        return this.query(sqlQuery, parameters);
    }
    ;
    async addRole(salary, title, department) {
        const sqlQuery = `INSERT INTO employee_role (title, salary, department, status) VALUES
        ($1, $2, $3, $4) RETURNING *;`;
        const parameters = [
            title,
            salary,
            department,
            'active'
        ];
        return this.query(sqlQuery, parameters);
    }
    ;
    async findAllManagers() {
        const sqlQuery = `SELECT * FROM employee WHERE id IN (select manager_id FROM employee WHERE manager_id IS NOT NULL AND status = $1) AND status = $1;`;
        const parameters = [
            "active"
        ];
        return this.query(sqlQuery, parameters);
    }
    ;
    async removeRole(id) {
        console.log(`Deleting this ID:`, id);
        const deleteSqlQuery = `UPDATE employee_role SET status = $1 WHERE id = $2 RETURNING *;`;
        const parameters = [
            'deleted',
            id
        ];
        return this.query(deleteSqlQuery, parameters);
    }
}
