const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @desc Login user
 * @access Public
 */
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please, enter required fields" });
	}

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

	const secret = process.env.JWT_SECRET;

	if (user && isPasswordCorrect && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
		});
	} else {
		return res.status(400).json({ message: "Incorrect email or password" });
	}
	} catch (error) {
		return res.status(400).json({ message: "Something went wrong" });
	}
};

/**
 * @route POST /api/user/register
 * @desc Register user
 * @access Public
 */
const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
	if (!email || !password || !name) {
		return res.status(400).json({ message: "Please enter require fields" });
	}

	const registeredUser = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (registeredUser) {
		return res.status(400).json({ message: "User already register" });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		},
	});

	const secret = process.env.JWT_SECRET;

	if (user && secret) {
		res.status(201).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
		});
	} else {
		return res.status(400).json({ message: "Error with create user" });
	}
	} catch (error) {
		return res.status(400).json({ message: "Something went wrong" });
	}
};

/**
 * @route GET /api/user/current
 * @desc Current user
 * @access Private
 */
const current = async (req, res) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		return res.status(400).json({ message: "Something went wrong" });
	}
};

module.exports = { login, register, current };
