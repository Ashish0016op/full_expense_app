
const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../model/loginDetails');
const Forgotpassword = require('../model/forgetPass');

 // Replace with your SendGrid API key

 const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

 const forgotpassword = async (req, res) => {
     try {
         const { email } = req.body;
         const signupData = await User.findOne({ where: { email } });
 
         if (signupData) {
             const id = uuid.v4();
             await signupData.createForgotpassword({ id, active: true }); // Use await to handle promise
 
             sgMail.setApiKey(SENDGRID_API_KEY);
 
             const msg = {
                 to: email,
                 from: 'raccoonop0016@gmail.com',
                 subject: 'Password Reset',
                 text: 'Click the link below to reset your password:',
                 html: `<a href="http://localhost:5500/password/resetpassword/${id}">Reset Password</a>`,
             };
 
             await sgMail.send(msg); // Use await to handle promise
 
             res.status(200).json({ message: 'Password reset email sent successfully.', success: true });
         } else {
             res.status(404).json({ message: 'User does not exist.', success: false });
         }
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Server error.', success: false });
     }
 };

// Other functions (resetpassword, updatepassword) remain the same



const resetpassword = (req, res) => {
    const id =  req.params.id;
    const token = req.params.token;
    Forgotpassword.findOne({ where: { token } }).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}


