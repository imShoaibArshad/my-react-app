
import React, { useState } from 'react';
import './CRUD.css';

function CRUD() {
  const initialList = [
    {
      title: "book1",
      author: "shoaib",
      no_of_pages: 100,
      published_at: new Date(),
    },
    {
      title: "book2",
      author: "shoaib",
      no_of_pages: 100,
      published_at: new Date(),
    },
  ];

  const [lists, setList] = useState(initialList);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    'no-of-pages': "",
    published_at: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function clearInputFields() {
    setFormData({
      title: "",
      author: "",
      'no-of-pages': "",
      published_at: "",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isEditing) {
      // Save the edited data
      const updatedList = [...lists];
      updatedList[editIndex] = { ...formData, published_at: new Date(formData.published_at) };
      setList(updatedList);
      setIsEditing(false);
      setEditIndex(-1);
    } else {
      // Add a new item
      const title = formData.title;
      const author = formData.author;
      const no_of_pages = formData['no-of-pages'];
      const published_at = formData.published_at;

      const newlist = {
        title,
        author,
        no_of_pages,
        published_at: new Date(published_at),
      };

      setList((prevList) => [...prevList, newlist]);
    }
    clearInputFields();
  }

  function handleEdit(index) {
    setFormData(lists[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    const updatedList = [...lists];
    updatedList.splice(index, 1);
    setList(updatedList);
  }

  return (
    <div className='crud'>
      <div>
        <form className='addForm' onSubmit={handleSubmit}>
          <input  type="text"  name="title"  placeholder="Enter Book Title"  value={formData.title}  onChange={handleChange} />
          <input  type="text" name="author"  placeholder="Enter Author" value={formData.author}  onChange={handleChange} />
          <input type="number"  name="no-of-pages"  placeholder="Enter Number of Pages" value={formData['no-of-pages']} onChange={handleChange}/>
          <input type="date" name="published_at" required  value={formData.published_at} onChange={handleChange}/>
          <button type="submit">{isEditing ? "Save" : "Add"}</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>No. of Pages</th>
              <th>Published At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((current, index) => (
              <tr key={index}>
                <td>{isEditing && editIndex === index ? <input type="text" name="title" value={formData.title} onChange={handleChange} /> : current.title}</td>
                <td>{isEditing && editIndex === index ? <input type="text" name="author" value={formData.author} onChange={handleChange} /> : current.author}</td>
                <td>{isEditing && editIndex === index ? <input type="number" name="no-of-pages" value={formData['no-of-pages']} onChange={handleChange} /> : current.no_of_pages}</td>
                <td>{isEditing && editIndex === index ? <input type="date" name="published_at" value={formData.published_at} onChange={handleChange} /> : current.published_at.toLocaleDateString()}</td>
                <td>
                  {isEditing && editIndex === index ? (
                    <button onClick={() => handleSubmit({ preventDefault: () => {} })}>Save</button>
                  ) : (
                    <>
                      <button className='edit' onClick={() => handleEdit(index)}>Edit</button>
                      <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CRUD;


