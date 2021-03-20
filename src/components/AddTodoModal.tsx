import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { radius, spacing, typography } from '../design';

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
        <Text style={styles.title}>Add new todo</Text>
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
          onSubmitEditing={() => {
            // FIXME: fix this
            // @ts-expect-error
            textInputRef.current?.blur();
            // TODO: show success and then close
          }}
          onChangeText={(text) => {
            setNewTodo(text);
          }}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setTimeout(() => setNewTodo(''), animationDuration);
              onModalHide();
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!newTodo.trim()}
            style={styles.button}
            onPress={() => {
              onSave(newTodo).then(onModalHide);
            }}>
            <Text>Save</Text>
          </TouchableOpacity>
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
    fontSize: typography.text50,
    fontWeight: 'bold',
    marginTop: spacing.s2,
  },
  button: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: spacing.s3,
    paddingVertical: spacing.s4,
  },
  buttons: {
    flexDirection: 'row',
  },
});

export default AddTodoModal;
