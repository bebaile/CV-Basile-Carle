import React, { useEffect, useState } from "react";
import api, { formatDate } from "@services/services";
import "../styles/apointments.css";

function Apointments() {
  const [availability, setAvailability] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ next_step: 1 });

  // récupère les disponibilités
  useEffect(() => {
    api.get("/availability").then((result) => {
      if (result.status === 500) {
        console.error("impossible de récupérer les disponibilités");
      } else {
        setAvailability(result.data);
      }
    });
  }, []);

  //   on attend que availability soit chargé pour le rendering
  useEffect(() => {
    setIsLoading(false);
  }, [availability]);

  const handleMessage = () => {
    console.error({
      name: document.querySelector("#name").value,
      firstname: document.querySelector("#firstname").value,
      company: document.querySelector("#company").value,
      message: document.querySelector("#message-input").value,
      next_step: 2,
    });
    setMessage({
      name: document.querySelector("#name").value,
      firstname: document.querySelector("#firstname").value,
      company: document.querySelector("#company").value,
      message: document.querySelector("#message-input").value,
      next_step: 2,
    });
  };

  const handleDate = () => {
    console.error({
      ...message,
      next_step: 3,
      date: document.querySelector("#date").value,
    });
    setMessage({
      ...message,
      next_step: 3,
      date: document.querySelector("#date").value,
    });
  };

  const handleTimeslot = () => {
    setMessage({
      ...message,
      next_step: 4,
      timeslot: document.querySelector("#proposed-timeslot").value,
    });
  };

  const handleDispatch = () => {
    switch (message.step) {
      case 1:
        handleMessage();
        break;
      case 2:
        handleDate();
        break;
      case 3:
        handleTimeslot();
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="user-interaction">
        <div id="input-area">
          <div className="interaction-box" id="messages">
            <div>
              <h2>Remplissez votre message</h2>
            </div>
            <form>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom"
                  className="references"
                />
              </label>
              <label htmlFor="firstname">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Prénom"
                  className="references"
                />
              </label>
              <label htmlFor="company">
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Entreprise"
                  className="references"
                />
              </label>
              <label htmlFor="message-input">
                <textarea
                  rows="3"
                  id="message-input"
                  name="message-input"
                  placeholder="Votre message"
                />
              </label>
            </form>
          </div>
          <div className="interaction-box" id="calender">
            <div>
              <h2>Sélectionnez une date</h2>
            </div>
            <form>
              <label htmlFor="date">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder={new Date()}
                />
              </label>
            </form>
          </div>
          <div className="interaction-box" id="timeslot">
            <h2>Sélection créneau</h2>
            <form>
              {isLoading
                ? "Chargement des dispos ..."
                : availability.map((avail) => {
                    const { idavailability, day, start, end } = avail;

                    return (
                      <>
                        <label htmlFor={idavailability} key={idavailability}>
                          <input
                            type="radio"
                            name={idavailability}
                            id={idavailability}
                            value={idavailability}
                          />
                          {day} : De {formatDate(start)} à {formatDate(end)}
                        </label>
                        <label htmlFor={`proposed-timeslot-${idavailability}`}>
                          <input
                            type="time"
                            id={`proposed-timeslot-${idavailability}`}
                            name={`proposed-timeslot-${idavailability}`}
                            className="invisible"
                          />
                        </label>
                      </>
                    );
                  })}
            </form>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="validation-btn"
            id="next-step"
            name="next-step"
            onClick={handleDispatch}
          >
            {">"} Passer à l'étape suivante
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apointments;
