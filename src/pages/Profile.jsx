import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import moment from "moment";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const createdat = user.createdAt;
  const updatedat = user.updatedAt;

  const createdatnew = moment(createdat).fromNow();
  const updatedatnew = moment(updatedat).fromNow();

  console.log(user);

  const navigate = useNavigate();

  const getUser = async () => {
    navigate("/updateProfile", { state: user });
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8 md:px-24 p-4 sm:py-8 ">
        <div className="flex flex-col justify-center items-center md:py-24 py-10 gap-5 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <div>
            <img
              className="w-48 h-48 rounded-full shadow-lg border-4 border-blue-500 object-cover"
              src={`${user.img}`}
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
            <b>Name :</b> {user.name}
          </h1>
          <h1>
            <b>Email :</b> {user.email}
          </h1>
          <h1>
            <b>Mobile :</b> {user.mobile}
          </h1>
          <h1>
            <b>Country :</b> {user.country}
          </h1>
          <h1>
            <b>Created at :</b> {createdatnew}
          </h1>
          <h1>
            <b>Updated at :</b> {updatedatnew}
          </h1>

          <div className="flex md:flex-row gap-5 md:mt-14">
            <button
              className="bg-blue-500 p-3 rounded-xl text-white font-bold"
              onClick={getUser}
            >
              Update Profile
            </button>
            {user.type === "eventOrganizer" && (
              <>
                <Link to="/pending-reservations">
                  <button className="bg-blue-500 p-3 rounded-xl text-white font-bold">
                    Customer Pending Reservations
                  </button>
                </Link>
                <Link to="/my-activities">
                  <button className="bg-blue-500 p-3 rounded-xl text-white font-bold">
                    My Listed Activities
                  </button>
                </Link>
              </>
            )}
            {user.type === "traveler" && (
              <>
                <Link to="/my-reservations">
                  <button className="bg-blue-500 p-3 rounded-xl text-white font-bold">
                    My Reservations
                  </button>
                </Link>
              </>
            )}

            {user.isAdmin && (
              <>
                <Link to="/pending-activities">
                  <button className="bg-blue-500 p-3 rounded-xl text-white font-bold">
                    Pending Activities
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
