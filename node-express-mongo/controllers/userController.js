const validationHandler = require("../validations/validationHandler");
const User = require("../models/user");
const config = require("../../config/index");
const jwt = require("jwt-simple");

exports.login = async (req, res, next) => {
    try {
        const info = req.body.info;
        const password = req.body.password;
        let user = await User.findOne({ username: info });
        if (!user) {
            user = await User.findOne({ email: info});
            if (!user) {
                const error= new Error("Wrong credentials!");
                error.statusCode = 401;
                throw error;
            }
        }

        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.encode({id: user.id, admin: user.admin}, config.jwtSecret);
        return res.send({user, token});



    } catch (err) {
        next(err)
    }
}

exports.signup = async (req, res, next) => {
    try {
        validationHandler(req);

        let existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            const error = new Error("Email already in use.");
            error.statusCode = 403;
            throw error;
        }

        existingUser = await User.findOne({username: req.body.username});
        if (existingUser) {
            const error = new Error("Username already in use");
            error.statusCode = 403;
            throw error;
        }

        let user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = await user.encryptPassword(req.body.password);
        if (req.body.admin==true) {
            user.admin = true;
        }
        user = await user.save();
        return res.send({message: "successfully registered user."});

    } catch (err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        validationHandler(req);
        emailChange = false;

        let existingUser = await User.findOne({email: req.params.id});
        if (!existingUser) {
            existingUser = await User.findOne({username: req.params.id});
            if (!existingUser) {
                const error = new Error("Username already in use");
                error.statusCode = 403;
                throw error;
            }
            emailChange = true;
        }

        if (req.body.email&&emailChange) {
            existingUser.email = req.body.email;
        }
        if (req.body.password) {
            existingUser.password = await existingUser.encryptPassword(req.body.password);
        }
         
        existingUser = await existingUser.save();
        return res.send({message: "user updated successfully"})

    } catch (err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        console.log(req.params.id);
        let existingUser = await User.findOne({email: req.params.id});
        if (!existingUser) {
            existingUser = await User.findOne({username: req.params.id});
            if (!existingUser) {
                const error = new Error("Username already in use");
                error.statusCode = 403;
                throw error;
            }
        }
        
        await existingUser.delete();
        res.send({message: "User successfully deleted"});
    } catch (err) {
        next(err);
    }
}

