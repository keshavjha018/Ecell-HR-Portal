import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useEffect } from "react";


const ComplaintForm = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInfo")) || null;


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
    discription: "",
});

  const handleComplaintChange = (e) => {
      const val = e.target.value;
      const name = e.target.name;
      setcomplaintInfo({ ...complaintInfo, [name]: val });
  };

  const verifyUser = async () => {
    const { subject, offender, type, discription, } = complaintInfo;

    if(!subject || !offender || !type || !discription) {
      toast.error("fill all the fields before sign up!!")
      return;
  }

  //Start Waiting
  const loadToast = toast.loading("Processing request...")

    try {
      let id = userData.id;
      const { data } = await axios.post(`/api/complaint/${id}`, {
        subject,
        offender,
        type,
        discription,
        regno
      });
      toast.dismiss(loadToast);

      if (data) {
        toast.success("Your complaint is successfully registered");
        navigate("/");
      }
    } catch (error) {
      toast.dismiss(loadToast);
      toast.error("Something went wrong !");
      console.log("error in verification ", error.message);
    }
  };

  const cancelComplaint = () =>{
    navigate('/user/outpass')
}

  return (
    <>
      <div className="box-border overflow-hidden rounded-[14px] mx-auto border-solid border-[1px] border-black mt-10 lg:max-w-[60rem] md:max-w-[42rem] h-full scroll-smooth select-none shadow-xl">
        <div className="">
          <div>
            <span className="flex justify-center lg:text-xl lg:leading-[6rem] font-semibold text-[#08CA33] text-4xl leading-[6rem] ">
              Complaint form
            </span>
          </div>
          <hr />
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
              <div>
                <span className="lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem]">
                  Name
                </span>
                <div className="box-border border-solid border-[1px] border-[#E2E2E2] lg:max-w-xs rounded ml-[2rem] mt-[-11px] lg:h-[2.1rem] bg-[#E2E2E2] h-12 max-w-lg cursor-not-allowed">
                  <div className="text-[#2B2B2B] p-1 lg:text-[14px] pl-[0.7rem] text-xl">
                    {userData.name}
                  </div>
                </div>
              </div>
              <div>
                <span className="lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem]">
                  Reg No.
                </span>
                <div className="box-border border-solid border-[1px] border-[#E2E2E2] lg:max-w-xs rounded ml-[2rem] mt-[-11px] lg:h-[2.1rem] bg-[#E2E2E2] h-12 max-w-lg cursor-not-allowed">
                  <div className="text-[#2B2B2B] p-1 lg:text-[14px] pl-[0.7rem] text-xl">
                    {regno}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className='lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                Subject
              </span>
              <div className="mt-[-11px] ml-[2rem]">
                <input
                  type="text"
                  className="text-[#2B2B2B] p-1 lg:text-[14px] text-xl pl-[0.7rem] box-border border-solid border-[1px] border-black lg:w-1/2 w-3/4 h-12 lg:h-8 rounded placeholder:italic placeholder:text-slate-400"
                  placeholder="Subject of complaint" name="subject" value={complaintInfo.subject} onChange={handleComplaintChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
              <div>
                <span className='lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                  Offender
                </span>
                <div className="mt-[-11px] ml-[2rem] ">
                  <input
                    type="text"
                    className="text-[#2B2B2B] p-1 lg:text-[14px] text-xl pl-[0.7rem] box-border border-solid border-[1px] border-black lg:w-1/2 w-3/4 h-12 lg:h-8 rounded placeholder:italic placeholder:text-slate-400"
                    placeholder="Name of offender" name="offender" value={complaintInfo.offender} onChange={handleComplaintChange}
                  />
                </div>
              </div>
              <div>
                <span className='lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500 '>
                  Type
                </span>
                <div className="mt-[-11px] ml-[2rem]">
                  <select className="rounded-md lg:text-[1.1rem] text-xl lg:w-1/2 w-3/4 h-12 lg:h-10 font-sans pb-0" name="type" value={complaintInfo.type} onChange={handleComplaintChange}>
                    <option selected disabled>
                      Select
                    </option>
                    <option>Topic</option>
                    <option>Boycott</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <span className='lg:text-[17px] lg:leading-[4rem] font-semibold ml-[2rem] text-2xl leading-[5rem] after:content-["*"] after:ml-0.5 after:text-red-500'>
                Discription
              </span>
              <div className="mt-[-11px] ml-[2rem]">
                <textarea
                  className="text-[#2B2B2B] p-1 lg:text-[14px] text-xl lg:w-1/2 w-3/4 h-20 lg:h-18 pl-[0.7rem] box-border border-solid border-[1px] border-black rounded-md placeholder:italic placeholder:text-slate-400"
                  placeholder="Details" name="discription" value={complaintInfo.discription} onChange={handleComplaintChange}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <button
                type="button"
                className="box-border mx-auto border-solid border-[3px] border-[#FC5050] rounded mt-[3rem] h-12 w-28 lg:h-10 lg:w-20 hover:bg-[#FC5050] hover:text-white p-1 text-[14px] px-[0.7rem] text-[#FC5050] hover:text-[16px]"
                onClick={cancelComplaint}>
                Cancle
              </button>
              <button
                type="button"
                className="box-border mx-auto border-solid border-[3px] border-[#08CA33] rounded mt-[3rem] h-12 w-28 lg:h-10 lg:w-20 mb-8 hover:bg-[#08CA33] hover:text-white p-1 text-[14px] px-[0.7rem] text-[#08CA33] hover:text-[16px]"
                onClick={verifyUser}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintForm;
