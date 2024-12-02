import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
const MakeTaskListCards = ({ title, body, id, delid, display, updateId, toBeUpdate }) => {
    return (
        <div className="p-3 maketl-card">
            <div>
                <h5>{title}</h5>
                <p className="maketl-card-p">{body.split("", 30)}...</p>
            </div>
            <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-center align-items-center card-icons card-icon-head px-2 py-1" onClick={() => {
                    display("block");
                    toBeUpdate(updateId);
                }}><RiEditFill />Update</div>
    
                <div className="d-flex justify-content-center align-items-center card-icons del card-icon-head px-2 py-1 text-danger" onClick={() => { delid(id) }}><MdDeleteForever />Delete</div>
            </div>
        </div>
    )
}

export default MakeTaskListCards;
