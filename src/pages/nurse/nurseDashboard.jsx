import { Link } from "react-router-dom";
import {Home,UserPlus} from "lucide-react";
import "./nurseDashboard.css"
import AddPatient from "./addPatient";
import { useState } from "react";



function DashboardPage(){
    //mock
    const [patients,setPatients]= useState([
        {
            id:1,
            name:"Margaret Thompson",
            age:78,
            room:101,
            condition:"stable",
            image: "/1.jpg"
        },
        {
              id:2,
            name:"Robert Wilson",
            age:82,
            room:102,
            condition:"needs monitoring" ,
        image: "/2.webp"       },
         {
              id:3,
          name: "Elizabeth Brown",
      age: 75,
      room: "103",
      condition: "Good" ,
    image: "/3.jpg"
    },
  ]);

  const [showForm,setShowForm]=useState(false);

  function handleAddPatient(newPatient) {
    setPatients([...patients,newPatient]);
    
  }


  const badgeClass=(condition) =>{
    if(condition==="Good") return "status-badge status-good";
    if (condition==="needs monitoring")  return "status-badge status-critical";
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
                                <img src={patient.image} alt={patient.name} className="patient-avatar" />

                            <div>
                            <h3> {patient.name}</h3>
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