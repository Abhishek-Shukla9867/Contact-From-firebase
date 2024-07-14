import React, { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedId, setSelectedId] = useState(null); // To track the selected document ID for update
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "Data");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        // If selectedId exists, update the document
        const docRef = doc(collectionRef, selectedId);
        await updateDoc(docRef, { name, email });
        console.log("Document updated successfully");
      } else {
        // Otherwise, add a new document
        await addDoc(collectionRef, { name, email });
        console.log("Document added successfully");
      }
      setName("");
      setEmail("");
      setSelectedId(null); // Reset selectedId after submission
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(collectionRef, id));
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { name, email } = docSnap.data();
        setName(name);
        setEmail(email);
        setSelectedId(id); // Set selectedId to enable update mode
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  const fetchData = () => {
    try {
      onSnapshot(collectionRef, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 sm:p-6">
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
          Contact Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              id="name"
              onChange={handleNameChange}
              placeholder="Enter name here"
              className="w-full px-3 sm:px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={handleEmailChange}
              placeholder="Enter email here"
              className="w-full px-3 sm:px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {selectedId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
          Submitted Data
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {data.map((doc) => (
            <div key={doc.id} className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">{doc.name}</h3>
                <p className="text-gray-400">{doc.email}</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdate(doc.id)}
                  className="bg-blue-600 px-2 py-1 rounded-lg text-white ml-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="bg-red-600 px-2 py-1 rounded-lg text-white ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
