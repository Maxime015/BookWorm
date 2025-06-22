import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const protectRoute = async (req, res, next) => {
    try {
        // get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'No authentication token provided, access denied' });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token, access denied' });
        }

        // find user by id
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found, access denied' });
        }
        
        req.user = user;
        next();


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error authenticating user' });
    }
}

export default protectRoute;