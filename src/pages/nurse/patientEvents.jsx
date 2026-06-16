import { Link } from "react-router-dom";
import {Home,Calendar,Trash,Plus} from "lucide-react";
import "./patientEvents.css"
import { useState,useEffect} from "react";
import EventsForm from "./eventsForm"
import api from "../../service/api";



function Events(){
    const[events,setEvents]=useState([]);


    const [showEvent,setShowEvent]=useState(false);
      const [patients,setPatients]=useState([]);


    useEffect(()=>{
       getEvents();
       getPatients();
    },[]);

    async function getEvents() {
        const response=await api.get("/events");
        setEvents(response.data);
        
    }

      async function getPatients() {
        const response=await api.get("/patients");
        setPatients(response.data);
        
    }


    async function addPatientEvent(addedEvent){
        await api.post("/events",{
            patient_id:addedEvent.patient_id,
            title:addedEvent.title,
            event_description:addedEvent.desc,
            event_date:addedEvent.date,
            event_time:addedEvent.time,
            event_status:addedEvent.status,
        });

        getEvents();
        setShowEvent(false);
    }

    async function deletePatientEvent(id){
        await api.delete(`/events/${id}`);
        getEvents();
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
                            <p>{event.event_description}</p>
                            <span>
                                {event.event_date} - {event.event_time}
                            </span>
                            <span className="event-status">
                                {event.event_status}
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
            onAdd={addPatientEvent} 
            patients={patients}/>
        )}
        </div>
    );
}


export default Events;