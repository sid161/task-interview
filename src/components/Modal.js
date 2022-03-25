const Modal = (props) => {
  let user = props.user;
  return (
    <>
      <div className="modal">
        <h2>{`Are you sure you want to delete ${user.firstName} ${user.lastName}`}</h2>
        <button type="cancel">Cancel</button>
        <button>Delete</button>
      </div>
    </>
  );
};

export default Modal;
