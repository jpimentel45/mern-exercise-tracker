//require mongogse
const mongoose = require('mongoose');
//all mongoose schema start same
const Schema = mongoose.Schema;
//useSchema = name
const userSchema = new Schema({
    //single field = userName w/validation
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    //create field for created/modified
    timestamps: true,
});

// 'User" can be named anything that you want to exporrt as 
// export the userSchema as well
const User = mongoose.model('User', userSchema);

module.exports = User;