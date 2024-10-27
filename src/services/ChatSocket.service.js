const verifyToken = require('../middlewares/verifyToken');
const MessagePrivate = require('../models/MessagePrivate.model');
const User = require('../models/User.model');

class ChatSocketService {
    constructor(io) {
        this.io = io.of('/chat');
        this.userData = [];

        verifyToken(this.io)
    }

    run() {
        this.io.on('connection', async (socket) => {
            console.log('a user connected');

            socket.on('sendMessage', async (data) => {
                const userId = socket.user.sub;
                if (!this.userData.find(user => user.userId === userId)) {
                    this.userData.push({ userId, socketId: socket.id });
                }
                const dataCreate = {
                    user_id: userId,
                    receiver_id: data.receiver_id,
                    message_type: data.message_type ?? 0,
                    content: data.content,
                    is_read: 0
                }
                await MessagePrivate.create(dataCreate);
                const user = await User.findOne({ where: { id: userId } });
                const receiverData = this.userData.find(user => user.userId === data.receiver_id)
                if (receiverData) {
                    this.io.to(receiverData.socketId).emit('receiveMessage', { user, message: data.content });
                }
                this.io.emit('receiveMessage', { user, message: data.content });
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
}

module.exports = ChatSocketService;