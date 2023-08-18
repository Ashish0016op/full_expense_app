
const loginDetails=require('../model/loginDetails');
const bcrypt=require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginDetails.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials1' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials2' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

exports.getDetails = async (req, res, next) => {
    try {
        const details = await loginDetails.findAll();
        res.status(200).json({ userDetails: details });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'An error occurred while fetching user details.' });
    }
};

// bcrypt.compare(providedPassword, user.password, (err, result) => {
        //     if (err) {
        //         console.error('Error comparing passwords:', err);
        //         res.status(500).json({ error: 'An error occurred while comparing passwords.' });
        //         return;
        //     }

        //     if (result) {
        //         // Passwords match
        //         res.status(200).json({ message: 'Password is correct.' });
        //     } else {
        //         // Passwords do not match
        //         res.status(401).json({ error: 'Incorrect password.' });
        //     }
            
        // });
