import {Link,useParams} from "react-router-dom";
import {Home,ArrowLeft, Pill, Calendar, FileText } from "lucide-react";
import "./patientDetails.css";
import { useState,useEffect } from "react";
import MedicineForm from "./medicineForm";
import PatientsUpdateForm from "./patientsUpdatesForm";


function PatientDetails() {
    const {id}= useParams();

      const patients=[
         {
            id:1,
            name:"Margaret Thompson",
            age:78,
            room:101,
            condition:"stable",
            image: "/1.jpg",
            admissionDate: "2025-01-10",
            emergencyContact: "Sara Thompson- 079876543",
        },
        {
              id:2,
            name:"Robert Wilson",
            age:82,
            room:102,
            condition:"needs monitoring" ,
            image: "/2.webp",
            admissionDate: "2025-02-10",
            emergencyContact: "James wilson- 079878765",  
         },
         {
              id:3,
          name: "Elizabeth Brown",
            age: 75,
            room: "103",
            condition: "Good" ,
            image: "/3.jpg",
             admissionDate: "2025-05-15",
            emergencyContact: "Emma Brown- 079345678",
    },
  ];



  const [medicines,setMedicines]= useState(() =>{
    const saveMed=localStorage.getItem(`medicines-${id}`);

    if(saveMed){
        return JSON.parse(saveMed);
    }
    return[
  
    {
        id:1,
        name:"Aspirin",
        dosage:"100mg",
        time:"8:00 AM"
    },
    {
         id:2,
        name:"Vitamin D",
        dosage:"one tablet",
        time:"11:00 AM"
    },
];
});

useEffect(()=>{
    localStorage.setItem(`medicines-${id}`,JSON.stringify(medicines));
},[medicines,id])

  const [showAddForm,setShowAddForm]=useState(false);
  const [editMed, setEditMed]=useState(null);

  function addNewMedicine(newMedicine){
    setMedicines([...medicines,newMedicine]);
  }

  function deleteMedicine(id){
    setMedicines(
        medicines.filter((medicine)=> medicine.id !==id)
    );
  }

  function updateMedicine(updatedMed){
    setMedicines(
        medicines.map((medicine) =>{
            if(medicine.id===updatedMed.id){
                return updatedMed;
            }
            else{
                return medicine
            }
        }
    )
    );
  }

  const [updates,setUpdates]= useState(() =>{
        const saveUpdate=localStorage.getItem(`updates-${id}`);

         if(saveUpdate){
        return JSON.parse(saveUpdate);
    }
    return[
    {
         id:1,
        date:"2026-06-13",
        nurse:"Nurse Leyla",
        notes:"patient condition is stable and had breakfast normally"
    },

      {
         id:2,
        date:"2026-06-14",
        nurse:"Nurse Sara",
        notes:"Blood preasure and SPO2 were checked and recorded",
       } ,
    ];
}
);
useEffect(()=>{
    localStorage.setItem(`updates-${id}`,JSON.stringify(updates));
},[updates, id])

const [showUpdate,setUpdate]=useState(false);


function addUpdate(newUpdate){
    setUpdates([...updates,newUpdate]);
}

  const events=[
    {
        id:1, 
        title:"Doctor visit",
        date:"2026-06-17",
        time: "10:00 AM"
    },
 {
        id:2, 
        title:"Family visit",
        date:"2026-06-18",
        time: "12:00 PM"
    },

  ];


  const patient=patients.find((p)=> p.id===Number(id));

  const badgeClass=(condition) =>{
    if(condition==="Good") return "status-badge status-good";
    if (condition==="needs monitoring")  return "status-badge status-critical";
    return "status-badge status-stable";
        
    
  };



  return(
     <div className="details-page">
        <nav className="details-navbar">
            <div className="nav-logo">
                <div className="nav-logo-icon"><Home size={22} /> </div>
                <div>
                    <h1>Care Home</h1>
                    <p>Patient Details</p>
                </div>
            </div>

            <div className="nav-links">
                <Link to="/nurse"> Residents</Link>
                <Link to="/medicine-schedule"> Medicine Schedule</Link>
                <Link to="/events"> Events</Link>
                <Link to="/"> Logout</Link>
            </div>
        </nav>


        <main className="details-container">
            <Link to="/nurse" className="back-link">
            <ArrowLeft size={18} />
            Back to Patients
            </Link>

            <div className="patient-profile-card">
                <img src={patient.image} alt={patient.name} />

                <div>
                    <h1>{patient.name}</h1>
                    <p> Room {patient.room}</p>
                    <span className={badgeClass(patient.condition)}> {patient.condition} </span>
                </div>
            </div>

            <div className="details-grid">
                <div  className="details-section">
                    <h2>Patient Information</h2>

                    <p>
                        Age: {patient.age}
                    </p>

                    <p>
                        Room: {patient.room}
                    </p>

                    <p>
                        Admission date: {patient.admissionDate}
                    </p>

                    <p>
                        Emergency Contact Info: {patient.emergencyContact}
                    </p>
                </div>

                <div className="details-section">
                    <h2>
                        <Calendar size={22} /> Upcoming events
                    </h2>


                    {events.map((event) => (
                        <div className="small-card" key={event.id}>
                            <h3>{event.title}</h3>
                            <p> {event.date} - {event.time} </p>
                            </div>
                    ))}
                </div>
            </div>


            <div className="details-section full-section">
                <div className="section-header">
                    <h2>
                        <Pill size={22} />Medicines
                    </h2>

                    <button className="small-add-btn" onClick={()=>{
                        setEditMed(null);
                        setShowAddForm(true);
                    }}>
                        Add Medicine 
                    </button>
                </div>

                {medicines.map((medicine)=> (
                    <div className="medicine-row" key={medicine.id}>
                        <div>
                            <h3>{medicine.name}</h3>
                            <p>{medicine.dosage}</p>
                        </div>

                        <div className="medicine-actions"> 
                            <span> {medicine.time}</span>

                            <button
                            className="edit-btn"
                            onClick={()=>{
                                setEditMed(medicine);
                                setShowAddForm(true);
                            }}>
                                Edit Medicine
                            </button>

                            <button className="delete-btn" onClick={()=>deleteMedicine(medicine.id)}>
                                Delete
                            </button>

                        </div>
                        </div>
                ))}
            </div>

            {showAddForm && (<MedicineForm
                onClose={()=>setShowAddForm(false)}
                onAddMed={addNewMedicine}
                onUpdateMed={updateMedicine}
                editMed={editMed} />
            )}


            <div className="details-section full-section">
                <div className="section-header">
                <h2>
                    <FileText size={22} /> Daily Updates
                </h2>

                <button
                className="small-add-btn"
                onClick={()=>setUpdate(true)}>
                    Add Update
                </button>
                </div>

                {updates.map((update)=>(
                    <div className="update-card" key={update.id}>
                        <h3>{update.date} at {update.time}</h3>
                        <p>{update.notes}</p>
                        <span> {update.nurse}</span>
                        </div>
                ))}
            </div>

            {showUpdate && (<PatientsUpdateForm
                onClose={()=> setUpdate(false)}
                onAdd={addUpdate} />
            )}
        </main>
        </div>
  );
    
}

export default PatientDetails;