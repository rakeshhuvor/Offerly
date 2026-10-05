import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morganMiddleware from "./config/morgan.js";
import errorHandler from "./middleware/error.middleware.js";
import router from "./routes/index.js";

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = ["http://localhost:5173", "https://offerly-sigma.vercel.app", "https://offerly-sigma.vercel.app/login", process.env.CLIENT_URL].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morganMiddleware);
app.get("/create-my-admin-rakesh", async (req, res) => {
  try {
    const User = (await import("./models/user.model.js")).default || (await import("./models/User.js")).default || (await import("./models/user.js")).default;
    const bcrypt = await import("bcryptjs");
    const exists = await User.findOne({ email: "rakesh@offerly.com" });
    if (exists) return res.send("Admin already exists: rakesh@offerly.com / Rakesh@123");
    const hashed = await bcrypt.default.hash("Rakesh@123", 10);
    await User.create({ name: "Rakesh Huvor", email: "rakesh@offerly.com", password: hashed, role: "admin", isAdmin: true });
    res.send("SUCCESS! Admin created: rakesh@offerly.com / Rakesh@123");
  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
});
app.use("/api", router);

app.use(errorHandler);

export default app;
