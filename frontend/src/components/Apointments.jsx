import React, { useEffect, useState } from "react";
import api, { formatDate } from "@services/services";
import "../styles/apointments.css";

function Apointments() {
  const [availability, setAvailability] = useState();
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [message, setMessage] = useState({ next_step: 1 });
  const [isVisible, setIsVisible] = useState({ visible: false, id: "" });

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
    if (typeof availability !== "undefined") {
      setIsAvailabilityLoading(false);
    }
  }, [availability]);

  const handleMessage = () => {
    console.error({
      name: document.querySelector("#name").value,
      firstname: document.querySelector("#firstname").value,
      company: document.querySelector("#entreprise").value,
      message: document.querySelector("#message-input").value,
      next_step: 2,
    });
    api
      .post("/messages", {
        name: document.querySelector("#name").value,
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#name").value,
        email: document.querySelector("#courriel").value,
        company: document.querySelector("#entreprise").value,
        message: document.querySelector("#message-input").value,
      })
      .then((result) => {
        if (result.status === 201) {
          console.error("Le message a bien été envoyé");
        }
        if (result.status === 201) {
          console.error("Le message a bien été envoyé");
        }
      });
    setMessage({
      name: document.querySelector("#name").value,
      firstname: document.querySelector("#firstname").value,
      email: document.querySelector("#courriel").value,
      company: document.querySelector("#entreprise").value,
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

  const handleDisplayTimeSelection = (e) => {
    console.error(typeof e.target.value);
    setIsVisible({ visible: true, id: parseInt(e.target.value, 10) });
  };

  const handleSubmit = () => {
    api.post("/message", message).then((result) => {
      console.error(result);
    });
  };

  const handleDispatch = () => {
    console.error("dispatch");
    switch (message.next_step) {
      case 1:
        handleMessage();
        break;
      case 2:
        handleDate();
        break;
      case 3:
        handleTimeslot();
        break;
      case 4:
        handleSubmit();
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
                  defaultValue={sessionStorage.getItem("lastname") ?? "Nom"}
                  className="references"
                />
              </label>
              <label htmlFor="firstname">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  defaultValue={sessionStorage.getItem("firstname") ?? "Prénom"}
                  className="references"
                />
              </label>
              <label htmlFor="courriel">
                <input
                  type="text"
                  id="courriel"
                  name="courriel"
                  defaultValue={sessionStorage.getItem("email") ?? "email"}
                  className="references"
                />
              </label>
              <label htmlFor="entreprise">
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  defaultValue={
                    sessionStorage.getItem("company") ?? "Entreprise"
                  }
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
              {isAvailabilityLoading
                ? "Chargement des dispos ..."
                : availability.map((avail) => {
                    const { idavailability, day, start, end } = avail;

                    return (
                      <div key={idavailability}>
                        <label htmlFor={idavailability}>
                          <input
                            type="radio"
                            name="disponibilité"
                            id={idavailability}
                            value={idavailability}
                            onChange={handleDisplayTimeSelection}
                          />
                          {day} : De {formatDate(start)} à {formatDate(end)}
                        </label>
                        <label
                          htmlFor={`proposed-timeslot-${idavailability}`}
                          className={
                            isVisible.visible === true &&
                            isVisible.id === idavailability
                              ? "visible"
                              : "invisible"
                          }
                        >
                          <input
                            type="time"
                            id={`proposed-timeslot-${idavailability}`}
                            name={`proposed-timeslot-${idavailability}`}
                          />
                          <span>Créneau de 30 minutes</span>
                        </label>
                      </div>
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
