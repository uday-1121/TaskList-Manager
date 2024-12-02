import React, { useEffect, useState } from 'react';
import "./MakeTaskList.css";
import MakeTaskListCards from './MakeTaskListCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import axios from "axios";
let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const MakeTaskList = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    }

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
    };

    const submit = async () => {
        if (Inputs.title.trim() === "" || Inputs.body.trim() === "") {
            toast.error("Please enter Title and Body.");
            return;
        }

        if (id) {
            await axios.post("http://localhost:1000/api/v2/addTask", { title: Inputs.title, body: Inputs.body, id: id }).then((response) => {
                console.log(response);
            });
            setInputs({title: "", body: ""});
            toast.success("Your task is added.");
        } else {
            setArray({...Array, Inputs});
            setInputs({ title: "", body: ""});
            toast.success("Your Task is Added");
            toast.error("Your Task is not saved! Please SignUp.");
        }
    };

        const del = async (Cardid) => {
            if (id) {
                await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, { data: { id: id }, }).then(() => {
                    toast("Your Task is Deleted.");
                });
            } else {
                toast.error("PLease SignUp first.");
            }
        };

        const dis = (value) => {
            document.getElementById("maketl-update").style.display = value;
        };

        const update = (value) => {
            toUpdateArray = Array[value];
        };

        useEffect(() => {
            if (id) {
                const fetch = async () => {
                    await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`).then((response) => {
                        setArray(response.data.list);
                    });
                };
                fetch();
            } else {
                toast.error("Please SignUp first.");
            }
        }, [submit]);

        return (
            <>
                <div className="maketl">
                    <ToastContainer />
                    <div className="maketl-main container d-flex justify-content-center align-items-center my-4 flex-column">
                        <div className="d-flex flex-column maketl-inputs-div w-50 p-1">
                            <input type="text" placeholder="Title" className="my-2 p-2 maketl-inputs"
                                onClick={show}
                                name="title"
                                value={Inputs.title}
                                onChange={change}
                            />

                            <textarea id="textarea" type="text" placeholder="Body" className="p-2 maketl-inputs"
                                name="body"
                                value={Inputs.body}
                                onChange={change}
                            />
                        </div>
                        <div className="w-50 d-flex justify-content-end my-3">
                            <button className="home-btn px-2 py-1" onClick={submit}>
                                Add
                            </button>
                        </div>

                    </div>
                    <div className="maketl-body">
                        <div className="container-fluid">
                            <div className="row">
                                {Array &&
                                    Array.map((item, index) => (
                                        <div className="col-lg-3 col-10 mx-5 my-2 key={index}">
                                            <MakeTaskListCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId={index} toBeUpdate={update} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maketl-update" id="maketl-update">
                    <div className="container update"><Update display={dis} update={toUpdateArray} /></div>
                </div>
            </>
        );
    };

export default MakeTaskList;
