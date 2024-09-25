const express = require('express'),
    router = express.Router()

const service = require('../services/employee.service')

//http://localhost:3000/api/employee/
//get all employees
router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

//http://localhost:3000/api/employee/:id
//get employee by id
router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(employee)
})

//http://localhost:3000/api/employee/
//add or edit employee
router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
})

//http://localhost:3000/api/employee/
//add or edit employee
router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send('created successfully.')
})

//http://localhost:3000/api/employee/:id
//add or edit employee
router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
})



module.exports = router;