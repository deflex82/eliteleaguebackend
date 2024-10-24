const io=require("socket.io")(3001,{cors:{
    origin:"*",
    methods:["GET","POST"],
}});



io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on("joinRoom", (fixtureId) => {
        socket.join(fixtureId);
        console.log(`User joined room: ${fixtureId}`);
    });
    socket.on("message", (data) => {
        const { fixtureId, message ,sender,sendergameusername,imageUrl} = data;
       const timestamp= new Date().toISOString();
        const chat = {message,sender,sendergameusername,timestamp,imageUrl}
        // Emit the message to the specific room (fixture)
        io.to(fixtureId).emit("message", chat);
        console.log("send to room",chat);
        io.emit("notification", { title: `${sendergameusername} sent a message!`,fixtureId:fixtureId,sender:sender,message:message });
        console.log("send to room", chat);

    });




    
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
})

