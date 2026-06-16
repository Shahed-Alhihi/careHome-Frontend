import { Link } from "react-router-dom";
import { Home, Pill } from "lucide-react";
import './medSchedule.css';
import api from "../../service/api";
import { useState,useEffect } from "react";



function MedSchedule(){
    const [medicines,setMedicines]=useState([]);

    useEffect(()=>{
        getMedicines();},[]);

        async function getMedicines() {
            const response= await api.get("/medicines");
            setMedicines(response.data);
            
        }

        const allMed={};
        medicines.forEach((medicine)=>{
            if (!allMed[medicine.medicine_time]) {
                allMed[medicine.medicine_time]=[];
                
            }

            allMed[medicine.medicine_time].push(medicine);
        });


    return(
        <div className="schedule-page">
            <nav className="details-navbar">
                <div className="nav-logo">
                    <div className="nav-logo-icon">
                        <Home size={22} />
                    </div>
                    <div>
                        <h1>Care Home</h1>
                        <p>Medicine Schedule</p>
                    </div>
                </div>


               <div className="nav-links">
                    <Link to="/nurse"> Residents</Link>
                <Link to="/medicine-schedule"> Medicine Schedule</Link>
                <Link to="/events"> Events</Link>
                <Link to="/"> Logout</Link>
            </div>
        </nav>

              <main className="schedule-container">
                    <h1> Medicine Dashboard</h1>
                    <p>Daily medicine schedule for the patient's</p>

                    {Object.keys(allMed).map((time)=>(
                        <div className="schedule-section" key={time}>
                            <h2>{time}</h2>


                            {allMed[time].map((medicine)=>(
                                <div className="schedule-card" key={medicine.id}>
                                    <Pill size={22} />

                                    <div>
                                        <h3>{medicine.medicine_name}</h3>
                                        <p>{medicine.dosage}</p>
                                        <span>{medicine.patient_name} ~ Patient ID: {medicine.patient_id}</span>
                                    </div>
                                    </div>
                            ))}
                            </div>
                    ))}
                    </main>
        </div>
    );
}


export default MedSchedule;