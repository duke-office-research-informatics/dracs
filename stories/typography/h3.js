import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { H3, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);

stories.add('H3', withInfo(`
  #### Example declaration:
  ~~~js
  import { H3 } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <H3>Example Text</H3>
  ~~~
`)(() =>
/* eslint-disable react/no-unescaped-entities */
  <H3
    bold={boolean('Bold', false)}
    italic={boolean('Italic', false)}
    margin={number('Margin', 4)}
    color={color('Color', theme.colors.base)}
  >
    There isn't a rule. You just practice and find out which way works best for you. You don't have
    to be crazy to do this but it does help. We'll paint one happy little tree right here. We'll do
    another happy little painting. Don't kill all your dark areas - you need them to show the light.
  </H3>
));
