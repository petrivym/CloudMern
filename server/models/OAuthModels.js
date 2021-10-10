const { Schema, model } = require('mongoose');

const { usersRolesEnum } = require('../const');

const OAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
});

// OAuthSchema.pre('findOne', function() {
//     this.populate('user');
// });

module.exports = model('auth', OAuthSchema);
