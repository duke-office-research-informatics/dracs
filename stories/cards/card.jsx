import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  number,
  color,
  text,
  boolean,
  object,
  select,
} from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Card } from '../../src/index.js';

const stories = storiesOf('Card', module);

stories.addDecorator(withKnobs);

const FuncOptions = {
  none: 'no click handler declared',
  withHandler: 'with click handler declared',
};
/* eslint-disable no-unreachable */
const FuncReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'withHandler':
    return () => alert('click handler declared');
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */
stories.add(
  'Card',
  withInfo(`
    The card is a base UI component that contains unique related data and is meant to serve as an entry point to more detailed information.
    Cards can contain photos, text, links, etc.

    #### Example declaration:
    ~~~js
    import { Card } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Card>
        <child>
      </Card>
    ~~~
  `)(() => {
    const onClick = select('onClick', FuncOptions, 'none');
    return (
      <Card
        bgColor={color('bgColor', '#fff')}
        border={boolean('border', true)}
        borderRadius={JSON.stringify(number('borderRadius', 4))}
        className={text('className', '')}
        raised={boolean('raised', true)}
        height={text('height', '400px')}
        width={text('width', '400px')}
        id={text('id', '')}
        minHeight={text('minHeight', '')}
        minWidth={text('minWidth', '')}
        margin={text('margin', '')}
        mediaQuery={text('mediaQuery', '')}
        onClick={FuncReturn(onClick)}
        padding={text('padding', '')}
        style={object('style', {})}
      />
    );
  })
);
