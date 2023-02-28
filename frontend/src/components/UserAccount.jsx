import React, { useEffect, useState } from "react";
import api, { formatDateDMY } from "@services/services";
import "../styles/user-account.css";

function UserAccount({ setIsUserAccountDisplayed }) {
  const [userMessages, setUserMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/messages/${sessionStorage.getItem("email")}`)
      .then((result) => {
        setUserMessages(result.data);
        console.error(result.data);
      })
      .catch((error) => {
        console.error(error.response.status);
      });
  }, []);

  useEffect(() => {
    if (typeof userMessages !== "undefined") {
      setIsLoading(false);
    }
  }, [userMessages]);

  return (
    <div className="container">
      <div id="user-account-container">
        <div id="user-account-area">
          <h1>
            Messages de {sessionStorage.getItem("firstname")}{" "}
            {sessionStorage.getItem("lastname")}
          </h1>
          {isLoading ? (
            "Chargement des messages"
          ) : (
            <table id="messages-table">
              <thead>
                <th>Origine</th>
                <th>Date envoi</th>
                <th>Message</th>
                <th>Date RDV</th>
              </thead>
              <tbody>
                {userMessages.map((message) => {
                  return (
                    <tr key={message.id}>
                      <td>Moi</td>
                      <td>{formatDateDMY(message.create_time)}</td>
                      <td>{message.message}</td>
                      <td>{formatDateDMY(message.day)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div
          className="close-btn"
          id="close-user-account-btn"
          role="button"
          onClick={() => {
            setIsUserAccountDisplayed(false);
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

export default UserAccount;
