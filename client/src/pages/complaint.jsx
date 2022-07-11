import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./complaint.css";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const defaultUserData = {
    email: "Please Log In First",
    name: "Please Log In First",
    id: "Please Log In First"
  }
  const userData = JSON.parse(localStorage.getItem("userInfo")) || defaultUserData;


  // useEffect(()=>{
  //   async function checkLoggedIn(){
  //     try{
  //       console.log("in tryyy");
  //       if(!userData){
  //         navigate("/login");
  //       }
  //     }catch(e){
  //       navigate("/login");
  //     }
  //   };
  //   checkLoggedIn();
  // }, []);

  let string = "@iiitdwd.ac.in";
  const regno = userData.email.replace(string, "");

  const [complaintInfo, setcomplaintInfo] = useState({
    subject: "",
    offender: "",
    type: "",
    description: "",
});

  const handleComplaintChange = (e) => {
      const val = e.target.value;
      const name = e.target.name;
      setcomplaintInfo({ ...complaintInfo, [name]: val });
  };

  const verifyUser = async () => {
    const { subject, offender, type, description, } = complaintInfo;

    if(!subject || !offender || !type || !description) {
      toast.error("Fill all the fields before Submit!!")
      return;
  }

  //Start Waiting
  const loadToast = toast.loading("Processing request...")

    try {
      let id = userData.id;
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/api/complaint/${id}`, {
        subject,
        offender,
        type,
        description,
        regno
      });
      toast.dismiss(loadToast);

      if (data) {
        toast.success("Your complaint is successfully registered");
        navigate("/");
      }
    } catch (error) {
      toast.dismiss(loadToast);
      toast.error("Something went wrong ! Please Log In ");
      console.log("error in verification ", error.message);
    }
  };

  const cancelComplaint = () =>{
    navigate('/')
}

  return (
    <>
      <div className="card complaintBox box-border overflow-hidden rounded-[14px] mx-auto lg:max-w-[60rem] md:max-w-[42rem] h-full scroll-smooth select-none ">
        <div className="">
          <div>
            <span className="complaintHeading flex justify-center ">
              Complaint Form
            </span>
          </div>
          <hr />
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
              <div>
                <span className="inputHead  lg:ml-[2rem] text-2xl leading-[5rem]">
                  Name
                </span>
                <div className="inputBox box-border border-solid border-[1px] border-[#E2E2E2] lg:max-w-xs rounded lg:ml-[2rem] mt-[-11px] lg:h-[2.1rem] bg-[#E2E2E2] h-12 max-w-lg cursor-not-allowed">
                  <div className="autofillBoxText text-[#2B2B2B] lg:text-[14px] pl-[0.7rem] lg:text-xl">
                    {userData.name}
                  </div>
                </div>
              </div>
              <div>
                <span className="inputHead lg:ml-[2rem] text-2xl leading-[5rem]">
                  Reg No.
                </span>
                <div className="inputBox box-border border-solid border-[1px] border-[#E2E2E2] lg:max-w-xs rounded lg:ml-[2rem] mt-[-11px] lg:h-[2.1rem] bg-[#E2E2E2] h-12 max-w-lg cursor-not-allowed">
                  <div className="autofillBoxText text-[#2B2B2B] lg:text-[14px] pl-[0.7rem] lg:text-xl">
                    {regno}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className='inputHead lg:ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                Subject
              </span>
              <div className="inputBox mt-[-11px] lg:ml-[2rem]">
                <input
                  type="text"
                  className="inputBoxText text-[#2B2B2B]  p-1 lg:text-[14px] lg:text-xl  box-border border-solid border-[1px] border-grey lg:h-10 rounded placeholder:italic placeholder:text-slate-400"
                  placeholder="Subject of complaint" name="subject" value={complaintInfo.subject} onChange={handleComplaintChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
              <div>
                <span className='inputHead lg:text-[17px] lg:leading-[4rem] font-semibold lg:ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                  Offender
                </span>
                <div className="inputBox mt-[-11px] lg:ml-[2rem] ">
                  <input
                    type="text"
                    className="inputBoxText text-[#2B2B2B] p-1 lg:text-[14px] lg:text-xl  box-border border-solid border-[1px] border-grey lg:h-10 rounded placeholder:italic placeholder:text-slate-400"
                    placeholder="Name of offender" name="offender" value={complaintInfo.offender} onChange={handleComplaintChange}
                  />
                </div>
              </div>
              <div>
                <span className='inputHead lg:text-[17px] lg:leading-[4rem] font-semibold lg:ml-[2rem] lg:text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500 '>
                  Type of Issue
                </span>
                <div className=" mt-[-11px] lg:ml-[2rem] ">
                  <select className="issueBox rounded-md lg:text-[1.1rem] lg:text-xl lg:w-1/2 w-3/4 h-12 lg:h-10 font-sans pb-0" name="type" value={complaintInfo.type} onChange={handleComplaintChange}>
                    <option defaultValue="" disabled>
                      Select
                    </option>
                    <option>Issue</option>
                    <option>Boycott</option>
                    <option>Abuse</option>
                    <option>Discrimination</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <span className='inputHead lg:text-[17px] lg:leading-[4rem] font-semibold lg:ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                Description
              </span>
              <div className="inputBox mt-[-11px] lg:ml-[2rem]">
                <textarea
                  className="inputBoxText descriptnBox text-[#2B2B2B] p-1 lg:text-[14px] lg:text-xl lg:h-20 pl-[0.7rem] box-border border-solid border-[1px] border-grey rounded-md placeholder:italic placeholder:text-slate-400"
                  placeholder="Details" name="description" value={complaintInfo.description} onChange={handleComplaintChange}
                />
              </div>
            </div>
            <div className="btnContainer flex lg:grid-cols-2 grid-cols-1">
              <button
                type="button"
                className="box-border mx-auto border-solid border-[3px] border-[#08CA33] rounded mt-[2rem] h-12 w-28 lg:h-10 lg:w-20 mb-8 hover:bg-[#08CA33] hover:text-white p-1 text-[14px] px-[0.7rem] text-[#08CA33] hover:text-[16px]"
                onClick={verifyUser}>
                Submit
              </button>
              <button
                type="button"
                className="box-border mx-auto border-solid border-[3px] border-[#FC5050] rounded mt-[2rem] h-12 w-28 lg:h-10 lg:w-20 hover:bg-[#FC5050] hover:text-white p-1 text-[14px] px-[0.7rem] text-[#FC5050] hover:text-[16px]"
                onClick={cancelComplaint}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintForm;
