/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import api, { formatDateDMY } from "@services/services";
import replyImg from "@assets/reply.png";
import replyImg2 from "@assets/reply2.png";
import send from "@assets/send.png";
import "../styles/user-account.css";

function UserAccount({ setIsUserAccountDisplayed }) {
  const [userMessages, setUserMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isReplyDisplayed, setIsReplyDisplayed] = useState({
    email: "",
    message_id: "",
    visible: "false",
  });
  const [replyMessage, setReplyMessage] = useState({ id: "" });
  const [replyAlert, setReplyAlert] = useState({
    idApointment: "",
    message: "Rédigez votre réponse ici",
  });
  const [areUsersModified, setAreUsersModified] = useState();
  const navigate = useNavigate();

  // chargement des messages et des rendez vous associés
  useEffect(() => {
    api
      .get(`/messages/${sessionStorage.getItem("email")}`)
      .then((result) => {
        setUserMessages(result.data);
      })
      .catch((error) => {
        console.error(error.response.status);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  }, [areUsersModified]);

  useEffect(() => {
    if (typeof userMessages !== "undefined") {
      setIsLoading(false);
    }
  }, [userMessages]);

  const handleDisplayReply = (email, messageId) => {
    // affiche une zone de réponse au message
    setIsReplyDisplayed({
      email,
      message_id: messageId,
      visible: !isReplyDisplayed.visible,
    });
  };

  const handleSendReply = () => {
    const firstname = sessionStorage.getItem("firstname");
    const lastname = sessionStorage.getItem("lastname");
    const email = sessionStorage.getItem("email");
    const company = sessionStorage.getItem("company");
    const message = document.querySelector(`#${replyMessage.id}`).innerHTML;
    const { idApointment } = replyMessage;
    // on  ne peut envoyer de message qu'à l'admin dont l'adresses sera renseignée dans le back
    const recipient = "";

    api
      .post("/messages", {
        firstname,
        lastname,
        email,
        company,
        message,
        idApointment,
        recipient,
      })
      .then((result) => {
        if (result.status === 500) {
          console.error("la réponse n'a pas pu être envoyée");
        } else {
          setAreUsersModified(true);
          setReplyAlert({ idApointment, messsage: "Réponse bien envoyée" });
          setTimeout(() => {
            setIsReplyDisplayed(false);
          }, 3000);
        }
      });
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
                <th>
                  <img
                    src={replyImg}
                    alt="Reply by Bernd Lakenbrink from Noun Project"
                    id="replyImg"
                  />
                </th>
              </thead>
              <tbody>
                {userMessages.map((message) => {
                  const html = DOMPurify.sanitize(message.message);
                  return (
                    <React.Fragment key={message.id}>
                      <tr>
                        <td>
                          {message.recipient_email ===
                          sessionStorage.getItem("email")
                            ? "Admin"
                            : "Moi"}
                        </td>
                        <td>{formatDateDMY(message.create_time)}</td>
                        <td>{HTMLReactParser(html)}</td>
                        <td>{formatDateDMY(message.day)}</td>
                        <td>
                          {message.recipient_email ===
                          sessionStorage.getItem("email") ? (
                            <img
                              src={replyImg2}
                              alt="Reply by Adrien Coquet from Noun Project"
                              id="replyImg2"
                              onClick={() => {
                                handleDisplayReply(
                                  sessionStorage.getItem("email"),
                                  message.id
                                );
                              }}
                              role="button"
                              tabIndex="0"
                              onKeyDown={null}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                      {isReplyDisplayed.email ===
                        sessionStorage.getItem("email") &&
                      isReplyDisplayed.message_id === message.id &&
                      isReplyDisplayed.visible === true ? (
                        <tr>
                          <td colSpan="5">
                            {isReplyDisplayed.email ===
                              sessionStorage.getItem("email") &&
                            isReplyDisplayed.message_id === message.id &&
                            isReplyDisplayed.visible === true ? (
                              <table id="reply-table">
                                <tr>
                                  <td id="reply-area">
                                    <img
                                      src={replyImg2}
                                      alt="Reply by Adrien Coquet from Noun Project"
                                      id="replyImg2"
                                    />
                                  </td>
                                  <td>{formatDateDMY(Date())}</td>
                                  <td>
                                    <div
                                      contentEditable="true"
                                      className="reply-message"
                                      id={`reply-msg-${message.id}`}
                                      suppressContentEditableWarning
                                      onFocus={(e) => {
                                        setReplyMessage({
                                          id: e.target.id,
                                          idApointment:
                                            message.meeting_request_idmeeting_request,
                                          recipient: message.user_id_user,
                                        });
                                        setReplyAlert({
                                          ...replyAlert,
                                          message: "",
                                        });
                                      }}
                                    >
                                      {replyAlert.message}
                                    </div>
                                  </td>
                                  <td>
                                    <img
                                      src={send}
                                      alt="send by Alfan Zulkarnain from Noun Project"
                                      id="send-img"
                                      onClick={handleSendReply}
                                      onKeyDown={null}
                                      role="button"
                                      tabIndex={0}
                                    />
                                  </td>
                                </tr>
                              </table>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
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
