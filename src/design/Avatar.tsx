import * as React from 'react';
import { Avatar as RNPAvatar } from 'react-native-paper';

type AvatarTextProps = Omit<
  React.ComponentProps<typeof RNPAvatar.Text>,
  'label'
>;

interface AvatarProps extends AvatarTextProps {
  fullName: string;
}

const initials = (fullName: string): string => {
  const [name, surname] = fullName.split(' ');
  return name[0].toUpperCase() + surname[0].toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ fullName, style, size, ...props }) => {
  return (
    <RNPAvatar.Text
      {...props}
      style={style}
      size={size}
      label={initials(fullName)}
    />
  );
};

export default Avatar;
