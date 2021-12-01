const DeleteLinkedUserModal = ({ id, handleDeleteLink }) => {
  return (
    <div
      className="modal"
      id={`deleteLinkedUserModal${id}`}
      tabIndex="-1"
      aria-labelledby={`deletLinkedUserModal${id}label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={id}></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to remove this linked user?</p>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={(e) => handleDeleteLink(e, id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLinkedUserModal;
