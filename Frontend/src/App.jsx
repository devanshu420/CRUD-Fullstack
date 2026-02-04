import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 GET all content
  useEffect(() => {
    axios
      .get("http://localhost:3000/getContent")
      .then((res) => {
        setContents(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔹 ADD content
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/content-create", {
        title,
        description,
      })
      .then((res) => {
        setContents((prev) => [...prev, res.data.content]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  // 🔹 EDIT button click
  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
  };

  // 🔹 UPDATE content
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/content-update/${editId}`, {
        title,
        description,
      })
      .then((res) => {
        const updatedContent = res.data.content;

        setContents(
          contents.map((item) =>
            item._id === editId ? updatedContent : item
          )
        );

        setTitle("");
        setDescription("");
        setEditId(null);
      })
      .catch((err) => console.log(err));
  };

  // 🔹 DELETE content
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/content-delete/${id}`)
      .then(() => {
        setContents(contents.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-6">
      
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Content CRUD
      </h1>

      {/* ADD / UPDATE FORM */}
      <form
        onSubmit={editId ? handleUpdate : handleSubmit}
        className="max-w-5xl mx-auto mb-10 bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editId ? "Update Content" : "Add New Content"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex justify-end mt-4 gap-3">
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setTitle("");
                setDescription("");
              }}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg
                       hover:bg-blue-600 transition active:scale-95"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* CONTENT LIST */}
      <div className="grid gap-6 max-w-5xl mx-auto sm:grid-cols-1 md:grid-cols-2">
        {contents.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow-md
                       hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 truncate">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {item.description}
            </p>

            <div className="flex justify-end gap-3 border-t pt-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;
