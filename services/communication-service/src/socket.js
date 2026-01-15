import jwt from 'jsonwebtoken';

const socketHandler = (io) => {
    // Middleware for Authentication
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // Attach user info to socket
            next();
        } catch (err) {
            next(new Error('Authentication error: Invalid token'));
        }
    });

    // Connection Handler
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.userId}`);

        // Join a personal room for notifications
        socket.join(socket.user.userId);

        // Event: Join a specific chat room
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.user.userId} joined room ${roomId}`);
        });

        // Event: Send Message
        socket.on('send_message', (data) => {
            const { roomId, message } = data;
            // Broadcast to room (including sender? or rely on client optimistically?)
            // Let's broadcast to everyone in room including sender for simplicity
            io.to(roomId).emit('receive_message', {
                senderId: socket.user.userId,
                senderName: socket.user.email, // Or fetch display name if needed using service-to-service call (later)
                message,
                timestamp: new Date()
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default socketHandler;
