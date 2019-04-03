import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { H4, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);

stories.add('H4', withInfo(`
  #### Example declaration:
  ~~~js
  import { H4 } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <H4>Example Text</H4>
  ~~~
`)(() =>
/* eslint-disable react/no-unescaped-entities */
  <H4
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
  </H4>
));
/* eslint-enable react/no-unescaped-entities */
