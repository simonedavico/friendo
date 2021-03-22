import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { radius, spacing } from '../design/variables';
import Button from './Button';
import ListTitle from '../design/ListTitle';

interface AddTodoModalProps {
  isVisible: boolean;
  onModalHide: () => void;
  onSave: (todo: string) => Promise<unknown>;
}

const animationDuration = 800;

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isVisible,
  onModalHide,
  onSave,
}) => {
  const textInputRef = React.useRef<TextInput>(null);
  const [newTodo, setNewTodo] = React.useState('');

  const isValid = () => !!newTodo.trim();

  return (
    <Modal
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      isVisible={isVisible}
      avoidKeyboard
      hasBackdrop
      onModalHide={onModalHide}
      useNativeDriver
      useNativeDriverForBackdrop
      animationInTiming={animationDuration}
      animationOutTiming={animationDuration}
      backdropTransitionOutTiming={animationDuration}
      backdropTransitionInTiming={animationDuration}>
      <View style={styles.modal}>
        <ListTitle style={styles.title}>Add new todo</ListTitle>
        <TextInput
          ref={textInputRef}
          value={newTodo}
          style={styles.textInput}
          autoFocus
          multiline
          numberOfLines={3}
          maxLength={200}
          returnKeyType="done"
          placeholder="New todo..."
          placeholderTextColor="black"
          onChangeText={(text) => setNewTodo(text)}
          // FIXME: there is some bug that prevents TouchableOpacity
          // from being clickable after blur occurs, find out why
          blurOnSubmit
        />
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            onPress={() => {
              setTimeout(() => setNewTodo(''), animationDuration);
              onModalHide();
            }}>
            <Text>Cancel</Text>
          </Button>
          {/* TODO: this should be a proper Spacer component */}
          <View style={{ width: spacing.s2 }} />
          <Button
            disabled={!isValid()}
            style={styles.button}
            onPress={() => {
              onSave(newTodo);
              onModalHide();
            }}>
            <Text>Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    borderRadius: radius.br30,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s3,
  },
  textInput: {
    backgroundColor: '#dddddd',
    borderRadius: radius.br20,
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s2,
    marginTop: spacing.s8,
    marginBottom: spacing.s6,
    minHeight: 60,
  },
  title: {
    marginTop: spacing.s2,
  },
  button: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
});

export default AddTodoModal;
