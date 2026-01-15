import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        maxLength: 500
    },
    avatarUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userProfileSchema.pre('save', async function () {
    this.updatedAt = Date.now();
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
