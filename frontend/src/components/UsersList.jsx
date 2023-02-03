import React, { useEffect, useState } from "react";
import api, { formatDateDMY } from "@services/services";
import deleteIcon from "@assets/delete.png";
import editIcon from "@assets/edit.png";
import emailImg from "@assets/email.png";
import replyImg from "@assets/reply.png";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

function UsersList() {
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState();
  const [apointments, setApointments] = useState();
  const [areUsersModified, setAreUsersModified] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState({ email: "", visible: false });
  const [areUserDetailsDisplayed, setAreUserDetailsDisplayed] = useState(false);
  const [isDeleteConfirmationDisplayed, setIsDeleteConfirmationDisplayed] =
    useState({ email: "", visible: false });
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
    // on récupère les demandes de rendez-vous
    api.get("/apointment").then((result) => {
      if (result.status === 500) {
        console.error("impossible de récupérer les demandes d'entretien");
      } else {
        console.error(result.data);
        setApointments(result.data);
      }
    });
  }, [areUsersModified]);

  // on attend le chargement des utilisateurs pour faire un rendering
  useEffect(() => {
    if (
      typeof users !== "undefined" &&
      typeof isEdited !== "undefined" &&
      typeof messages !== "undefined" &&
      typeof apointments !== "undefined"
    ) {
      setIsLoading(false);
    }
  }, [users, isEdited]);

  useEffect(() => {}, []);

  // affiche demande de confirmation d'utilisateur
  const displayDeleteConfirmation = (email) => {
    setIsDeleteConfirmationDisplayed(true);
    setUserToDelete(email);
  };

  // si l'utilisateur décide finalement de ne pas supprimer l'utilisateur
  const handleCancelDelete = () => {
    setIsDeleteConfirmationDisplayed(false);
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

  return (
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
                <>
                  <tr
                    key={user.email}
                    className="user-line"
                    onClick={() => displayUserDetails(user.email)}
                  >
                    <td>
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
                    <td>
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
                    <td>
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
                    <td>
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
                  <td
                    colSpan="6"
                    className={
                      areUserDetailsDisplayed.visible === true &&
                      areUserDetailsDisplayed.email === user.email
                        ? ""
                        : "user-details-hidden"
                    }
                  >
                    <div>
                      <table className="details">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Envoi</th>
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
                                user.id_user.data.join("")
                            )
                            .map((message, index) => {
                              return (
                                <tr key={message.id}>
                                  <td>{index + 1}</td>
                                  <td>{formatDateDMY(message.create_time)}</td>
                                  <td>{message.message}</td>
                                  <td>
                                    {formatDateDMY(
                                      apointments.filter(
                                        (apointment) =>
                                          apointment.idmeeting_request ===
                                          message.meeting_request_idmeeting_request
                                      )[0].day
                                    )}
                                  </td>
                                  <td>
                                    <img
                                      src={replyImg}
                                      alt="Reply by Bernd Lakenbrink from Noun Project"
                                      id="replyImg"
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </>
              );
            })}
          </tbody>
        </table>
      )}
      {isDeleteConfirmationDisplayed ? (
        <ConfirmDeleteUser
          userToDelete={userToDelete}
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UsersList;
