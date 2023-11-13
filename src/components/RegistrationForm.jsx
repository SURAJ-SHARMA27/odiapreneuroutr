import React, { useState } from 'react';

const RegistrationForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      leaderName: '',
      leaderEmail: '',
      topic: '',
      state: '',
      district: '',
      schoolName: '',
      schoolCode: '',
      coordinatorTeacherName: '',
      member1Name: '',
      member1Email: '',
      member2Name: '',
      member2Email: '',
      password: '',
      confirmPassword: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted with data:', formData);
      onClose();
    };
  
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded shadow-md h-80 w-96 max-w-screen-md max-h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="leaderName" className="block text-sm font-medium text-gray-600">
                  Name of Leader:
                </label>
                <input
                  type="text"
                  id="leaderName"
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="leaderEmail" className="block text-sm font-medium text-gray-600">
                  Email ID of Leader:
                </label>
                <input
                  type="email"
                  id="leaderEmail"
                  name="leaderEmail"
                  value={formData.leaderEmail}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-600">
                  Topic:
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                  State:
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                  District:
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-600">
                  School Name:
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-600">
                  School Code:
                </label>
                <input
                  type="text"
                  id="schoolCode"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="coordinatorTeacherName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name of Coordinator Teacher:
                </label>
                <input
                  type="text"
                  id="coordinatorTeacherName"
                  name="coordinatorTeacherName"
                  value={formData.coordinatorTeacherName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="member1Name" className="block text-sm font-medium text-gray-600">
                  Name of Member 1:
                </label>
                <input
                  type="text"
                  id="member1Name"
                  name="member1Name"
                  value={formData.member1Name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="member1Email" className="block text-sm font-medium text-gray-600">
                  Email of Member 1:
                </label>
                <input
                  type="email"
                  id="member1Email"
                  name="member1Email"
                  value={formData.member1Email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="member2Name" className="block text-sm font-medium text-gray-600">
                  Name of Member 2:
                </label>
                <input
                  type="text"
                  id="member2Name"
                  name="member2Name"
                  value={formData.member2Name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="member2Email" className="block text-sm font-medium text-gray-600">
                  Email of Member 2:
                </label>
                <input
                  type="email"
                  id="member2Email"
                  name="member2Email"
                  value={formData.member2Email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegistrationForm;
  