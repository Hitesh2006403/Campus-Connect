require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./Models/Event");

const sampleEvents = [
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
];

async function seedEvents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingCount = await Event.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} event(s). No seed inserted.`);
      return;
    }

    const inserted = await Event.insertMany(sampleEvents);
    console.log(`Seeded ${inserted.length} event(s) into MongoDB.`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedEvents();
