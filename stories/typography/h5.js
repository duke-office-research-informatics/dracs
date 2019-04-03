import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { H5, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);

stories.add('H5', withInfo(`
  #### Example declaration:
  ~~~js
  import { H5 } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <H5>Example Text</H5>
  ~~~
`)(() =>
/* eslint-disable react/no-unescaped-entities */
  <H5
    bold={boolean('Bold', false)}
    italic={boolean('Italic', false)}
    expanded={boolean('Expanded', false)}
    margin={number('Margin', 4)}
    color={color('Color', theme.colors.base)}
  >
    You can't make a mistake. Anything that happens you can learn to use - and make something
    beautiful out of it. Use absolutely no pressure. Just like an angel's wing. It is a lot of fun.
    Everyone wants to enjoy the good parts - but you have to build the framework first. Making all
    those little fluffies that live in the clouds. Anyone can paint. If what you're doing doesn't
    make you happy - you're doing the wrong thing. We're not trying to teach you a thing to copy.
    We're just here to teach you a technique, then let you loose into the world.
  </H5>
));
/* eslint-enable react/no-unescaped-entities */
