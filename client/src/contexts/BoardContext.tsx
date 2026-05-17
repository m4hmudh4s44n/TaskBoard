import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { BoardState, BoardAction, boardReducer, Task } from '@/reducers/boardReducer';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BoardContextType {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>('taskboard_tasks', []);
  const [state, dispatch] = useReducer(boardReducer, { tasks: storedTasks });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider');
  }
  return context;
}
