import express from "express";
import cors from "cors";
const app = express();                  // This is everything the express is called API also passed through it 
app.use(cors());
app.use(express.json());

const initialEvents = [
  {
    id: 1,
    title: "MERN Stack Workshop",
    category: "Technology",
    date: "25 September 2026",
    time: "10:00 AM",
    location: "Computer Lab 1",
    description:
      "Learn the basics of MongoDB, Express, React, and Node.js through a practical workshop.",
  },
  {
    id: 2,
    title: "College Hackathon",
    category: "Technology",
    date: "28 September 2026",
    time: "9:00 AM",
    location: "Main Auditorium",
    description:
      "Form a team, solve a real problem, and present your solution to mentors.",
  },
  {
    id: 3,
    title: "Photography Club Meet",
    category: "Club",
    date: "30 September 2026",
    time: "2:00 PM",
    location: "Seminar Hall",
    description:
      "Meet fellow photography enthusiasts and learn basic composition techniques.",
  },
];


app.get ("/", (req, res )=>{
    res.send("Backend is working");            // this is the api route We work on arrow function in backened json and mongodb are same so we use mango in this

}) 

app.get("/api/events",(req,res)=>{
    res.json(initialEvents);                   // this is the api route We work on arrow function in backened json and mongodb are same so we use mango in this

})

app.delete("/api/events/:id", (req,res)=>{
    const eventId = parseInt(req.params.id);  // this is the api route We work on arrow function in backened json and mongodb are same so we use mango in this
    const eventIndex = initialEvents.findIndex(function(event){
        return event.id === eventId;
    });

    if(eventIndex === -1){
      return res.status(404).json({
        message: "Event not found"
      })
    }

    initialEvents.splice(eventIndex,1);
    res.json({ message: "Event deleted successfully" });
})

app.post("/api/events", (req, res)=>{
  const newEvent = req.body;
  initialEvents.push(newEvent);
  res.json({
    message: "Event added successfully",
    event: newEvent
  });
});

app.listen(5000,()=>{
    console.log("server is running on port 5000"); // without these the server will not start 
})