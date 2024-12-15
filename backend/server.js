const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

// Configure CORS
//||"https://project-task-pi.vercel.app/"
const corsOptions = {
    origin: "http://localhost:3000" ||"https://project-task-pi.vercel.app/"||"*", // Allow your frontend domain
    methods: ["GET", "POST", "OPTIONS"],  // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));

// Middleware for preflight OPTIONS requests
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { productsOrdered } = req.body;
        console.log(productsOrdered)
  
    
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
      
        res.json({ url: session.id});
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
