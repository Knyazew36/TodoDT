import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface Initial {
  todoList: ITodo[];
  filterStatus: string;
}

export const fetchTodos = createAsyncThunk("/todos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = response.json();
  return data;
});

const initialState: Initial = {
  todoList: [],
  filterStatus: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo: ITodo, index: number) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      //FIXME:
      // if (todoList) {
      //   const todoListArr = JSON.parse(todoList);
      //   todoListArr.forEach((todo: ITodo) => {
      //     if (todo.id === action.payload.id) {
      //       todo.title = action.payload.title;
      //       todo.completed = action.payload.status;
      //     }
      //   });
      //   window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      //   state.todoList = todoListArr;
      // }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      // const todoListLocal = window.localStorage.getItem("todoList");
      // if (todoListLocal) {
      //   const todoListArr = JSON.parse(todoListLocal);
      // state.todoList.push(...todoListArr, ...payload);
      state.todoList.push(...payload);
      // }
      if (state.todoList.length > 30) {
        state.todoList = state.todoList.slice(0, 30);
      }
    });
  },
});

export const { updateTodo, addTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
