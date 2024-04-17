import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { RiLogoutCircleLine } from "react-icons/ri";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/background.jpeg";
import { logout } from "../libs/auth/logout";
import { useAuth } from "../context/auth-context";
import { GrPowerCycle } from "react-icons/gr";
import Modal from "../modals/deleteModal";
import SuccessModal from "../modals/deleteSuccess";
import EditSaveModal from "../modals/updateSuccessModal";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // Store the ID of the contact being edited
  const [deletingContact, setDeletingContact] = useState(null); // Store the ID of the contact being deleted
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditSaveModal, setShowEditSaveModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/contact");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleUpdateClick = (contactId) => {
    setEditingContact(contactId);
  };

  const handleSaveClick = async (contactId) => {
    const contactToEdit = contacts.find((contact) => contact._id === contactId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/contact/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToEdit),
        }
      );
      if (response.ok) {
        fetchContacts();
        setEditingContact(null);
        setShowEditSaveModal(true);
      } else {
        console.error("Error updating contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleInputChange = (e, field, contactId) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact._id === contactId) {
        return { ...contact, [field]: e.target.value };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  const handleDeleteClick = async (contactId) => {
    setDeletingContact(contactId);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async (contactId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/contact/${contactId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
        setShowSuccessModal(true);
      } else {
        console.error("Error deleting contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
    setShowModal(false);
  };

  const handleDeleteCancelled = () => {
    setShowModal(false);
  };

  const handleDeleteSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleEditSaveModalClose = () => {
    setShowEditSaveModal(false);
  };

  const handleGenderToggle = (contactId) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact._id === contactId) {
        return {
          ...contact,
          gender: contact.gender === "male" ? "female" : "male",
        };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.3,
        }}
      ></div>
      <div className="w-full h-[120vh] -my-[50px] rounded-tr-[500px] rounded-bl-[500px] bg-[#083F46] relative z-10 pt-14">
        <div className="w-full grid grid-cols-[20%_80%]">
          <div></div>
          <div className="flex flex-col mt-20">
            <div>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="text-white pt-20 w-fit">
              <div className="flex flex-row justify-between items-center ">
                <div>
                  <h3 className="font-extrabold text-[50px]">Contact</h3>
                </div>
                <div>
                  <Link to="new">
                    <button className="py-2 px-10 border border-white bg-transparent rounded-full ">
                      add new contact
                    </button>
                  </Link>
                </div>
              </div>
              <div className=" flex p-5 bg-white w-fit rounded-2xl mt-5">
                <table className="justify-start  bg-white text-[#083F46] text-start rounded-2xl  ">
                  <thead>
                    <tr className="text-start ">
                      <th className="px-3 pb-2"></th>
                      <th className="px-3 text-start pb-2">full name</th>
                      <th className="px-3 pb-2">gender</th>
                      <th className="px-3 text-start pb-2">e-mail</th>
                      <th className="px-3 pb-2">phone number</th>
                      <th className=" px-5 pb-2"></th>
                    </tr>
                  </thead>
                  <tbody className="font-normal">
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td className="px-3">
                          <img
                            src={contact.gender === "male" ? male : female}
                            alt={contact.gender}
                            width={50}
                          />
                        </td>
                        <td className="px-3 ">
                          {editingContact === contact._id ? (
                            <input
                              className=" border-r-black border bg-[#E6ECEC] "
                              type="text"
                              value={contact.fullname}
                              onChange={(e) =>
                                handleInputChange(e, "fullname", contact._id)
                              }
                            />
                          ) : (
                            contact.fullname
                          )}
                        </td>
                        <td className="px-3">
                          {editingContact === contact._id ? (
                            <div className=" border-r-black border bg-[#E6ECEC] pr-2">
                              <input
                                className="  bg-[#E6ECEC] "
                                type="text"
                                value={contact.gender}
                                onChange={(e) =>
                                  handleInputChange(e, "gender", contact._id)
                                }
                              />
                              <button
                                onClick={() => handleGenderToggle(contact._id)}
                              >
                                <GrPowerCycle />
                              </button>
                            </div>
                          ) : (
                            <div>{contact.gender}</div>
                          )}
                        </td>
                        <td className="px-3 ">
                          {editingContact === contact._id ? (
                            <input
                              className=" border-r-black border bg-[#E6ECEC] "
                              type="text"
                              value={contact.email}
                              onChange={(e) =>
                                handleInputChange(e, "email", contact._id)
                              }
                            />
                          ) : (
                            contact.email
                          )}
                        </td>
                        <td className="px-3">
                          {editingContact === contact._id ? (
                            <input
                              className=" border-r-black border  bg-[#E6ECEC]"
                              type="text"
                              value={contact.pnomber}
                              onChange={(e) =>
                                handleInputChange(e, "pnomber", contact._id)
                              }
                            />
                          ) : (
                            contact.pnomber
                          )}
                        </td>
                        <td className="px-3">
                          {editingContact === contact._id ? (
                            <button
                              onClick={() => handleSaveClick(contact._id)}
                              className="bg-[#083F46] rounded-full text-white px-2 "
                            >
                              save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateClick(contact._id)}
                            >
                              <MdEdit />
                            </button>
                          )}
                        </td>
                        <td className="px-3">
                          <button
                            onClick={() => handleDeleteClick(contact._id)}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showModal && deletingContact && (
                <Modal
                  contact={contacts.find(
                    (contact) => contact._id === deletingContact
                  )}
                  onDelete={handleDeleteConfirmed}
                  onCancel={handleDeleteCancelled}
                />
              )}
              {showSuccessModal && (
                <SuccessModal onClose={handleDeleteSuccessModalClose} />
              )}
              {showEditSaveModal && (
                <EditSaveModal onClose={handleEditSaveModalClose} />
              )}
              <div
                className="absolute 2xl:bottom-36 bottom-32 right-0 mr-20 mb-14 flex gap-2 cursor-pointer"
                onClick={() => logout(navigate, setAuth)}
              >
                <RiLogoutCircleLine size={30} />
                <p>logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
