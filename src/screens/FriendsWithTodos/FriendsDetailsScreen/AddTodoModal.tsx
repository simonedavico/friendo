import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import {
  Button,
  Card,
  Divider,
  Provider as PaperProvider,
  TextInput,
  Title,
} from 'react-native-paper';
import { spacing } from '../../../design/variables';
import { useAppTheme } from '../../../theme';

interface AddTodoModalProps {
  isVisible: boolean;
  onModalHide: () => void;
  onSave: (todo: string) => Promise<unknown>;
}

const animationDuration = 300;

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isVisible,
  onModalHide,
  onSave,
}) => {
  const theme = useAppTheme();
  const [newTodo, setNewTodo] = React.useState('');
  const isValid = () => !!newTodo.trim();

  return (
    // the modal is rendered in a separate react root
    // TODO: extract design system modal
    <PaperProvider theme={theme}>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={isVisible}
        avoidKeyboard
        hasBackdrop
        onModalHide={onModalHide}
        useNativeDriver
        useNativeDriverForBackdrop
        animationInTiming={animationDuration}
        animationOutTiming={animationDuration}
        backdropTransitionOutTiming={animationDuration}
        backdropTransitionInTiming={animationDuration}
        backdropColor={theme.colors.backdrop}>
        <Card elevation={0}>
          <Card.Content>
            <Title style={styles.title}>Add new todo</Title>
            <TextInput
              mode="outlined"
              autoFocus
              maxLength={200}
              placeholder="New Todo..."
              onChangeText={(text) => setNewTodo(text)}
              blurOnSubmit
              style={styles.textInput}
              returnKeyType="done"
            />
            <Divider />
          </Card.Content>
          <Card.Actions>
            <Button
              style={styles.button}
              onPress={() => {
                setTimeout(() => setNewTodo(''), animationDuration);
                onModalHide();
              }}>
              <Text>Cancel</Text>
            </Button>
            <Button
              disabled={!isValid()}
              style={styles.button}
              onPress={() => {
                onSave(newTodo);
                onModalHide();
              }}>
              <Text>Save</Text>
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  textInput: {
    marginBottom: spacing.s6,
    marginTop: spacing.s4,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default AddTodoModal;
