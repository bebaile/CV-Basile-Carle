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
        setUserMessages([result.data]);
      })
      .catch((error) => {
        console.error(error.response.status);
      });
  }, []);

  useEffect(() => {
    if (typeof userMessages !== "undefined") {
      console.error(userMessages);
      setIsLoading(false);
    }
  }, [userMessages]);

  const returnMeetingDetails = () => {
    console.error("coucou");
  };

  return (
    <div className="container">
      <div id="user-account-container">
        <div id="user-account-area">
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
                  returnMeetingDetails();
                  return (
                    <tr key={message.id}>
                      <td>Moi</td>
                      <td>{formatDateDMY(message.create_time)}</td>
                      <td>{message.message}</td>
                      <td>{formatDateDMY(message.create_time)}</td>
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
