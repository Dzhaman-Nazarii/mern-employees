const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getAll, getOne, addEmployee, removeEmployee, editEmployee } = require("../controllers/employees");

/* GET /api/employees */
router.get("/", auth, getAll);

/* GET /api/employees/:id */
router.get("/:id", auth, getOne);

/* POST /api/employees */
router.post("/", auth, addEmployee);

/* DELETE /api/employees/:id */
router.delete("/:id", auth, removeEmployee);

/* PUT /api/employees/:id */
router.put("/:id", auth, editEmployee);

module.exports = router;