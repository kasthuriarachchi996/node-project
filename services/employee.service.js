const db = require('../db');

/**
 * Retrieve all employees from the database.
 * @return {Promise} A promise that resolves to an array of employee objects.
 */
module.exports.getAllEmployees = async () => {
    const [records] = await db.query("SELECT * FROM employee")
    return records;
}


/**
 * Retrieve an employee from the database by its id.
 * @param {number} id - The id of the employee to retrieve.
 * @return {Promise} A promise that resolves to an employee object if found, or undefined if not found.
 */
module.exports.getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employee WHERE id = ?", [id])
    return record;
}


/**
 * Delete an employee from the database by its id.
 * @param {number} id - The id of the employee to delete.
 * @return {Promise} A promise that resolves to the number of deleted records.
 */
module.exports.deleteEmployee = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM employee WHERE id = ?", [id])
    return affectedRows;
}


/**
 * Add or edit an employee in the database.
 * @param {Object} obj - An object with name, age, and phone properties.
 * @param {number} id - The id of the employee to edit, or 0 to add a new employee.
 * @return {Promise} A promise that resolves to the number of affected records.
 */
module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)",
        [id, obj.name, obj.age, obj.phone])
    return affectedRows;
}
