import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";

const UserpageA = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const createdat = state.createdAt;
  const updatedat = state.updatedAt;

  const createdatnew = moment(createdat).fromNow();
  const updatedatnew = moment(updatedat).fromNow();

  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`users/${state._id}`);
        Swal.fire("User Deleted!", "", "success");
        navigate("/users");
      } catch (error) {
        console.log(error);
        Swal.fire("Something went wrong!", "", "error");
      }
    }
  };

  const getUser = async () => {
    navigate("/update", { state: state });
  };

  return (
    <>
      {/* <div>
        <h1>{state.brand}</h1>
        <img
          src={`http://localhost:5000/api/vehicle/images/${state.vehicleMainImg}`}
          alt=""
        />
      </div> */}
      <div className="grid lg:grid-cols-2 gap-8 md:px-24 p-4 sm:py-8 ">
        <div className="flex flex-col justify-center items-center md:py-28 py-8 gap-5 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div>
            <img
              className="w-40 h-40 rounded-full shadow-lg border-4 border-blue-500 object-cover"
              src={`${state.img}`}
              alt=""
            />
          </div>
          <div className="text-center mx-6 pt-3">
            <h1 className="text-lg">Available Points</h1>
            <h3 className="text-blue-500">1500</h3>
          </div>
          <div className="text-center">
            <h1 className="text-lg">Account Status</h1>
            <h3 className="text-blue-500">Blue</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-5 xl:ps-20 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <h1>
            {" "}
            <b>ID :</b> {state._id}
          </h1>
          <h1>
            {" "}
            <b>Name :</b> {state.name}
          </h1>
          <h1>
            {" "}
            <b>Email :</b> {state.email}
          </h1>
          <h1>
            {" "}
            <b>Mobile :</b> {state.mobile}
          </h1>
          <h1>
            {" "}
            <b>Country :</b> {state.country}
          </h1>
          <h1>
            {" "}
            <b>Is Admin :</b> {state.isAdmin.toString()}
          </h1>
          <h1>
            {" "}
            <b>Type :</b> {state.type}
          </h1>
          <h1>
            {" "}
            <b>Created at :</b> {createdatnew}
          </h1>
          <h1>
            {" "}
            <b>Updated at :</b> {updatedatnew}
          </h1>

          <div className="flex md:flex-row gap-5 md:mt-8">
            <button
              className="bg-blue-500 p-3 rounded-xl text-white font-bold"
              onClick={getUser}
            >
              Update Details
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 p-3 rounded-xl text-white font-bold"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserpageA;
