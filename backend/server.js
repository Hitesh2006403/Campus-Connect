// const express = require("express");  
// const cors = require("cors");  //cors is used to allow the frontend to access the backend//
// const app = express();   //.get ,put,post,delete,put means updating,post means creating,delete means deleting, get means getting data from the server.//
// app.use(cors)                 
// app.get("/", (req, res)=>{
//     res.send("Backend is working ");
// }) 

// app.get("/api/events", (req, res)=>{

//     res.send("Events API is working");
// })

// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000");   //this is used to run the backend like loading the backed in localhost 5000 //
// })

const express=require("express");               // To including the express 
const cors = require("cors");
const app = express();                  // This is everything the express is called API also passed through it 
app.use(cors());

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
app.listen(5000,()=>{
    console.log("server is running on port 5000"); // without these the server will not start 
})