import { Link } from "react-router-dom";
import {Home,UserPlus} from "lucide-react";
import "./nurseDashboard.css"
import AddPatient from "./addPatient";
import { useState, useEffect } from "react";
import api from "../../service/api";



function DashboardPage(){
    const [patients,setPatients]= useState([]);

  const [showForm,setShowForm]=useState(false);

  useEffect(()=>{
    getPatient();
  },[]);

  async function getPatient() {
    const response=await api.get("/patients");
    setPatients(response.data);
    
  }

  async function handleAddPatient(newPatient) {
    await api.post("/patients",newPatient);
    await getPatient();
    setShowForm(false);
    
  }


  const badgeClass=(condition) =>{
    const value=condition ? condition.toLowerCase() : "";

    if(value==="good") return "status-badge status-good";
    if (value==="needs monitoring")  return "status-badge status-critical";
    return "status-badge status-stable";
        
    
  };


  return(
    <div className="dashboard-page">
        <nav className="dashboard-navbar">
            <div className="nav-logo">
                <div className="nav-logo-icon"><Home size={22} /> </div>
                <div>
                    <h1>Care Home</h1>
                    <p>Nurse Dashboard</p>
                </div>
            </div>

            <div className="nav-links">
                <Link to="/nurse"> Residents</Link>
                <Link to="/medicine-schedule"> Medicine Schedule</Link>
                <Link to="/events"> Events</Link>
                <Link to="/"> Logout</Link>
            </div>
        </nav>

        <main className="dashboard-container">
            <div className="dashboard-top">
                <div>
                    <h1> Residents Dashboard</h1>
                    <p> Manage residents and their daily care information</p>

                </div>

                <button className="add-patient-btn" onClick={() =>setShowForm(true)}>
                    <UserPlus size={20} />
                    Add Patient
                </button>
            </div>

            <div className="patients-grid">
                {patients.map((patient)=> (
                    <div className="patient-card" key={patient.id}>


                            <div className="patient-card-header">
                                <div className="patient-avatar">
                                    {patient.patient_name.split(" ")
                                    .map(word => word[0])
                                    .join("")}
                                    </div>
                            <div>
                            <h3> {patient.patient_name}</h3>
                            <span className="room">Room {patient.room}</span>
                            </div>
                            </div>

                            <div className="age-row">
                                <span>Age</span>
                                <span>{patient.age}</span>
                                </div>

                                <p className="condition-label">Condition</p>

                            <span className={badgeClass(patient.condition)}>{patient.condition}
                            </span>


                            <div className="patient-actions">
                                <Link to={`/patient/${patient.id}`} className="view-btn">
                                View Details
                                </Link>

                            </div>
                        </div>
                ))}
            </div>
        </main>
        {showForm && (<AddPatient
            onClose={()=>setShowForm(false)}
            onAddPatient={handleAddPatient}/>
        )}
    </div>
  );
}

export default DashboardPage;