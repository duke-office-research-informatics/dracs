import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, text, boolean, object, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  theme,
  IconMenu,
  MrhHeaderIcon,
  IconProfile,
  IconSearch,
  IconDownloadFile,
  Button,
  Avatar,
} from '../../src/index.js';

const stories = storiesOf('Card', module);
stories.addDecorator(withKnobs);

const ChildrenOptions = {
  none: 'none',
  Avatar: 'Avatar',
  Button: 'Button',
  MenuIcon: 'Menu Icon',
  ProfileIcon: 'Profile Icon',
  SearchIcon: 'Search Icon',
  MRHHeaderIcon: 'MRH Header Icon',
  FileDownloadIcon: 'File Download Icon',
};
/* eslint-disable no-unreachable */
const ChildrenReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'Avatar':
    return <Avatar displayLetter="A" bgColor={theme.colors.muted} size={40} />;
    break;
  case 'Button':
    return (
      <Button
        label="Example Button"
        onClick={() => {
          alert('you clicked the example button');
        }}
      />
    );
    break;
  case 'MenuIcon':
    return <IconMenu size={40} color={theme.colors.muted} />;
    break;
  case 'ProfileIcon':
    return <IconProfile size={32} color={theme.colors.muted} />;
    break;
  case 'SearchIcon':
    return <IconSearch size={32} color={theme.colors.muted} />;
    break;
  case 'MRHHeaderIcon':
    return <MrhHeaderIcon size={40} color={theme.colors.muted} />;
  case 'FileDownloadIcon':
    return <IconDownloadFile size={32} color={theme.colors.muted} />;
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */
stories.add(
  'Card with Header, Body, Footer',
  withInfo(`
    The card header is a basic header component that accepts an icon (rendered on the left), a title (rendered next to the icon), and children (rendered to the right).
    The title is a string, and if \`htmlTitle\` is set to \`true\`, html can be passed directly to the tile as a string.  It also has built-in styling for being a
    draggable handle if \`draggableHandle\` is set to \`true\`.

    #### Example declaration:
    ~~~js
    import { Card, CardHeader } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Card>
        <CardHeader
          title='Example Title'
        >
      </Card>
    ~~~
  `)(() => {
    const headerIcon = select('header icon', ChildrenOptions, 'Avatar');
    const headerChild = select('header children', ChildrenOptions, 'none');
    const bodyChild = select('body children', ChildrenOptions, 'none');
    const footerAction1 = select('footer action 1', ChildrenOptions, 'Button');
    const footerAction2 = select('footer action 2', ChildrenOptions, 'none');
    return (
      <Card height="400px" width="400px" raised={true}>
        <CardHeader
          border={boolean('header border', true)}
          className={text('header className', '')}
          dragHandle={boolean('header dragHandle', false)}
          htmlTitle={boolean('header htmlTitle', false)}
          icon={ChildrenReturn(headerIcon)}
          style={object('header style', { maxWidth: '384px' })}
          title={text('header title', 'Example Card Header')}
        >
          {ChildrenReturn(headerChild)}
        </CardHeader>
        <CardBody
          className={text('body className', '')}
          id={text('body id', '')}
          padding={text('body padding', '')}
          style={object('body style', {})}
        >
          {ChildrenReturn(bodyChild)}
        </CardBody>
        <CardFooter
          bgColor={color('footer bg color', '#fff')}
          border={boolean('footer border', true)}
          multipleActions={boolean('footer multiple actions/children', false)}
          style={object('footer style', { maxWidth: '392px' })}
        >
          {ChildrenReturn(footerAction2)}
          {ChildrenReturn(footerAction1)}
        </CardFooter>
      </Card>
    );
  })
);
