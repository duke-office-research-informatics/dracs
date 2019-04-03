import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { H2, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);

stories.add('H2', withInfo(`
  #### Example declaration:
  ~~~js
  import { H2 } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <H2>Example Text</H2>
  ~~~
`)(() =>
/* eslint-disable react/no-unescaped-entities */
  <H2
    bold={boolean('Bold', false)}
    italic={boolean('Italic', false)}
    margin={number('Margin', 4)}
    color={color('Color', theme.colors.base)}
  >
    Maybe there's a little something happening right here. Exercising the imagination, experimenting
    with talents, being creative; these things, to me, are truly the windows to your soul. Even
    trees need a friend. We all need friends. Isn't it fantastic that you can change your mind and
    create all these happy things? Everyone is going to see things differently - and that's the way
    it should be.
  </H2>
));
