import { FiCheckCircle, FiClock, FiHome, FiList, FiTrash2 } from "react-icons/fi";

export const navigationItems = [
  { label: "Dashboard", path: "/", Icon: FiHome },
  { label: "My Tasks", path: "/tasks", Icon: FiList },
  { label: "Due Tasks", path: "/due", Icon: FiClock },
  { label: "Completed", path: "/completed", Icon: FiCheckCircle },
  { label: "Trash", path: "/trash", Icon: FiTrash2 },
];
