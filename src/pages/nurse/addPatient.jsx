import {useState} from "react";
import "./addPatient.css"

function AddPatient({onClose, onAddPatient}){
    const [name, setName] =useState("");
    const [age, setAge]=useState("");
    const [room, setRoom]=useState("");
    const [condition,setCondition]=useState ("");
    const [admissionDate, setAdmissionDate]=useState("");
    const [emergencyContact,setEmergencyContact]=useState("");


    function handleSubmit(e) {
        e.preventDefault();


        const newPatient={
            patient_name:name,
            age:age,
            room:room,
            condition:condition,
            admission_date:admissionDate,
            emergency_contact:emergencyContact,
        };

        onAddPatient(newPatient);        
    }


    return(
        <div className="modal-background">
            <div className="add-patient-modal">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                <h2>Add new patient</h2>

                <form onSubmit={handleSubmit}>
                    <div className="modal-field">
                        <label> Full name</label>
                        <input type="text" placeholder="Enter full name " value={name} onChange={(e) => setName(e.target.value)} required/>

                    </div>

                    <div className="modal-grid">
                        <div className="modal-field">
                            <label> Age </label>
                            <input type="number" placeholder="Enter the patient's age " value={age} onChange={(e) => setAge(e.target.value)} required />

                        </div>
                        <div className="modal-field">
                             <label> Room</label>
                    <input type="text" placeholder="Enter the patient's room number" value={room} onChange={(e)=>setRoom(e.target.value)} required />
                    </div>
                    </div>
                   
                    <div className="modal-grid">
                        <div className="modal-field">
                     <label> Condition </label>
                    <input type="text" placeholder="Enter the patient's condition " value={condition} onChange={(e)=>setCondition(e.target.value)} />
                   </div>

                     <div className="modal-field">
                    <label> Admission date </label>
                    <input type="date" placeholder="Enter the admission date" value={admissionDate} onChange={(e)=>setAdmissionDate(e.target.value)} />
                    </div>
                    </div>

                     <div className="modal-field">
                     <label> Emergency Contact </label>
                    <input type="text" placeholder="Enter emergency contact" value={emergencyContact} onChange={(e)=>setEmergencyContact(e.target.value)} />
                    </div>

                    <div className="modal-buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}> Cancel</button>
                        <button type="submit" className="save-btn"> Add Patient</button>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default AddPatient;