import * as React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { radius, spacing } from '../design';

type AppListProps<T> = FlatListProps<T>;

const computeRounded = (index: number, length?: number) => {
  if (index === 0) {
    return 'top';
  }
  if (length && index === length - 1) {
    return 'bottom';
  }
  return undefined;
};

// A FlatList wrapper that provides common styles
export function AppList<T>({
  data,
  renderItem,
  ...props
}: AppListProps<T>): React.ReactElement<AppListProps<T>> {
  const theme = useTheme();
  const innerRenderItem: FlatListProps<T>['renderItem'] = React.useMemo(
    () =>
      renderItem
        ? ({ item, index, separators }) => {
            const rounded = computeRounded(index, data?.length);
            const ListItem = renderItem({ item, index, separators });

            if (ListItem !== null) {
              const style = ListItem.props.style;

              return (
                <View style={styles.itemContainer}>
                  {React.cloneElement(ListItem, {
                    style: [
                      style,
                      { backgroundColor: theme.colors.surface },
                      rounded === 'top' && styles.roundedTop,
                      rounded === 'bottom' && styles.roundedBottom,
                    ],
                  })}
                </View>
              );
            }

            return null;
          }
        : renderItem,
    [renderItem, data?.length, theme.colors.surface],
  );

  return <FlatList data={data} renderItem={innerRenderItem} {...props} />;
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: spacing.s3,
    overflow: 'hidden',
  },
  roundedBottom: {
    borderBottomStartRadius: radius.br30,
    borderBottomEndRadius: radius.br30,
  },
  roundedTop: {
    borderTopStartRadius: radius.br30,
    borderTopEndRadius: radius.br30,
  },
});
