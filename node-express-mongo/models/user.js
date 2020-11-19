const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()}
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.validPassword = async function(candidatePassword) {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result; 
}

module.exports = mongoose.model('user', UserSchema);