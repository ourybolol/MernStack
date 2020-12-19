const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// @route    GET api/users
// @desc     Register route
// @access   Public
router.post('/',
[
    check('name', 'le nom est obligatoire')
    .not()
    .isEmpty(),
    check('email', 'veuiller entrer un email valide')
    .isEmail(),
    check('password', 'taper un mot de passe de 6 caracteres minimum')
    .isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {name, email, password } = req.body ;
    try {
        
        let user = await User.findOne({ email });
        if(user){
            res.status(400).json({ errors: [{ msg: "l'utilisateur existe déjà"}]})
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        await user.save();

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