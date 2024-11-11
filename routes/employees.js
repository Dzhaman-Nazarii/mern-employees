const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getAll, getOne, addEmployees, removeEmployees, editEmployees } = require("../controllers/employees");

/* GET /api/employees */
router.get("/", auth, getAll);

/* GET /api/employees/:id */
router.get("/:id", auth, getOne);

/* POST /api/employees/add */
router.post("/add", auth, addEmployees);

/* DELETE /api/employees/remove/:id */
router.delete("/remove/:id", auth, removeEmployees);

/* PUT /api/employees/edit/:id */
router.put("/edit/:id", auth, editEmployees);

module.exports = router;