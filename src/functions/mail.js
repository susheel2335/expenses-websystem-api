/* Dependencies */
const nodeMailer = require("nodemailer");

/* Nodemailer Configurations */
const mailconfig = require("../config/mailConfig");

/* Enable the Config Vars */
require("dotenv").config();

/* Export the functions */
module.exports = {

	/* Send a welcome email to the user */
	async welcome(user, email, res) {
		/* Create a transporter */
		const transporter = nodeMailer.createTransport(mailconfig);
	
		/* Message Configuration */
		const message = {
			from: `Minhas Despesas - Sistema Gerenciador de Despesas Pessoais <nevio@test.com>`,
			to: `${user} <${email}>`,
			subject: `Boas Vindas ao Sistema`,
			html: `
				<html ⚡4email>
					<head>
						<meta charset="utf-8">
						<style>
							h1 {
								text-align: center;
								color: blue;
							}
						</style>
					</head>
					<body>
						<h1>Hey ${user}!</h1>
	
						<p>Bem vindo ao nosso sistema!</p>
	
						<br>
						
						:)
					</body>
				</html>
			`
		};
		
		try {
			/* Send the Email */
			await transporter.sendMail(message, (err, info) => {
				if (err) {
					return res.status(400).json(err);
				}
			});
		} catch (err) {
			return res.status(400).json(err);
		}
	},

	/* Send a link to the user for him recovery his password */
	async forgotPass(user, email, key, token, res) {	
		/* Create the Transporter */
		const transporter = nodeMailer.createTransport(mailconfig);
	
		/* Message Configuration */
		const message = {
			from: `Minhas Despesas - Sistema Gerenciador de Despesas Pessoais <nevio@test.com>`,
			to: `${user} <${email}>`,
			subject: `Redefinição de Senha`,
			html: `
				<html ⚡4email>
					<head>
						<meta charset="utf-8">
						<style>
							h1 {
								text-align: center;
								color: red;
							}
						</style>
					</head>
					<body>
						<h1>Hey ${user}!</h1>
	
						<p>Você esqueceu sua senha, não tem problema! 
							<a href="${process.env.RESET_PASS_URL}/auth/${key}/${email}/${token}" target="_blank">Click Aqui</a> para redefini-lá!
						</p>
					</body>
				</html>
			`
		};
		
		try {
			/* Send the Email */
			await transporter.sendMail(message, (err, info) => {
				if (err) {
					return res.status(400).json(err);
				} else {
					return res.status(200).json({ msg: `Um email foi enviado para ${email}` });
				}
			});
		} catch (err) {
			return res.status(400).json(err);
		}
	}

}