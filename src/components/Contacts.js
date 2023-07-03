import React, { useState, useEffect } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleInputChange = (event) => {
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (
      newContact.name.trim() !== "" &&
      newContact.username.trim() !== "" &&
      newContact.phone.trim() !== ""
    ) {
      const updatedContacts = [
        ...contacts,
        {
          id: contacts.length + 1,
          name: newContact.name,
          username: newContact.username,
          phone: newContact.phone,
        },
      ];
      setContacts(updatedContacts);
      setShowForm(false);
      setNewContact({
        name: "",
        username: "",
        phone: "",
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewContact({
      name: "",
      username: "",
      phone: "",
    });
  };

  return (
    <div>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>Add Contact</button>
      ) : (
        <div>
          <h2>Add Contact</h2>
          <form onSubmit={handleSaveContact}>
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={newContact.username}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleInputChange}
            />
            <br />
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contacts;
