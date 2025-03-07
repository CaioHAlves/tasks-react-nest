import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface InitialState {
  items: ITask[];
}

const initialState: InitialState = {
  items: []
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<ITask[]>) {
      state.items = action.payload;
    },
    addTask(state, action: PayloadAction<ITask>) {
      state.items.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Omit<ITask, 'userId'>>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }

      return state
    }
  }
});

export const {
  setTask,
  addTask,
  removeTask,
  updateTask
} = taskSlice.actions;

export default taskSlice.reducer;
