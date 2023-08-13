import TodoItem from "./TodoItem";
import style from "../styles/modules/app.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { fetchTodos } from "../slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { v4 as uuid } from "uuid";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch: any = useDispatch();

  useEffect(() => {
    //FIXME:
    dispatch(fetchTodos());
  }, []);

  const filterStatus = useSelector(
    (state: RootState) => state.todo.filterStatus
  );

  const filteredTodoList = todoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    } else if (filterStatus === "incomplete") {
      return !item.completed;
    } else {
      return item.completed;
    }
  });

  return (
    <motion.div
      className={style.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => <TodoItem todo={todo} key={uuid()} />)
        ) : (
          <motion.p className={style.emptyText} variants={child}>
            No Todos Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default AppContent;
