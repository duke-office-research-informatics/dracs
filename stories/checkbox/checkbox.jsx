import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Checkbox } from '../../src/index.js';

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
  'Checkbox',
  withInfo(`
    The checkbox is a component that uses an svg to mask the browser's default checkbox styling, allowing the application to have a consistently styled checkbox across all browsers.
    Checkboxes should be used when the user needs to make a single binary choice.
    #### Example declaration:
    ~~~js
    import { Checkbox } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <Checkbox
      label='Example Checkbox'
    />
    ~~~
  `)(() => {
    const onBlur = select('onBlur', FuncOptions, 'none');
    const onChange = select('onChange', FuncOptions, 'withHandler');
    const onFocus = select('onFocus', FuncOptions, 'none');
    const onMouseEnter = select('onMouseEnter', FuncOptions, 'none');
    const onMouseLeave = select('onMouseLeave', FuncOptions, 'none');
    return (
      <Checkbox
        changeOnLabelClick={boolean('changeOnLabelClick', false)}
        checked={boolean('checked', true)}
        disabled={boolean('disabled', false)}
        label={text('label', 'Example Checkbox')}
        labelStyle={object('labelStyle', { marginTop: '6px' })}
        name={text('name', 'example-checkbox')}
        onBlur={FuncReturn(onBlur)}
        onChange={FuncReturn(onChange)}
        onFocus={FuncReturn(onFocus)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        style={object('style', {})}
        underlineLabelOnHover={boolean('underlineLabelOnHover', false)}
      />
    );
  })
);
