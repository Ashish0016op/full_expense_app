
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.postForgetPass = async (req, res, next) => {
    try {
        const Email = req.body.Email;
        console.log(Email);

        const sibClient = Sib.ApiClient.instance;
        const apiKey = sibClient.authentications['api-key'];
        apiKey.apiKey = 'xsmtpsib-cd27cb99bdb8c16681fccd30cd383440ce2f43eebc3bc77e11ac5eadf8ef62ec-S06KCpWy94ZxdPqf'; // Use your SendinBlue API key here

        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: 'raccoonop0016@gmail.com'
        };
        const receivers = [
            {
                email: Email
            }
        ];

        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'forgetPassword'
        })
        .then(console.log)
        .catch(console.log);

        res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error sending email.' });
    }
};


