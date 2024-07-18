const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        console.log(chats);
        res.render("index", { chats });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/", (req, res) => {
    res.send("root is working");
});

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit", { chat });
});

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    try {
        let updatedChat = await Chat.findByIdAndUpdate(
            id,
            { msg: newMsg },
            { runValidators: true, new: true }
        );

        console.log(updatedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/chats/new", (req, res) => {
    res.render("new");
});

app.delete("/chats/:id", async (req,res) => {
    let { id } =req.params;
    let deletedchat=await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
})

app.post("/chats", async (req, res) => {
    const { from, to, msg } = req.body;
    const newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });

    try {
        await newChat.save();
        console.log("chat was saved");
        res.redirect("/chats");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
    console.log(`server is listening on port 8080`);
});
