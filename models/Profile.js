const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        //basically forign key
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        require: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubRepo: {
        type: String
    },
    experience: [
        // this is past all the company that were used
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        // this is all the education that the user have
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                require: true
            },
            fieldofstudy: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);