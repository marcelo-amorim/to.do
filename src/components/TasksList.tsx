import React from 'react';
import { FlatList, Text, StyleSheet, FlatListProps } from 'react-native';


import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void
}

function EmptyList() {
  return (
    <Text style={styles.emptyListText}>Nenhuma task até agora...</Text>
  );
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyList}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              task={item}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  emptyListText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  }
})