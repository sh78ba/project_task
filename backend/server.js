const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

// Enable CORS for all origins
app.use(cors());

// Alternatively, customize CORS settings for specific origins
// app.use(cors({
//     origin: process.env.CLIENT_URL, // Allow only your frontend
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// Middleware to handle preflight OPTIONS requests explicitly
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return res.sendStatus(204); // No Content
    }
    next();
});

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { productsOrdered } = req.body;

        if (!Array.isArray(productsOrdered) || productsOrdered.length === 0) {
            return res.status(400).json({ error: "Items array is required" });
        }

        const lineItems = productsOrdered.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: `Product ${item.productId}`,
                    description: `Quantity: ${item.productQty}`,
                },
                unit_amount: item.productPrice * 100,
            },
            quantity: item.productQty,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
