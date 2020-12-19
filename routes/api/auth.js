const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// @route    GET api/auth
// @desc     Authenticate user & get token 
// @access   Public
router.post('/',
[
    check('email', 'veuiller entrer un email valide').isEmail(),
    check('password', 'le password est recommande').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {email, password } = req.body ;
    try {
        
        let user = await User.findOne({ email });
        if(!user){
            res
            .status(400).
            json({ errors: [{ msg: 'utilisateur inexistant'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
       
        if(!isMatch){
            res
            .status(400).
            json({ errors: [{ msg: 'Mot de passe incorrect'}]});
        }
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
          payload, 
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {  
            if(err) throw err;
            res.json({ token });
           }
            );

       // res.send('User Enregistre');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
   
});

module.exports = router;     