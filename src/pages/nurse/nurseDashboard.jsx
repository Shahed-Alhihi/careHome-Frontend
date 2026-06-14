import { Link } from "react-router-dom";
import {Home,Calendar,Pill,UserPlus} from "lucide-react";
import "./nurseDashboard.css"



function DashboardPage(){
    //mock
    const patients=[
        {
            id:1,
            name:"Margaret Thompson",
            age:78,
            room:101,
            condition:"stable",
            image: "/public/1.jpg"
        },
        {
              id:2,
            name:"Robert Wilson",
            age:82,
            room:102,
            condition:"needs monitoring" ,
        image: "/public/2.webp"       },
         {
              id:3,
          name: "Elizabeth Brown",
      age: 75,
      room: "103",
      condition: "Good" ,
    image: "/public/3.jpg"
    },
  ];


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

        <div className="dashboard-container">
            <div className="dashboard-top">
                <div>
                    <h1> Residents</h1>
                    <p> Manage residents and their daily care information</p>

                </div>

                <button className="add-patient-btn">
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
                                <div className="condition-label"> Condition </div>

                            <span className={badgeClass(patient.condition)}>{patient.condition}</span>


                            <div className="patient-actions">
                                <Link to={`/patient/${patient.id}`} className="view-btn">
                                View Details
                                </Link>

                                <button className="icon-btn">
                                    <Calendar size={18}/>
                                </button>

                                <button className="icon-btn">
                                    <Pill size={18} />
                                </button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default DashboardPage;