const multer = require('multer')
const cards = require("./cards");
const users = require("./users");
const NewCards= require ('./newcards')
const getCardsWithUsers = require("./utils");


const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/img", express.static("img"));


app.get("/", (req, res) => {
  res.json({ message: "Backend работает! 🚀" });
});

app.get("/cards", (req, res) => {
  const page = parseInt(req.query.page);
  const count = 100; //TODO будем возвращать количество минус 1
  const max = count * page - 1;
  const min = count * (page - 1);
  const cardswithauthor = getCardsWithUsers(cards, users);
  const cardsSlise = cardswithauthor.slice(min, max);
  res.json({ data: cardsSlise });
});

app.get("/popularCards", (req, res) => {
  const cardswithauthor = getCardsWithUsers(cards, users);
  const popularCards = cardswithauthor
    .filter((card) => card.current_dib > 0)
    .sort((a, b) => b.current_dib - a.current_dib)
    .slice(0, 5);
  res.json({
    success: true,
    count: popularCards.length,
    data: popularCards,
  });
});

app.get("/Users", (req, res) => {
  const Users = users;
  res.json({ data: Users });
});

app.get("/NewCards", (req, res) => {
  res.json({ data: NewCards });
});

app.get("/topUsers", (req, res) => {
  const topUsers = users
    .filter((user) => user.precent > 0)
    .sort((a, b) => b.precent - a.precent)
    .slice(0, 10);
  res.json({
    success: true,
    count: topUsers.length,
    data: topUsers,
  });
});

app.post("/newCards",(req,res) =>{
  console.log('=== INCOMING REQUEST TO /card ===');
  console.log('Headers:', req.headers);
  console.log('Full body:', req.body);
  console.log('nft data:', req.body.nft);
  console.log('Type of nft:', typeof req.body.nft);
  console.log('==============================');

const newCard = {
    id: NewCards.length + 1,
    ...req.body.nft, 
    createdAt: new Date().toISOString() // добавляем timestamp
  };

    console.log('New card to be added:', newCard);

 NewCards.push(req.body.nft)
 res.json(req.body.nft)
})

app.post("/newUser",(req,res) =>{
  console.log('=== INCOMING REQUEST TO /card ===');
  console.log('Headers:', req.headers);
  console.log('Full body:', req.body);
  console.log('nft data:', req.body.nft);
  console.log('Type of nft:', typeof req.body.nft);
  console.log('==============================');

const newUser = {
    id: users.length + 1,
    ...req.body.nft, 
    createdAt: new Date().toISOString()
  };

    console.log('New card to be added:', newUser);

 users.push(newUser)
 res.json(req.body.nft)
})

app.post("/login",(req,res) =>{
    console.log('=== LOGIN REQUEST ===');

 const {name, password} = req.body.user || req.body;

const user = users.find(u => u.name === name && u.password === password);


res.json({
     success: true,
     message: "Авторизация успешна",
     user: {
       id: user.id || 0,
       name: user.name || '',
       email: user.mail || user.mail,
       createdAt: user.createdAt
     }
   });
 }
)


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
