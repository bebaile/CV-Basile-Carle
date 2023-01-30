import React from "react";
import "../styles/apointments.css";

function Apointments() {
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
          </div>
        </div>
        <div>
          <button type="button" className="validation-btn" id="next-step">
            {">"} Passer à l'étape suivante
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apointments;
