const verifyToken = require('../middlewares/verifyToken');

class VideoSocket {
    constructor(io) {
        this.io = io.of('/video');
        this.userData = [];

        verifyToken(this.io)
    }

    run() {
        this.io.on('connection', async (socket) => {
            socket.emit("me", socket.id)

            socket.on("disconnect", () => {
                socket.broadcast.emit("callEnded")
            })

            socket.on("callUser", (data) => {
                this.io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
            })

            socket.on("answerCall", (data) => {
                this.io.to(data.to).emit("callAccepted", data.signal)
            })
        });
    }
}

module.exports = VideoSocket;
