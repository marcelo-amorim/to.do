import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const checkTask = tasks.find(task => task.title === newTaskTitle);

    if (checkTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );

      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, task])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }

      return task
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(
            oldState => oldState.filter(task => task.id !== id)
          )
        }
      ]
    )

  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    setTasks(oldState => oldState.map(task => {
      if (task.id === taskId) {
        task.title = newTaskTitle;
      }

      return task
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})