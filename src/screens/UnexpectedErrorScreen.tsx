import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const UnexpectedErrorScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.message}>
        <Title>Whoops, looks like we messed up :(</Title>
        <Paragraph>Try to restart the app.</Paragraph>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    flex: 1,
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnexpectedErrorScreen;
