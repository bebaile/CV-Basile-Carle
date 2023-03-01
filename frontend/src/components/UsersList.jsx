/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import api, { formatDateDMY } from "@services/services";
import deleteIcon from "@assets/delete.png";
import editIcon from "@assets/edit.png";
import emailImg from "@assets/email.png";
import replyImg from "@assets/reply.png";
import replyImg2 from "@assets/reply2.png";
import send from "@assets/send.png";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

function UsersList() {
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState();
  const [replyMessage, setReplyMessage] = useState({ id: "" });
  const [replyAlert, setReplyAlert] = useState({
    idApointment: "",
    message: "Rédigez votre réponse ici",
  });
  const [areUsersModified, setAreUsersModified] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState({ email: "", visible: false });
  const [areUserDetailsDisplayed, setAreUserDetailsDisplayed] = useState(false);
  const [isDeleteConfirmationDisplayed, setIsDeleteConfirmationDisplayed] =
    useState({ email: "", visible: false });
  const [isReplyDisplayed, setIsReplyDisplayed] = useState({
    email: "",
    message_id: "",
    visible: "false",
  });
  const [userToDelete, setUserToDelete] = useState("");

  useEffect(() => {
    // récupère la liste de tous les utilisateurs pour les afficher
    api.get("/users").then((result) => {
      if (result.status === 500) {
        console.error("Erreur de communication avec la base de données");
      } else {
        setUsers(result.data);
      }
    });
    // on récupère les messages
    api.get("/messages").then((result) => {
      if (result.status === 500) {
        console.error("impossible de récupérer les messages");
      } else {
        setMessages(result.data);
      }
    });
  }, [areUsersModified]);

  // on attend le chargement des utilisateurs pour faire un rendering
  useEffect(() => {
    if (
      typeof users !== "undefined" &&
      typeof isEdited !== "undefined" &&
      typeof messages !== "undefined"
    ) {
      setIsLoading(false);
    }
  }, [users, isEdited, messages]);

  useEffect(() => {}, []);

  // affiche demande de confirmation d'utilisateur
  const displayDeleteConfirmation = (email) => {
    setIsDeleteConfirmationDisplayed({ visible: true });
    setUserToDelete(email);
  };

  // si l'utilisateur décide finalement de ne pas supprimer l'utilisateur
  const handleCancelDelete = () => {
    setIsDeleteConfirmationDisplayed({ visible: false });
  };

  // suppression de l'utilisateur dans le back
  const handleDelete = (e) => {
    const email = e.currentTarget.getAttribute("data-value");
    console.error(email);
    api.delete(`/users/${email}`).then((result) => {
      console.error(result);
      setIsDeleteConfirmationDisplayed(false);
      setAreUsersModified(true);
    });
  };

  // gestion de la mise à jour d'un utilisateur dans le back
  const handleEdit = (email) => {
    setIsEdited({
      email,
      visible: !isEdited.visible,
    });
    if (isEdited.visible === true) {
      console.error(document.querySelector("#prenom").value);
      api
        .put(`/users/${email}`, {
          firstname: document.querySelector("#prenom").value,
          email: document.querySelector("#email").value,
          company: document.querySelector("#company").value,
        })
        .then((result) => {
          if (result.status === 404 || result.status === 500) {
            console.error(`Erreur ${result.status} : utilisateur non modifié`);
          } else {
            console.error(`Utilisateur bien modifié`);
            setAreUsersModified(true);
          }
          console.error(result);
        });
    }
  };

  const displayUserDetails = (email) => {
    setAreUserDetailsDisplayed({
      email,
      visible: !areUserDetailsDisplayed.visible,
    });
  };

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

    let { recipient } = replyMessage;
    recipient = users.filter(
      (user) => user.id_user.data.join("") === recipient.data.join("")
    )[0].email;
    console.error(recipient);

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
    <>
      <div id="admin-table">
        {isLoading ? (
          "Chargement ..."
        ) : (
          <table>
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Courriel</th>
                <th>Entreprise</th>
                <th>
                  #{" "}
                  <img
                    src={emailImg}
                    alt="Email by Mira iconic from Noun Project"
                    id="email-img"
                  />
                </th>
                <th>Edit</th>
                <th>X</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <React.Fragment key={user.email}>
                    <tr className="user-line">
                      <td
                        onClick={() => displayUserDetails(user.email)}
                        onKeyDown={null}
                        tabIndex="0"
                        role="button"
                      >
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? "_edit"
                              : null
                          }
                        >
                          {user.firstname}
                        </span>
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? null
                              : "_edit"
                          }
                        >
                          <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            defaultValue={user.firstname}
                          />
                        </span>
                      </td>
                      <td
                        onClick={() => displayUserDetails(user.email)}
                        onKeyDown={null}
                        tabIndex="0"
                        role="button"
                      >
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? "_edit"
                              : null
                          }
                        >
                          {user.email}
                        </span>
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? null
                              : "_edit"
                          }
                        >
                          <input
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={user.email}
                          />
                        </span>
                      </td>
                      <td
                        onClick={() => displayUserDetails(user.email)}
                        onKeyDown={null}
                        tabIndex="0"
                        role="button"
                      >
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? "_edit"
                              : null
                          }
                        >
                          {user.company}
                        </span>
                        <span
                          className={
                            isEdited.email === user.email &&
                            isEdited.visible === true
                              ? null
                              : "_edit"
                          }
                        >
                          <input
                            type="text"
                            name="company"
                            id="company"
                            defaultValue={user.company}
                          />
                        </span>
                      </td>
                      <td
                        onClick={() => displayUserDetails(user.email)}
                        onKeyDown={null}
                        tabIndex="0"
                        role="button"
                      >
                        {/* affiche le nombre de messages envoyés par cet utilisateur */}
                        {
                          messages.filter(
                            (message) =>
                              message.user_id_user.data.join("") ===
                              user.id_user.data.join("")
                          ).length
                        }
                      </td>
                      <td className="edit">
                        <div
                          name={user.id_user}
                          role="button"
                          onClick={() => handleEdit(user.email)}
                          onKeyDown={null}
                          tabIndex="0"
                          className={
                            isEdited.visible === true &&
                            isEdited.email === user.email
                              ? "edited"
                              : null
                          }
                        >
                          <img
                            src={editIcon}
                            id="edit-icn"
                            alt="Delete by mim studio from Noun Project"
                          />
                        </div>
                      </td>
                      <td className="delete">
                        <div
                          role="button"
                          onClick={() => displayDeleteConfirmation(user.email)}
                          onKeyDown={null}
                          tabIndex="0"
                        >
                          <img
                            src={deleteIcon}
                            id="delete-icn"
                            alt="Delete by mim studio from Noun Project"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      {areUserDetailsDisplayed.visible === true &&
                      areUserDetailsDisplayed.email === user.email ? (
                        <td colSpan="6">
                          <div>
                            <table className="details">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Envoi</th>
                                  <th>Destinataire</th>
                                  <th>Contenu</th>
                                  <th>RDV</th>
                                  <th>
                                    <img
                                      src={replyImg}
                                      alt="Reply by Bernd Lakenbrink from Noun Project"
                                      id="replyImg"
                                    />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {messages
                                  .filter(
                                    (message) =>
                                      message.user_id_user.data.join("") ===
                                        user.id_user.data.join("") ||
                                      message.recipient_email === user.email
                                  )
                                  .map((message, index) => {
                                    const html = DOMPurify.sanitize(
                                      message.message
                                    );

                                    return (
                                      <React.Fragment key={message.id}>
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            {formatDateDMY(message.create_time)}
                                          </td>
                                          <td className="recipient">
                                            {message.recipient_email}
                                          </td>
                                          <td>{HTMLReactParser(html)} </td>
                                          <td>{formatDateDMY(message.day)}</td>
                                          <td id="reply-btn">
                                            <img
                                              src={replyImg2}
                                              alt="Reply by Adrien Coquet from Noun Project"
                                              id="replyImg2"
                                              onClick={() => {
                                                // c'est ici qu'on modifie
                                                handleDisplayReply(
                                                  user.email,
                                                  message.id
                                                );
                                              }}
                                              onKeyDown={null}
                                              role="button"
                                            />
                                          </td>
                                        </tr>
                                        {isReplyDisplayed.email ===
                                          user.email &&
                                        isReplyDisplayed.message_id ===
                                          message.id &&
                                        isReplyDisplayed.visible === true ? (
                                          <tr>
                                            <td colSpan="6">
                                              {isReplyDisplayed.email ===
                                                user.email &&
                                              isReplyDisplayed.message_id ===
                                                message.id &&
                                              isReplyDisplayed.visible ===
                                                true ? (
                                                <table id="reply-table">
                                                  <tr>
                                                    <td id="reply-area">
                                                      <img
                                                        src={replyImg2}
                                                        alt="Reply by Adrien Coquet from Noun Project"
                                                        id="replyImg2"
                                                      />
                                                    </td>
                                                    <td>
                                                      {formatDateDMY(Date())}
                                                    </td>
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
                                                            recipient:
                                                              message.user_id_user,
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
                                                        onClick={
                                                          handleSendReply
                                                        }
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
                          </div>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div>
        {isDeleteConfirmationDisplayed.visible ? (
          <ConfirmDeleteUser
            userToDelete={userToDelete}
            handleDelete={handleDelete}
            handleCancelDelete={handleCancelDelete}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default UsersList;
