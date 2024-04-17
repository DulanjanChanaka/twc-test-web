const Modal = ({ contact, onDelete, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl">
        <p className="text-[#083F46] font-medium">
          Do you want to delete the contact {`"${contact.fullname}"`} ?
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => onDelete(contact._id)}
            className="mr-2 px-4 py-2 bg-[#083F46] text-white rounded-full"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-[#083F46] text-[#083F46] font-semibold rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
