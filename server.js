const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail", // ou outro serviço de e-mail
        auth: {
            user: "SEU_EMAIL@gmail.com",
            pass: "SUA_SENHA_APP",
        },
    });

    const mailOptions = {
        from: email,
        to: "alexandreperezdesign@gmail.com",
        subject: `Contato de ${name}`,
        text: `Nome: ${name}\nTelefone: ${phone}\nMensagem: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Mensagem enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).send("Erro ao enviar mensagem.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
