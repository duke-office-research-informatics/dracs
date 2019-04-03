import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, boolean, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Switch } from '../../src/index.js';

const stories = storiesOf('Buttons', module);

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
  'Toggle Switch',
  withInfo(`
    The toggle switch is used in cases where an on/off control is required.

    The switch and switchTrack colors are defined by the color theme, and can be changed by changing the color theme.

    #### Example declaration:
    ~~~js
    import { Switch } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Switch
        checked={checkedProp}
      />
    ~~~
  `)(() => {
    const onBlur = select('onBlur', FuncOptions, 'none');
    const onChange = select('onChange', FuncOptions, 'none');
    const onFocus = select('onFocus', FuncOptions, 'none');

    return (
      <Switch
        checked={boolean('checked', true)}
        disabled={boolean('disabled', false)}
        delay={number('delay', 280)}
        label={text('label', '')}
        name={text('name', 'exampleSwitch')}
        onBlur={FuncReturn(onBlur)}
        onChange={FuncReturn(onChange)}
        onFocus={FuncReturn(onFocus)}
      />
    );
  })
);
