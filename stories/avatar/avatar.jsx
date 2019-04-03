import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, color, text } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Avatar, theme } from '../../src/index.js';

const stories = storiesOf('Avatar', module);

stories.addDecorator(withKnobs);

stories.add(
  'Avatar',
  withInfo(`
  #### Example declaration:
  ~~~js
  import { Avatar } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <Avatar displayLetter={<letter>} imgUrl={<url>}/>
  ~~~
`)(() => {
    return (
      <Avatar
        size={number('size', 120)}
        imgUrl={text('imgUrl', 'https://i.imgflip.com/pagy8.jpg')}
        displayLetter={text('displayLetter', 'a')}
        bgColor={color('bgColor', theme.colors.muted)}
        iconColor={color('iconColor', '#fff')}
      />
    );
  })
);
