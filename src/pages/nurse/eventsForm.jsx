import { useState } from "react";

function EventForm({onClose, onAdd, patients}){
    const [title,setTitle]=useState("");
    const[date,setDate]=useState("");
    const [time,setTime]= useState("");
    const [desc,setDesc]= useState("");
    const [status,setStatus]= useState("");
    const [patientId,setPatientId]=useState("");

  


    function handleSubmit(e) {
        e.preventDefault();
         

        const addedEvent={
            id:Date.now(),
            title:title,
            date:date,
            time:time,
            desc:desc,
            status:status,
            patient_id:patientId,
        };

        onAdd(addedEvent);

    onClose();
}

   

return(
    <div className="add-patient-background">
        <div className="add-patient">
            <h2>Add Event</h2>

            <form onSubmit={handleSubmit}>
                <label> Event title </label>
                <input type="text" placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                <label> Date </label>
                <input type="date" placeholder="Enter the date" value={date} onChange={(e) => setDate(e.target.value)} required/>

                   <label> Time </label>
                <input type="time" placeholder="Enter the event's time" value={time} onChange={(e) => setTime(e.target.value)} required/>

                <label> Description </label>
                <input type="text" placeholder="Enter event's description" value={desc} onChange={(e) => setDesc(e.target.value)} required/>


                <label> Status</label>
                <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                required>
                    <option value=""> Select status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>


                   <label> Patient</label>
                <select
                value={patientId}
                onChange={(e)=>setPatientId(e.target.value)}
                required>
                    <option value=""> Select patient</option>
                    {patients.map((patient)=>(
                        <option key={patient.id} value={patient.id}>{patient.patient_name}</option>
                    ))}
                    
                 
                </select>


                           <div className="buttons">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" className="save-btn">
                        Add Event
                        </button>
                        </div>


            </form>
        </div>
    </div>
)

};


export default EventForm;