/** Routes for companies */
const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
	try {
		const results = await db.query(`SELECT * FROM companies`);
		return res.json({ companies: results.rows });
	} catch (e) {
		return next(e);
	}
});

router.get('/:code', async (req, res, next) => {
	try {
		let code = req.params.code;

		const compResult = await db.query(
			`SELECT code, name, description
           FROM companies
           WHERE code = $1`,
			[code]
		);

		const invResult = await db.query(
			`SELECT id
           FROM invoices
           WHERE comp_code = $1`,
			[code]
		);

		if (compResult.rows.length === 0) {
			throw new ExpressError(`No such company: ${code}`, 404);
		}

		const company = compResult.rows[0];
		const invoices = invResult.rows;

		company.invoices = invoices.map(inv => inv.id);

		return res.json({ "company": company });
	} catch (e) {
		return next(new ExpressError('Something went wrong...'));
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { code, name, description } = req.body;
		const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description]);
		return res.status(201).json({ company: results.rows[0] });
	} catch (e) {
		return next(e);
	}
});

router.put('/:code', async (req, res, next) => {
	try {
		const { code } = req.params;
		const { name, description } = req.body;
		const results = await db.query('UPDATE companies SET name=$2, description=$3 WHERE code=$1 RETURNING code, name, description', [code, name, description]);
		if (results.rows.length === 0) {
			throw new ExpressError(`Can't update company with code of ${code}`, 404);
		}
		return res.send({ user: results.rows[0] });
	} catch (e) {
		return next(e);
	}
});

router.delete('/:code', async (req, res, next) => {
	try {
		const { code } = req.params;
		const results = db.query('DELETE FROM companies WHERE code=$1 RETURNING code, name, description', [code]);
		return res.send({ msg: `${code} DELETED!` });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;