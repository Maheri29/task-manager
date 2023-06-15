import { createStore } from 'zustand';

type Task = {
  id: number;
  title: string;
};

type State = {
  tasks: Task[];
  searchQuery: string;
};

const useTaskManager = createStore<State>((set, get) => ({
  tasks: [],
  searchQuery: '',

  addTask: (title: any) => {
    set((prevState) => ({
      tasks: [...prevState.tasks, { id: Date.now(), title }],
    }));
  },

  updateTask: (taskId: number, newTitle: any) => {
    set((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    }));
  },

  deleteTask: (taskId: number) => {
    set((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  },

  setSearchQuery: (query: any) => {
    set(() => ({ searchQuery: query }));
  },

  getFilteredTasks: () => {
    return get().tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(get().searchQuery.toLowerCase())
    );
  },
}));

export { useTaskManager };