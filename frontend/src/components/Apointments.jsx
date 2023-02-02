import React, { useEffect, useState } from "react";
import api, { formatDate, whichDayString } from "@services/services";
import "../styles/apointments.css";

function Apointments({ setIsApointmentDisplayed }) {
  const [availability, setAvailability] = useState();
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({ visible: false, id: "" });
  const [message, setMessage] = useState({ next_step: 1 });
  const [jour, setJour] = useState("");
  const [alert, setAlert] = useState("");

  // récupère les disponibilités
  const handleAvailabilities = (day) => {
    const days = whichDayString(day);
    setJour(days);
    api.get(`/availability/${days}`).then((result) => {
      if (result.status === 404) {
        console.error("Pas de disponibilité ce jour là");
      } else if (result.status === 5000) {
        console.error("impossible de récupérer les disponibilités");
      } else {
        setAvailability(result.data);
      }
    });
  };

  //   on attend que availability soit chargé pour le rendering
  useEffect(() => {
    if (typeof availability !== "undefined") {
      console.error(availability);
      setIsAvailabilityLoading(false);
    }
  }, [availability]);

  const handleMessage = () => {
    const name = document.querySelector("#name").value;
    const firstname = document.querySelector("#firstname").value;
    const email = document.querySelector("#courriel").value;
    const company = document.querySelector("#entreprise").value;
    const request = document.querySelector("#message-input").value;

    // vérifie que tous les champs sont remplis

    if (
      name.length === 0 ||
      name === "Nom" ||
      firstname.length === 0 ||
      firstname === "Prénom" ||
      email.length === 0 ||
      email === "email" ||
      company.length === 0 ||
      company === "Entreprise" ||
      request.length === 0
    ) {
      console.error("alerte");
      setAlert("Valeur manquante");
    } else {
      setMessage({
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#name").value,
        email: document.querySelector("#courriel").value,
        company: document.querySelector("#entreprise").value,
        message: document.querySelector("#message-input").value,
        next_step: 2,
      });
    }
  };

  const postMessage = () => {
    // envoie le message à la fin de toutes les étapes
    api
      .post("/messages", {
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
  };

  const handleDate = () => {
    const selectedDate = document.querySelector("#date").value;
    // on vérifie que la date a bien été saisie
    if (!selectedDate) {
      setAlert("Sélectionnez une date");
    } else {
      const date = new Date(selectedDate);

      handleAvailabilities(date.getDay());
      setMessage({
        ...message,
        next_step: 3,
        date,
      });
    }
  };

  const displayDay = (e) => {
    setAlert("");
    const selectedDate = new Date(e.target.value);
    setJour(whichDayString(selectedDate.getDay()));
  };

  const handleTimeslot = () => {
    setMessage({
      ...message,
      next_step: 4,
      timeslot: document.querySelector("#proposed-timeslot").value,
    });
  };

  const postAppointment = () => {
    // poste la demande d'entretien
  };

  const handleDisplayTimeSelection = (e) => {
    console.error(typeof e.target.value);
    setIsVisible({ visible: true, id: parseInt(e.target.value, 10) });
  };

  const handleSubmit = () => {
    postMessage();
    postAppointment();
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

  const handlePreviousStep = () => {
    setMessage({ ...message, next_step: message.next_step - 1 });
    setIsAvailabilityLoading(true);
    setAvailability();
  };

  return (
    <div className="container">
      <div className="user-interaction">
        <div id="input-area">
          <div className="interaction-box" id="messages">
            <div>
              <h2>
                <span className={message.next_step === 1 ? null : "invisible"}>
                  {message.next_step}
                </span>
                Remplissez votre message
              </h2>
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
                  onChange={() => {
                    setAlert("");
                  }}
                />
              </label>
            </form>
          </div>
          <div className="interaction-box" id="calender">
            <div>
              <h2>
                <span className={message.next_step === 2 ? null : "invisible"}>
                  {message.next_step}
                </span>
                Sélectionnez une date
              </h2>
            </div>
            <form>
              <label htmlFor="date">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder={new Date()}
                  onChange={displayDay}
                />
                <span id="day">{jour}</span>
              </label>
            </form>
          </div>
          <div className="interaction-box" id="timeslot">
            <h2>
              <span className={message.next_step === 3 ? null : "invisible"}>
                {message.next_step}
              </span>
              Sélection créneau
            </h2>
            <form>
              {isAvailabilityLoading
                ? ""
                : availability.map((avail) => {
                    const { idavailability, start, end } = avail;

                    return (
                      <div key={idavailability} className="availabilities">
                        <label htmlFor={idavailability}>
                          <input
                            type="radio"
                            name="disponibilité"
                            id={idavailability}
                            value={idavailability}
                            onChange={handleDisplayTimeSelection}
                          />
                          De {formatDate(start)} à {formatDate(end)}
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
                          <span>30 min</span>
                        </label>
                      </div>
                    );
                  })}
            </form>
          </div>
        </div>
        <div className="step-hider" id={`step-${message.next_step}`} />
        <div id="alert">{alert}</div>
        <div id="steps-control-area">
          <div>
            {message.next_step === 1 ? null : (
              <button
                type="button"
                className="validation-btn"
                id="prev-step"
                onClick={handlePreviousStep}
              >
                {"< "}Revenir en arrière
              </button>
            )}
          </div>
          <div>
            <button
              type="button"
              className="validation-btn"
              id="next-step"
              name="next-step"
              onClick={handleDispatch}
            >
              {message.next_step === 3
                ? "Envoyer la demande"
                : "> Passer à l'étape suivante"}
            </button>
          </div>
        </div>
        <div
          className="close-btn"
          role="button"
          onClick={() => {
            setIsApointmentDisplayed(false);
          }}
          onKeyDown={null}
          tabIndex="0"
        >
          <div>x</div>
        </div>
      </div>
    </div>
  );
}

export default Apointments;
