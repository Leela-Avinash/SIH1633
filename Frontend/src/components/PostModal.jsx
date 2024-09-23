import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, addTag, removeTag } from '../redux/slices/postSlice';

const PostModal = ({ onClose }) => {
  const post = useSelector((state) => state.post.cpost);
  const dispatch = useDispatch();

  const [newTag, setNewTag] = useState('');

  const handleContentChange = (e) => {
    dispatch(updatePost({ name: 'content', value: e.target.value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0]; // Get the first file only
    dispatch(updatePost({ name: 'media', value: file })); // Update with single file
  };

  const handleTagsChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      dispatch(addTag(newTag.trim()));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    dispatch(removeTag(tagToRemove));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    const currentPost = post;
    formData.append('content', post.content);
    formData.append('media', post.media);
    
    post.tags.forEach(tag => formData.append('tags[]', tag));
    
    const response = await fetch('http://localhost:5000/api/users/post', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });
    const json = await response.json();
    console.log("Post submitted:", json);
    // dispatch(resetPost()); // Reset the post state after submission

    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            id='content'
            name='content'
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            rows="4"
            placeholder="What's on your mind?"
            value={post.content}
            onChange={handleContentChange}
          ></textarea>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Add Media</label>
            <input
              type="file"
              onChange={handleMediaChange} // No multiple attribute
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Add Tags</label>
            <div className="flex items-center">
              <input
                id='tags'
                name='tags'
                type="text"
                value={newTag}
                onChange={handleTagsChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter a tag and press Add"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
