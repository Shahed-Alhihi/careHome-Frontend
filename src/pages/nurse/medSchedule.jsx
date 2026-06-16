import { Link } from "react-router-dom";
import { Home, Pill } from "lucide-react";
import './medSchedule.css';



function MedSchedule(){
    const patientSchedule=[
        {
            time:"8:00 AM",
            medicines:[
                {
                    patient: "Margaret Thomposon",
                    name:"Aspirin",
                    dosage:"100 mg"
                },
                 {
                    patient: "Rober Wilson",
                    name:"Blood pressure",
                    dosage:"1 tablet"
                }
            ],
        },
        {
           time:"6:00 AM",
            medicines:[
                {
                    patient: "Margaret Thomposon",
                    name:"Calcuim",
                    dosage:"500 mg"
                } ,
            ],
        },
        {
        time:"11:00 AM",
            medicines:[
                {
                    patient: "Elizabeth Brown",
                    name:"Vitamin D",
                    dosage:"1 tablet"
                } ,
            ],
        },
    ];


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

                    {patientSchedule.map((item) => (
                        <div className="schedule-section" key={item.time}>
                            <h2>{item.time}</h2>


                            {item.medicines.map((medicine, index)=>(
                                <div className="schedule-card" key={index}>
                                    <Pill size={22} />

                                    <div>
                                        <h3>{medicine.name}</h3>
                                        <p>{medicine.dosage}</p>
                                        <span>{medicine.patient}</span>
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