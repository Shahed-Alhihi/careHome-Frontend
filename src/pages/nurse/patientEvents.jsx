import { Link } from "react-router-dom";
import {Home,Calendar,Trash,Plus} from "lucide-react";
import "./patientEvents.css"
import { useState,useEffect} from "react";
import EventsForm from "./eventsForm"



function Events(){
    const[events,setEvents]=useState(()=>{
        const saveEvent=localStorage.getItem("events");

        if(saveEvent){
            return JSON.parse(saveEvent);
        }

        return [
            {
                id:1,
                title:"Doctor visit",
                date:"2026-05-12",
                time:"10:00 AM",
                desc:"Regular check up",
            },
            {
                 id:2,
                title:"Family visit",
                date:"2026-06-9",
                time:"11:00 AM",
                desc:"Family visit",
            },
        ];
    });


    const [showEvent,setShowEvent]=useState(false);

    useEffect(()=>{
        localStorage.setItem("events", JSON.stringify(events));
    },[events]);


    function addPatientEvent(addedEvent){
        setEvents([...events,addedEvent]);
    }

    function deletePatientEvent(id){
        setEvents(events.filter((event)=> event.id !== id));
    }


    return (
        <div className="events-page">
            <nav className="details-navbar">
                <div className="nav-logo">
                    <div className="nav-logo-icon">
                        <Home size={22}/>
                    </div>
                    <div>
                        <h1>CareHome</h1>
                        <p>Events Management</p>
                    </div>
                </div>

                <div className="nav-links">
                    <Link to="/nurse"> Residents</Link>
                <Link to="/medicine-schedule"> Medicine Schedule</Link>
                <Link to="/events"> Events</Link>
                <Link to="/"> Logout</Link>
            </div>
        </nav>

              <main className="events-container">
            <div className="events-header">
                <div>
                    <h1> Events Dashboard</h1>
                    <p> Manage care home events and visits</p>

                </div>

                <button className="add-event-btn" onClick={() =>setShowEvent(true)}>
                    <Plus size={20} />
                    Add Event
                </button>
            </div>

            <div className="events-grid">
                {events.map((event)=> (
                    <div className="event-card" key={event.id}>
                        <div className="event-icon">
                            <Calendar size={28} />
                        </div>

                        <div className="event-content">
                            <h3>{event.title}</h3>
                            <p>{event.desc}</p>
                            <span>
                                {event.date} - {event.time}
                            </span>
                        </div>

                        <button className="event-delete-btn"
                        onClick={()=>deletePatientEvent(event.id)}
                        >
                            <Trash size={18} />
                        </button>
                        </div>
                ))}


        </div>
        </main>

        {showEvent && (
            <EventsForm
            onClose={()=>setShowEvent(false)}
            onAdd={addPatientEvent} />
        )}
        </div>
    );
}


export default Events;