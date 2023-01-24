import React, { useEffect, useState } from "react";
import api from "@services/services";
import deleteIcon from "@assets/delete.png";
import editIcon from "@assets/edit.png";

function UsersList() {
  const [users, setUsers] = useState();
  const [areUsersModified, setAreUsersModified] = useState();

  useEffect(() => {
    api.get("/users").then((result) => {
      if (result.status === 500) {
        console.error("Erreur de communication avec la base de données");
      } else {
        console.error(result.data);
        setUsers(result.data);
      }
    });
  }, [areUsersModified]);

  const handleDelete = (email) => {
    console.error(email);
    api.delete(`/users/${email}`).then((result) => {
      console.error(result);
      setAreUsersModified(true);
    });
  };

  const handleEdit = (email) => {
    console.error(email);
  };

  return (
    <div>
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
        {users.map((user) => {
          return (
            <tr>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>nbre de messages (tbi)</td>
              <td className="edit">
                <div
                  name={user.id_user}
                  role="button"
                  onClick={() => handleEdit(user.email)}
                  onKeyDown={null}
                  tabIndex="0"
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
                  onClick={() => handleDelete(user.email)}
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
      </table>
    </div>
  );
}

export default UsersList;
