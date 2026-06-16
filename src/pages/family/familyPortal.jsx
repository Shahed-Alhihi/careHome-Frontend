import { Link } from "react-router-dom";
import { LogOut,Home,Pill,Calendar,FileText} from "lucide-react";
import './familyPortal.css';
import { useState,useEffect } from "react";
import api from "../../service/api";

function FamilyPortal() {
     const[patient,setPatient]=useState(null);
    const[medicines,setMedicines]=useState([]);
    const[updates,setUpdates]=useState([]);
    const[events,setEvents]=useState([]);

     useEffect(()=>{
    getPatientData();}
    ,[]);

    async function getPatientData() {
        const user=JSON.parse(localStorage.getItem("user"));
        const patientId=user.patient_id;

          const patientResult=await api.get(`/patients/${patientId}`);
        const medicineResult=await api.get(`/medicines/${patientId}`);
        const updateResult=await api.get(`/updates/${patientId}`);
        const eventResult= await api.get(`/events/${patientId}`);


    setPatient(patientResult.data);
    setMedicines(medicineResult.data);
    setUpdates(updateResult.data);
    setEvents(eventResult.data);
    }


    if (!patient) {
        return <h2>Loading...</h2>
        
    }


     return(
        <div className="family-portal-page">
            <nav className="family-navbar">
                <div className="family-logo">
                    <div className="family-logo-icon">
                        <Home size={30} />
                    </div>
                    <div>
                        <h1>Care Home</h1>
                        <p>Family Portal</p>
                    </div>
                </div>

                <Link to="/" className="family-logout">
                <LogOut size={20} />
                Logout
                </Link>
                </nav>


                <main className="family-main">
                    <section className="family-profile-card">
                        <div className="family-avatar">
                            {patient.patient_name
                            .split(" ")
                            .map((word)=>word[0]).join("")}
                        </div>

                        <div>
                            <h1>{patient.patient_name}</h1>
                            <p>Room: {patient.room} ~ {patient.age} years old</p>

                            <span> Condition: {patient.condition}</span>
                        </div>
                    </section>

                    <div className="family-grid">
                        <section className="family-section">
                            <div className="family-section-title">
                                <Home size={24}/>
                                <h2>Patient information</h2>
                            </div>

                            <div className="info-box">
                                <p>Admission date</p>
                                <h3>{patient.admission_date}</h3>
                            </div>

                              <div className="info-box">
                                <p>Emergency Contact</p>
                                <h3>{patient.emergency_contact}</h3>
                            </div>

                        </section>

                        <section className="family-section">
                            <div className="family-section-title">
                                <Pill size={24}/>
                                <h2>Current Medicines</h2>
                            </div>

                            {medicines.map((medicine)=>(
                                <div className="family-medicine-card" key={medicine.id}>
                                    <h3>{medicine.medicine_name}</h3>
                                    <p>{medicine.dosage}</p>
                                    <span>{medicine.medicine_time}</span>
                                    <em>{medicine.notes}
                                    </em>
                                </div>
                            ))}
                        </section>
                    </div>


                    <section className="family-section full">
                        <div className="family-section-title purple-title">
                            <Calendar size={24} />
                            <h2>Upcoming events</h2>
                        </div>


                        {events.map((event)=>(
                            <div className="family-event-card" key={event.id}>
                                <div>
                                    <h3>{event.title}</h3>
                                    <p>{event.event_description}</p>
                                    <span>{event.event_date} ~ {event.event_time}</span>
                                </div>

                                <strong> {event.event_status}</strong>
                            </div>
                        ))}
                    </section>

                    <section className="family-section full">
                        <div className="family-section-title">
                            <FileText size={24} />
                            <h2>Daily Updates</h2>
                        </div>

                        {updates.map((update)=>(
                            <div className="family-update-card" key={update.id}>
                                <div>
                                    <h3>
                                        {update.update_date} 
                                        <span> at {update.update_time}</span>
                                    </h3>
                                    <p>{update.notes}</p>
                                </div>
                                <strong>{update.nurse_name}</strong>
                            </div>
                        ))}
                    </section>
                    <div className="readonly-message">
                        ~~ This is readonly view. For any concrens please contact the nursing staff.
                    </div>
                </main>
                </div>
     );
    
}

export default FamilyPortal;