const mongoose = require ("mongoose");
const Chat=require("./models/chat.js");

main()
.then (() => {console.log("connection successful");
})
.catch(err => console.log.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats= [
    {
        from: "papa",
        to:"radha",
        msg:" kuch krke dikhao",
        created_at:new Date(),
    },
    {
        from: "papa",
        to:"muku",
        msg:" kuch krke dikhao",
        created_at:new Date(),
    },
    {
        from: "papa",
        to:"mummy",
        msg:" kahna lao",
        created_at:new Date(),
    },{
        from: "papa",
        to:"himself",
        msg:" paisa kamao",
        created_at:new Date(),
    },
]
Chat.insertMany(allchats) ;

