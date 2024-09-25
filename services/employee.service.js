const db = require('../db');

// module.exports.getAllEmployees = async() => {
//     const rows = await db.query("SELECT * FROM employee")
//     .catch(err => console.log(err))

//     return rows
// }

// module.exports.getEmployeeById = async(id) => {
//     const rows = await db.query("SELECT * FROM employee WHERE id =" + id)
//     .catch(err => console.log(err))

//     return rows
// }


module.exports.getAllEmployees = async () => {
    const [records] = await db.query("SELECT * FROM employee")
    return records;
}

module.exports.getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employee WHERE id = ?", [id])
    return record;
}

module.exports.deleteEmployee = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM employee WHERE id = ?", [id])
    return affectedRows;
}

module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)",
        [id, obj.name, obj.age, obj.phone])
    return affectedRows;
}