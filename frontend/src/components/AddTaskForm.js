import React, { useEffect, useState } from "react";
import "../styles/form.css";

const defaultState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
};

function AddTaskForm({ onSubmit }) {
  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    const handleQuickAction = () => {
      const input = document.getElementById("task-title-input");
      if (input) input.focus();
    };

    window.addEventListener("smarttask:newtask", handleQuickAction);
    return () => window.removeEventListener("smarttask:newtask", handleQuickAction);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onSubmit({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate || null,
      priority: formData.priority,
    });

    setFormData(defaultState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        id="task-title-input"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Enter details"
        rows="4"
        value={formData.description}
        onChange={handleChange}
      />
      <div className="task-form-row">
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default AddTaskForm;