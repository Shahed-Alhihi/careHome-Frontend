import { useState } from "react";

function MedicineForm({onClose, onAddMed, onUpdateMed,editMed}){
    const [name,setName]=useState(editMed ? editMed.name: "");
    const[dosage,setDosage]=useState(editMed ? editMed.dosage: "");
    const [time,setTime]= useState(editMed ? editMed.time: "");


    function handleSubmit(e) {
        e.preventDefault();
         if(editMed){
        const updatedMed={
            id: editMed.id,
            name:name,
            dosage:dosage,
            time:time,
        };

        onUpdateMed(updatedMed);
    }
    else{
        const addedMed={
            id:Date.now(),
            name:name,
            dosage:dosage,
            time:time,
        };

        onAddMed(addedMed);
    }

    onClose();
}

   

return(
    <div className="add-patient-background">
        <div className="add-patient">
            <h2>{editMed ? "Update Medicine" : "Add Medicine"}</h2>

            <form onSubmit={handleSubmit}>
                <label> Medicine Name</label>
                <input
                type="text"
                placeholder="Enter medicine name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required />

                 <label> Dosage</label>
                <input
                type="text"
                placeholder="Enter medicine dosage"
                value={dosage}
                onChange={(e)=> setDosage(e.target.value)}
                required />


                 <label> Medicine Time</label>
                <input
                type="time"
                placeholder="Enter time, e.g: 08:00 AM"
                value={time}
                onChange={(e)=> setTime(e.target.value)}
                required />


                <div className="buttons">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit" className="save-btn">
                        {editMed ? "Update" : "Add"}
                    </button>
                </div>

            </form>
        </div>
    </div>
);
}


export default MedicineForm;