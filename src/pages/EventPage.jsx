import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../services/helper";
import { useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvent(response.data);
    } catch (error) {
      console.error("Error occurred while fetching event Details: ", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const notify = () => {
    toast.info("Registration will open soon!");
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 mt-12">
        <ToastContainer />
      <div className="card  p-5 px-8 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <p className="text-gray-500">
              {new Date(event.date).toDateString()}
            </p>
            <p className="text-gray-500">{event.time}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-lg font-medium">{event.location}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">{event.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-md font-medium">Organized by:</p>
            <p className="text-lg font-bold">{event.organizer.name}</p>
            <p className="text-gray-500">{event.organizer.email}</p>
          </div>
          <div className="text-right">
            <p className="text-md font-medium">Ticket Price:</p>
            <p className="text-lg font-bold">${event.ticketPrice}</p>
            <p
              className={`badge ${
                event.privacy === "public" ? "badge-success" : "badge-error"
              } `}
            >
              {event.privacy.charAt(0).toUpperCase() + event.privacy.slice(1)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <button className="btn btn-success text-white w-40" onClick={notify}>Register Now!</button>
      </div>
    </div>
  );
};

export default EventPage;
