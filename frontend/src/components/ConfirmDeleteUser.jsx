import React from "react";

function ConfirmDeleteUser({ userToDelete, handleDelete, handleCancelDelete }) {
  return (
    <div className="delete-msg">
      <div>Êtes vous sûr de vouloir supprimer cet utilisateur ?</div>
      <div>
        <button
          type="button"
          onClick={handleCancelDelete}
          className="cancel-delete-btn"
        >
          Annuler
        </button>

        <button
          data-value={userToDelete}
          type="button"
          onClick={handleDelete}
          className="confirm-delete-btn"
        >
          Oui
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteUser;
