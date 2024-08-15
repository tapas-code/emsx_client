import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../services/helper";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    privacy: "public",
    ticketPrice: "",
  });

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${base_url}/api/events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEventData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching events.", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/api/events`, newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEvents(); // Refresh event list after adding
      document.getElementById('add_event_modal').close(); // Close the modal after submission
    } catch (error) {
      console.error("Error occurred while adding event.", error);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="p-8 flex justify-end">
          <button
            className="btn btn-accent"
            onClick={() => document.getElementById("add_event_modal").showModal()}
          >
            + Add Event
          </button>
        </div>
        <div className="flex-1 p-8 flex gap-8 items-start flex-wrap">
          {eventData &&
            eventData.map((ev) => (
              <div key={ev._id} className="card bg-info text-info-content w-96">
                <div className="card-body">
                  <h2 className="card-title">{ev.title}</h2>
                  <p className="truncate">{ev.description}</p>
                  <div className="card-actions pt-3 justify-end">
                    <button
                      className="btn btn-sm"
                      onClick={() => navigate(`/events/${ev._id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <dialog id="add_event_modal" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add New Event</h3>
          <div className="py-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="input input-bordered w-full mb-2"
              value={newEvent.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              className="textarea textarea-bordered w-full mb-2"
              value={newEvent.description}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full mb-2"
              value={newEvent.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              className="input input-bordered w-full mb-2"
              value={newEvent.time}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              className="input input-bordered w-full mb-2"
              value={newEvent.location}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="ticketPrice"
              placeholder="Ticket Price"
              className="input input-bordered w-full mb-2"
              value={newEvent.ticketPrice}
              onChange={handleChange}
              required
            />
            <select
              name="privacy"
              className="select select-bordered w-full"
              value={newEvent.privacy}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Add Event
            </button>
            <button type="button" className="btn" onClick={() => document.getElementById('add_event_modal').close()}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Events;
