import React, { useEffect, useState } from "react";
import api from "@services/services";
import deleteIcon from "@assets/delete.png";
import editIcon from "@assets/edit.png";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

function UsersList() {
  const [users, setUsers] = useState();
  const [areUsersModified, setAreUsersModified] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState({ email: "", visible: false });
  const [isDeleteConfirmationDisplayed, setIsDeleteConfirmationDisplayed] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState("");

  useEffect(() => {
    api.get("/users").then((result) => {
      if (result.status === 500) {
        console.error("Erreur de communication avec la base de données");
      } else {
        setUsers(result.data);
      }
    });
  }, [areUsersModified]);

  useEffect(() => {
    if (typeof users !== "undefined" && typeof isEdited !== "undefined")
      setIsLoading(false);
  }, [users, isEdited]);

  const displayDeleteConfirmation = (email) => {
    setIsDeleteConfirmationDisplayed(true);
    setUserToDelete(email);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationDisplayed(false);
  };

  const handleDelete = (e) => {
    const email = e.currentTarget.getAttribute("data-value");
    console.error(email);
    api.delete(`/users/${email}`).then((result) => {
      console.error(result);
      setIsDeleteConfirmationDisplayed(false);
      setAreUsersModified(true);
    });
  };

  const handleEdit = (email) => {
    setIsEdited({
      email,
      visible: !isEdited.visible,
    });
    if (isEdited.visible === true) {
      api
        .put(`/users/${email}`, {
          username: document.querySelector("#login").value,
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

  return (
    <div>
      {isLoading ? (
        "Chargement ..."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Courriel</th>
              <th>Entreprise</th>
              <th># Messages</th>
              <th>Edit</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.email}>
                  <td>
                    <span
                      className={
                        isEdited.email === user.email &&
                        isEdited.visible === true
                          ? "_edit"
                          : null
                      }
                    >
                      {user.username}
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
                        name="login"
                        id="login"
                        defaultValue={user.username}
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
                  <td>nbre de messages (tbi)</td>
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
