import { Link } from "react-router-dom";
import { Heart, LogOut,Home,Pill,Calendar,FileText} from "lucide-react";
import './familyPortal.css';

function FamilyPortal() {
    const famPatientID=1;

    const patients = [
    {
      id: 1,
      name: "Margaret Thompson",
      age: 78,
      room: "101",
      condition: "Stable",
      admissionDate: "2025-12-10",
      emergencyContact: "Sarah Thompson (Daughter)",
      emergencyPhone: "(555) 123-4567",
    },
  ];


  const patient=patients.find((p)=>p.id===famPatientID);
  const medicines=JSON.parse(localStorage.getItem(`medicines-${famPatientID}`)) || [
    {
     id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      time: "08:00",
      notes: "Take with water",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "08:00, 20:00",
      notes: "Take with meals",
    },
  ];


    const updates=JSON.parse(localStorage.getItem(`updates-${famPatientID}`)) || [
  {
   id: 1,
      date: "2026-04-16",
      time: "09:30",
      nurse: "Nurse Jennifer",
      notes: "Vital signs stable. Patient had breakfast and participated in morning activities.",
    },
    {
      id: 2,
      date: "2026-04-15",
      time: "14:20",
      nurse: "Nurse Michael",
      notes: "Attended afternoon social event. Good mood and interaction with other residents.",
    },
  ];

const events=JSON.parse(localStorage.getItem(`events`)) || [
 {
      id: 1,
      title: "Physical Therapy",
      desc: "Lower back strengthening exercises",
      date: "Sun, Apr 26",
      time: "14:00",
      type: "therapy",
    },
    {
      id: 2,
      title: "Cardiology Checkup",
      desc: "Annual heart health examination with Dr. Smith",
      date: "Tue, Apr 28",
      time: "10:00",
      type: "medical checkup",
    },
  ];


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
                            {patient.name
                            .split(" ")
                            .map((word)=>word[0]).join("")}
                        </div>

                        <div>
                            <h1>{patient.name}</h1>
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
                                <h3>{patient.admissionDate}</h3>
                            </div>

                              <div className="info-box">
                                <p>Emergency Contact</p>
                                <h3>{patient.emergencyContact}</h3>
                            </div>

                        </section>

                        <section className="family-section">
                            <div className="family-section-title">
                                <Pill size={24}/>
                                <h2>Current Medicines</h2>
                            </div>

                            {medicines.map((medicine)=>(
                                <div className="family-medicine-card" key={medicine.id}>
                                    <h3>{medicine.name}</h3>
                                    <p>{medicine.dosage}</p>
                                    <span>{medicine.time}</span>
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
                                    <p>{event.desc}</p>
                                    <span>{event.date} ~ {event.time}</span>
                                </div>

                                <strong> {event.type}</strong>
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
                                        {update.date} 
                                        <span> at {update.time}</span>
                                    </h3>
                                    <p>{update.notes}</p>
                                </div>
                                <strong>{update.nurse}</strong>
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