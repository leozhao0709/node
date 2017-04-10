import * as socketio from "socket.io";

let io = socketio();

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
        io.emit("offline", "");
    });

    io.emit("online", "");
});

export = (server) => {
    io.listen(server);
};