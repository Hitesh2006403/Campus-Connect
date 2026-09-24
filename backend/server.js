require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Event = require("./Models/Event");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const existingCount = await Event.countDocuments();
    if (existingCount === 0) {
      await Event.insertMany([
        {
          title: "MERN Stack Workshop",
          category: "Technology",
          date: "25 September 2026",
          time: "10:00 AM",
          location: "Computer Lab 1",
          description:
            "Learn the basics of MongoDB, Express, React, and Node.js through a practical workshop.",
        },
        {
          title: "College Hackathon",
          category: "Technology",
          date: "28 September 2026",
          time: "9:00 AM",
          location: "Main Auditorium",
          description:
            "Form a team, solve a real problem, and present your solution to mentors.",
        },
        {
          title: "Photography Club Meet",
          category: "Club",
          date: "30 September 2026",
          time: "2:00 PM",
          location: "Seminar Hall",
          description:
            "Meet fellow photography enthusiasts and learn basic composition techniques.",
        },
      ]);
      console.log("Seeded default events into MongoDB.");
    }
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    const formattedEvents = events.map((event) => ({
      ...event,
      id: event._id.toString(),
    }));
    res.json(formattedEvents);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch events",
      error: error.message,
    });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    const eventResponse = newEvent.toJSON();
    res.status(201).json({
      message: "Event added successfully",
      event: eventResponse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to add event",
      error: error.message,
    });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventResponse = updatedEvent.toJSON();

    res.json({
      message: "Event updated successfully",
      event: eventResponse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to update event",
      error: error.message,
    });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventResponse = deletedEvent.toJSON();

    res.json({
      message: "Event deleted successfully",
      event: eventResponse,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to delete event",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});