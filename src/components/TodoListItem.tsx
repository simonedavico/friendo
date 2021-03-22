import { useActionSheet } from '@expo/react-native-action-sheet';
import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { spacing } from '../design';
import { Todo } from '../features/todos/types';

interface TodoListItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  style?: ViewProps;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onDelete,
  onComplete,
  style: listItemStyle,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <List.Item
      style={listItemStyle}
      title={todo.title}
      titleNumberOfLines={2}
      left={({ style }) => (
        <Avatar.Icon
          size={spacing.s8}
          style={[style, styles.todoAvatar]}
          icon="card-bulleted-outline"
        />
      )}
      onPress={() => {
        showActionSheetWithOptions(
          {
            options: [`Mark as done (${todo.id})`, 'Delete', 'Cancel'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 2,
          },
          (buttonIndex) => {
            if (buttonIndex === 0) {
              onComplete(todo);
            }
            if (buttonIndex === 1) {
              onDelete(todo);
            }
          },
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  todoAvatar: { alignSelf: 'center', marginLeft: spacing.s2 },
});

export default TodoListItem;
