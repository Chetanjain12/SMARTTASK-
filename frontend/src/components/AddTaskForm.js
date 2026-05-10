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
      <div className="field-block">
        <label htmlFor="task-title-input">Title</label>
        <input
          id="task-title-input"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="field-block">
        <label>Task Priority</label>
        <div className="priority-pills" role="radiogroup" aria-label="Task Priority">
          {[
            { key: "high", label: "High" },
            { key: "medium", label: "Medium" },
            { key: "low", label: "Low" },
          ].map((item) => (
            <button
              type="button"
              key={item.key}
              className={`priority-pill ${formData.priority === item.key ? "active" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, priority: item.key }))}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field-block">
        <label htmlFor="task-description">Details</label>
        <textarea
          id="task-description"
          name="description"
          placeholder="Enter task details"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="task-form-row">
        <div className="field-block">
          <label htmlFor="due-date">Due Date</label>
          <input id="due-date" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default AddTaskForm;
