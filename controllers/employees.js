const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Get employees
 * @access Private
 */
const getAll = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			message: "Failed to get employees",
			error: error.message,
		});
	}
};

/**
 * @route GET /api/employees/:id
 * @desc Get employee
 * @access Private
 */
const getOne = async (req, res) => {
	try {
		const { id } = req.params;
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		});
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({
			message: "Failed to get employee",
			error: error.message,
		});
	}
};

/**
 * @route POST /api/employees/add
 * @desc Add employee
 * @access Private
 */
const addEmployees = async (req, res) => {
	try {
		const { firstName, lastName, address, age } = req.body;
		if (!firstName || !lastName || !address || !age) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const employee = await prisma.employee.create({
			data: {
				firstName,
				lastName,
				address,
				age,
				userId: req.user.id,
			},
		});
		return res.status(201).json(employee);
	} catch (error) {
		res.status(500).json({
			message: "Failed to add employee",
			error: error.message,
		});
	}
};

/**
 * @route DELETE /api/employees/remove/:id
 * @desc Delete employee
 * @access Private
 */
const removeEmployees = async (req, res) => {
	try {
		const { id } = req.params;
		const employee = await prisma.employee.delete({
			where: {
				id,
			},
		});
		res.status(200).json({
			message: "Employee removed successfully",
			employee,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to remove employee",
			error: error.message,
		});
	}
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Edit employee
 * @access Private
 */
const editEmployees = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;
		const employee = await prisma.employee.update({
			where: {
				id,
			},
			data,
		});
		res.status(200).json({
			message: "Employee updated successfully",
			employee,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to edit employee",
			error: error.message,
		});
	}
};

module.exports = {
	getAll,
	getOne,
	addEmployees,
	removeEmployees,
	editEmployees,
};
