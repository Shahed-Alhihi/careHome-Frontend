import {Link,useParams} from "react-router-dom";
import {Home,ArrowLeft, Pill, Calendar, FileText } from "lucide-react";
import "./patientDetails.css";
import { useState,useEffect } from "react";
import MedicineForm from "./medicineForm";
import PatientsUpdateForm from "./patientsUpdatesForm";
import api from "../../service/api";

function PatientDetails() {
    const {id}= useParams();

    const[patient,setPatient]=useState(null);
    const[medicines,setMedicines]=useState([]);
    const[updates,setUpdates]=useState([]);
    const[events,setEvents]=useState([]);


    const [showAddForm,setShowAddForm]=useState(false);
  const [editMed, setEditMed]=useState(null);
  const[showUpdate,setUpdate]=useState(false);


  useEffect(()=>{
    getPatientDetails();}
    ,[id]);

    async function getPatientDetails() {
       const patientResult=await api.get(`/patients/${id}`);
        const medicineResult=await api.get(`/medicines/${id}`);
        const updateResult=await api.get(`/updates/${id}`);
        const eventResult= await api.get(`/events/${id}`);


    setPatient(patientResult.data);
    setMedicines(medicineResult.data);
    setUpdates(updateResult.data);
    setEvents(eventResult.data);
    }

    async function addNewMedicine(newMedicine) {
        await api.post(`/medicines`,{
            patient_id: id,
            medicine_name:newMedicine.name,
            dosage: newMedicine.dosage,
            medicine_time: newMedicine.time,
            notes:newMedicine.notes || "",
        });

        getPatientDetails();
    }


    async function deleteMedicine(medicineId) {
        await api.delete(`/medicines/${medicineId}`);
            getPatientDetails();
        }

    async function updateMedicine(updatedMed) {
        await api.put(`/medicines/${updatedMed.id}`,{
            medicine_name:updatedMed.name,
            dosage:updatedMed.dosage,
            medicine_time:updatedMed.time,
            notes:updatedMed.notes || "",
        });
            getPatientDetails();
        }



    async function addUpdate(newUpdate) {
        const user=JSON.parse(localStorage.getItem("user"));

        await api.post("/updates",{
            patient_id:id,
            nurse_id:user.nurse_id,
            update_date:newUpdate.date,
            update_time:newUpdate.time,
            notes:newUpdate.notes,
        });
        getPatientDetails();
    }


      const badgeClass=(condition) =>{
    const value=condition ? condition.toLowerCase() : "";

    if(value==="good") return "status-badge status-good";
    if (value==="needs monitoring")  return "status-badge status-critical";
    return "status-badge status-stable";
        
    
  };


  if(!patient){
    return <h2>Loading...</h2>
  }

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
                  <div className="patient-avatar-large">
                                    {patient.patient_name.split(" ")
                                    .map(word => word[0])
                                    .join("")}
                                    </div>

                <div>
                    <h1>{patient.patient_name}</h1>
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
                        Admission date: {patient.admission_date}
                    </p>

                    <p>
                        Emergency Contact Info: {patient.emergency_contact}
                    </p>
                </div>

                <div className="details-section">
                    <h2>
                        <Calendar size={22} /> Upcoming events
                    </h2>


                    {events.map((event) => (
                        <div className="small-card" key={event.id}>
                            <h3>{event.title}</h3>
                            <p> {event.event_date} - {event.event_time} </p>
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
                            <h3>{medicine.medicine_name}</h3>
                            <p>{medicine.dosage}</p>
                        </div>

                        <div className="medicine-actions"> 
                            <span> {medicine.medicine_time}</span>

                            <button
                            className="edit-btn"
                            onClick={()=>{
                                setEditMed({
                                    id:medicine.id,
                                    name:medicine.medicine_name,
                                    dosage:medicine.dosage,
                                    time:medicine.medicine_time,
                                    notes:medicine.notes,
                                });
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
                        <h3>{update.update_date} at {update.update_time}</h3>
                        <p>{update.notes}</p>
                        <span> {update.nurse_name}</span>
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