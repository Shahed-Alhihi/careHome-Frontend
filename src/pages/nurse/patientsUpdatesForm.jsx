import { useState } from "react";

function PatientsUpdateForm({onClose, onAdd}){
    const [date,setDate]=useState("");
    const [time,setTime]= useState("");
    const[notes,setNotes]=useState("");
    const[nurse,setNurse]=useState("");


    function handleSubmit(e) {
        e.preventDefault();

    
        const newInfo={
             id:Date.now(),
            date:date,
            time:time,
            notes:notes,
            nurse:nurse,

        };

        onAdd(newInfo);
        onClose();
    }


    return(
        <div className="add-patient-background">
        <div className="add-patient">
            <h2>Add patient's Daily Update</h2>


            <form onSubmit={handleSubmit}>
                <label> Date </label>
                <input type="date" placeholder="Enter the date" value={date} onChange={(e) => setDate(e.target.value)} required/>

                <label> Time </label>
                <input type="time" placeholder="Enter the current time" value={time} onChange={(e) => setTime(e.target.value)} required/>

                <label> Update Notes </label>
                <input type="text" placeholder="Describe patient's condition" value={notes} onChange={(e) => setNotes(e.target.value)} required/>

                <label> Added by </label>
                <input type="text" placeholder="Enter nurse name" value={nurse} onChange={(e) => setNurse(e.target.value)} required/>


               <div className="buttons">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" className="save-btn">
                        Add Update Info
                        </button>
                        </div>
                
                
                
            </form>

        </div>
        </div>
    );



}


export default PatientsUpdateForm;