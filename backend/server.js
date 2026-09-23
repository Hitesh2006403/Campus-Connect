import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const app = express();                  // This is everything the express is called API also passed through it 
app.use(cors());
app.use(express.json());

const eventsFilePath = fileURLToPath(new URL("./events.json", import.meta.url));
let initialEvents = JSON.parse(readFileSync(eventsFilePath, "utf8"));

function saveEvents() {
  writeFileSync(eventsFilePath, JSON.stringify(initialEvents, null, 2) + "\n");
}


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
    saveEvents();
    res.json({ message: "Event deleted successfully" });
})

app.post("/api/events", (req, res)=>{
  const newEvent = req.body;
  initialEvents.push(newEvent);
  saveEvents();
  res.json({
    message: "Event added successfully",
    event: newEvent
  });
});

app.put("/api/events/:id", (req, res)=>{
  const eventId = parseInt(req.params.id);
  const updatedEvent = req.body;
  const eventIndex = initialEvents.findIndex(function(event){
    return event.id === eventId;
  });

  if(eventIndex === -1){
    return res.status(404).json({
      message: "Event not found"
    });
  }

  initialEvents[eventIndex] = {
    ...initialEvents[eventIndex],
    ...updatedEvent
  };
  saveEvents();

  res.json({
    message: "Event updated successfully",
    event: initialEvents[eventIndex]
  });
});

app.listen(5000,()=>{
    console.log("server is running on port 5000"); // without these the server will not start 
})