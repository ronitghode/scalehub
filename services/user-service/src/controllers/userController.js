import UserProfile from '../models/UserProfile.js';

// @desc    Get current user profile
// @route   GET /profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user.userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create or Update user profile
// @route   POST /profile
// @access  Private
export const updateProfile = async (req, res) => {
    const { displayName, bio, avatarUrl } = req.body;

    try {
        let profile = await UserProfile.findOne({ userId: req.user.userId });

        if (profile) {
            // Update
            profile.displayName = displayName || profile.displayName;
            profile.bio = bio || profile.bio;
            profile.avatarUrl = avatarUrl || profile.avatarUrl;

            const updatedProfile = await profile.save();
            return res.json(updatedProfile);
        } else {
            // Create
            profile = new UserProfile({
                userId: req.user.userId,
                displayName,
                bio,
                avatarUrl
            });

            const newProfile = await profile.save();
            return res.status(201).json(newProfile);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
