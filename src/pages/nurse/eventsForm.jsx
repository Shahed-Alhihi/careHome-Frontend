import { useState } from "react";

function EventForm({onClose, onAdd}){
    const [title,setTitle]=useState("");
    const[date,setDate]=useState("");
    const [time,setTime]= useState("");
    const [desc,setDesc]= useState("");


    function handleSubmit(e) {
        e.preventDefault();
         

        const addedEvent={
            id:Date.now(),
            title:title,
            date:date,
            time:time,
            desc:desc,
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