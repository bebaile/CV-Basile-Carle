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

  const returnMeetingDetails = async (meetingId) => {
    try {
      const response = await api.get(
        `/apointment/${sessionStorage.getItem("email")}/${meetingId}`
      );
      console.error(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

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
                  returnMeetingDetails(
                    message.meeting_request_idmeeting_request
                  );
                  // console.error(userMessages);
                  // const array = [];
                  // let tmpArray = returnMeetingDetails(
                  //   message.meeting_request_idmeeting_request
                  // ).then((result) => (tmpArray = result));

                  // setTimeout(function essai() {
                  //   array.push(tmpArray);
                  //   console.error(array);
                  // }, 10);

                  // tmpArray.then((result) => {
                  //   array.push(result);
                  //   console.error(array);
                  // })

                  return (
                    <tr key={message.id}>
                      <td>Moi</td>
                      <td>{formatDateDMY(message.create_time)}</td>
                      <td>{message.message}</td>
                      <td>22/02/2023</td>
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
