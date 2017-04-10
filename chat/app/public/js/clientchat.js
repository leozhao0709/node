let socket = io(); 

socket.on("online", (msg) => {
    showMsg(1);
});

socket.on("offline", (msg) => {
    showMsg(0);
});
