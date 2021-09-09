import { Container as BaseContainer, ContainerProps } from '@material-ui/core';

const Container = ({ maxWidth = 'lg', ...props }: ContainerProps) => (
  <BaseContainer maxWidth={maxWidth} {...props}>
    {props.children}
  </BaseContainer>
);

export default Container;
