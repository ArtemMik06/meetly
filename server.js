// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/meetly";

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Підключено до MongoDB"))
//   .catch((err) => console.error("Помилка підключення:", err));

// // ---- Схема користувачів ----
// const UserSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   password: String,
//   full_name: String,
//   birth_date: String,
// });

// const User = mongoose.model("User", UserSchema);

// app.post("/register", async (req, res) => {
//     try {
//       const { email, name, password, full_name, birth_date } = req.body;

//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: "Такий email вже існує" });
//       }

//       const newUser = new User({ email, name, password, full_name, birth_date });
//       await newUser.save();

//       console.log("Новий користувач:", newUser);

//       res.status(201).json({ message: "Реєстрація успішна", _id: newUser._id });
//     } catch (error) {
//       console.error("Помилка реєстрації:", error);
//       res.status(500).json({ message: "Помилка сервера" });
//     }
// });

// app.get("/user/:id", async (req, res) => {
//     console.log("Отриманий userId:", req.params.id);

//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "Користувача не знайдено" });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Помилка отримання користувача:", error);
//         res.status(500).json({ message: "Помилка сервера" });
//     }
// });

// // ---- Схема заходів ----
// const EventSchema = new mongoose.Schema({
//   name: String,
//   shortDescription: String,
//   fullDescription: String,
//   city: String,
//   address: String,
//   ageLimit: String,
// });

// const Event = mongoose.model("Event", EventSchema);

// app.post("/api/events", async (req, res) => {
//     try {
//         const { name, shortDescription, fullDescription, city, address, ageLimit } = req.body;

//         if (!name || !shortDescription || !city) {
//             return res.status(400).json({ message: "Назва, опис і місто є обов'язковими!" });
//         }

//         const newEvent = new Event({ name, shortDescription, fullDescription, city, address, ageLimit });
//         await newEvent.save();

//         console.log("Новий захід:", newEvent);

//         res.status(201).json({ message: "Захід успішно створено!", event: newEvent });
//     } catch (error) {
//         console.error("Помилка створення заходу:", error);
//         res.status(500).json({ message: "Помилка сервера" });
//     }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/meetly";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Підключено до MongoDB"))
  .catch((err) => console.error("Помилка підключення:", err));

// ---- Схема користувачів ----
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  full_name: String,
  birth_date: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
    try {
      const { email, name, password, full_name, birth_date } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Такий email вже існує" });
      }

      const newUser = new User({ email, name, password, full_name, birth_date });
      await newUser.save();

      console.log("Новий користувач:", newUser);

      res.status(201).json({ message: "Реєстрація успішна", _id: newUser._id });
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      res.status(500).json({ message: "Помилка сервера" });
    }
});

app.get("/user/:id", async (req, res) => {
    console.log("Отриманий userId:", req.params.id);

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }
        res.json(user);
    } catch (error) {
        console.error("Помилка отримання користувача:", error);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    res.json({ message: "Авторизація успішна", userId: user._id });
  } catch (error) {
    console.error("Помилка авторизації:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// ---- Схема заходів ----
const EventSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  fullDescription: String,
  city: String,
  address: String,
  ageLimit: String,
});

const Event = mongoose.model("Event", EventSchema);

app.post("/api/events", async (req, res) => {
    try {
        const { name, shortDescription, fullDescription, city, address, ageLimit } = req.body;

        if (!name || !shortDescription || !city) {
            return res.status(400).json({ message: "Назва, опис і місто є обов'язковими!" });
        }

        const newEvent = new Event({ name, shortDescription, fullDescription, city, address, ageLimit });
        await newEvent.save();

        console.log("Новий захід:", newEvent);

        res.status(201).json({ message: "Захід успішно створено!", event: newEvent });
    } catch (error) {
        console.error("Помилка створення заходу:", error);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

app.get("/api/events/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Захід не знайдено" });
        }
        res.json(event);
    } catch (error) {
        console.error("Помилка отримання заходу:", error);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

app.get("/api/events", async (req, res) => {
  try {
      const events = await Event.find();
      res.json(events);
  } catch (error) {
      console.error("Помилка отримання заходів:", error);
      res.status(500).json({ message: "Помилка сервера" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});
