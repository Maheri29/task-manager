import React, { ChangeEvent, useRef } from 'react';
import { useTaskManager, State } from '../../store/useTaskManager';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const taskManager = useTaskManager();
  const {
    tasks,
    searchQuery,
    addTask,
    updateTask,
    deleteTask,
    setSearchQuery,
  } = taskManager;

  const handleAddTask = () => {
    if (createTaskRef.current && createTaskRef.current.value) {
      const title = createTaskRef.current.value;
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      addTask(newTask);
      createTaskRef.current.value = '';
    }
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask.title);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter((task: { title: string; }) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search Task"
      />

      <ul>
        {filteredTasks.map((task: Task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { ...task, title: e.target.value })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;