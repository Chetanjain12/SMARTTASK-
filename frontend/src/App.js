import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Completed from "./pages/Completed";
import Dashboard from "./pages/Dashboard";
import DueTasks from "./pages/DueTasks";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Signup from "./pages/Signup";
import {
  createTask,
  fetchTasks,
  permanentDeleteTask,
  restoreTask,
  softDeleteTask,
  updateTask,
} from "./services/taskService";
import "./styles/app.css";

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("smarttask_token");
    const user = localStorage.getItem("smarttask_user");
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isAuthenticated = Boolean(auth.token);

  const handleLogout = () => {
    localStorage.removeItem("smarttask_token");
    localStorage.removeItem("smarttask_user");
    setAuth({ token: null, user: null });
    setTasks([]);
  };

  const loadTasks = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [isAuthenticated]);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("smarttask_token", data.token);
    localStorage.setItem("smarttask_user", JSON.stringify(data.user));
    setAuth({ token: data.token, user: data.user });
  };

  const handleCreateTask = async (payload) => {
    try {
      await createTask(payload);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (id, payload) => {
    try {
      await updateTask(id, payload);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await softDeleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleRestoreTask = async (id) => {
    try {
      await restoreTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restore task");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await permanentDeleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to permanently delete task",
      );
    }
  };

  const searchedTasks = useMemo(() => {
    if (!searchTerm.trim()) return tasks;
    const query = searchTerm.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query),
    );
  }, [tasks, searchTerm]);

  return (
    <>
      {error ? <div className="global-error">{error}</div> : null}
      {loading && isAuthenticated ? (
        <div className="global-loading">Loading...</div>
      ) : null}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout
                user={auth.user}
                tasks={searchedTasks}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <Dashboard
                  tasks={searchedTasks}
                  onCreateTask={handleCreateTask}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout
                user={auth.user}
                tasks={searchedTasks}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <Tasks
                  tasks={searchedTasks}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/due"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout
                user={auth.user}
                tasks={searchedTasks}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <DueTasks
                  tasks={searchedTasks}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout
                user={auth.user}
                tasks={searchedTasks}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <Completed
                  tasks={searchedTasks}
                  onUpdateTask={handleUpdateTask}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trash"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout
                user={auth.user}
                tasks={searchedTasks}
                onLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <Trash
                  tasks={searchedTasks}
                  onRestoreTask={handleRestoreTask}
                  onPermanentDelete={handlePermanentDelete}
                />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
