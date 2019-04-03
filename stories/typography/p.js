import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { P, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);
/* eslint-disable react/no-unescaped-entities */
stories.add('P', withInfo(`
  #### Example declaration:
  ~~~js
  import { P } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <P>Example Text</P>
  ~~~
`)(() =>
/* eslint-disable react/no-unescaped-entities */
  <P
    bold={boolean('Bold', false)}
    italic={boolean('Italic', false)}
    expanded={boolean('Expanded', false)}
    margin={number('Margin', 4)}
    color={color('Color', theme.colors.base)}
  >

    Isn't that fantastic that you can create an almighty tree that fast? Let your imagination be
    your guide. Have fun with it. Everybody's different. Trees are different. Let them all be
    individuals. Imagination is the key to painting. How to paint. That's easy. What to paint.
    That's much harder. We don't have to be concerned about it. We just have to let it fall where it
    will. Nice little clouds playing around in the sky. Use what you see, don't plan it. You're
    meant to have fun in life.
  </P>
));
/* eslint-enable react/no-unescaped-entities */
