/* Dependencia do JsonWebToken */
const jwt = require("jsonwebtoken");

/* Habilita as viariaveis de ambiente */
require("dotenv").config();

/* Exporta a função middleware para bloaquear as rotas */
module.exports = async (req, res, next) => {

    /* Verifica se o preflight é OPTIONS */
    if (req.method == "OPTIONS") {
        next();
    } else {

        /* Pega o Token */
        const token = req.body.token || req.query.token || req.headers["authorization"];

        /* Verifica se o token não existe */
        if (!token) {
            return res.status(403).json({ errorMsg: "No token Provided" });
        }

		try {
			/* Verifica o Token */
			await jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
				/* 1 - Retorna o error se houver algum */
				/* 2 - Coloca o token a variavel decoed e chama o proximo middleware */
				if (err) {
					return res.status(403).json({ errorMsg: "Failed to authenticate token" });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} catch (err) {
			return res.status(400).json(err);
		}

    }

}