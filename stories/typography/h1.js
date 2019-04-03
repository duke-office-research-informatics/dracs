import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { H1, theme } from '../../src/index.js';

const stories = storiesOf('Typography', module);

stories.addDecorator(withKnobs);

stories
  .add('H1', withInfo(`
    #### Example declaration:
    ~~~js
    import { H1 } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <H1>Example Text</H1>
    ~~~
  `)(() =>
  /* eslint-disable react/no-unescaped-entities */
    <H1
      bold={boolean('Bold', false)}
      italic={boolean('Italic', false)}
      margin={number('Margin', 4)}
      color={color('Color', theme.colors.base)}
    >
      That's why I paint - because I can create the kind of world I want - and I can make this world
      as happy as I want it. Paint anything you want on the canvas. Create your own world. Almost
      everything is going to happen for you automatically - you don't have to spend any time working
      or worrying. The only prerequisite is that it makes you happy. If it makes you happy then it's
      good. Isn't it great to do something you can't fail at? And I will hypnotize that just a
      little bit.
    </H1>
  ));
