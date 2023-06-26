import {nextResponse} from 'next/server';
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';

export default function protectedMiddleware(req, res) {
	const token = req.headers.authorization
	if(!token) {
		res.status(401).json({error: 'authentication token is required'});
	}
	try {
		const data = jwt.verify(token,JWT_SECRET);
		req.user = data.user;
		return req;
	}
	catch(error) {
		res.status(401).json({error: "authentication token not match"});
	}
}
