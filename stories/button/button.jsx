import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  color,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Button } from '../../src/index.js';

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

const refOptions = {
  none: 'no ref declared',
  withRef: 'with ref declared',
};

const refReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'withRef':
    return node => (this.button = node);
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */
stories.add(
  'Button',
  withInfo(`
    The main button component that should be used in most situations, this component has spacing, sizing, and coloring all pre-set to the Duke style-guide.

    Its' spacing can be set to be 'dense' using the \`dense\` prop, which makes the button padding/size smaller.

    The default button type is \`flat\` - which is a white bg with a blue label.

    \`raised\` adds a drop-shadow to the default \`flat\` button.

    \`raiseOnHover\` adds a drop-shadow to the default \`flat\` button on hover.

    \`filled\` makes the button dark blue with a white label.

    \`error\` makes the button have a white bg with a red label.

    \`errorFilled\` makes the button have a red bg with a white label.

    \`disabled\` makes the button unfocusable/clickable, adds a \`not-allowed\` cursor to the button, makes the label text gray, and the bg color white.

    \`disabledFilled\` is the same as \`disabled\` except the background is gray and the label text is white.

    \`inverted\` is the same as \`flat\` using the duke style guide, but can be different if the dracs \`theme\` is changed.

    #### Example declaration:
    ~~~js
    import { Button } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <Button
      label='hello'
      onClick={<your function here>}
    />
    ~~~
  `)(() => {
    const innerRef = select('innerRef', refOptions, 'none');
    const onBlur = select('onBlur', FuncOptions, 'none');
    const onClick = select('onClick', FuncOptions, 'withHandler');
    const onFocus = select('onFocus', FuncOptions, 'none');
    const onMouseDown = select('onMouseDown', FuncOptions, 'none');
    const onMouseEnter = select('onMouseEnter', FuncOptions, 'none');
    const onMouseLeave = select('onMouseLeave', FuncOptions, 'none');
    const onMouseUp = select('onMouseUp', FuncOptions, 'none');
    const onTouchStart = select('onTouchStart', FuncOptions, 'none');
    const onTouchEnd = select('onTouchEnd', FuncOptions, 'none');
    const typeOptions = [
      'flat',
      'raised',
      'raiseOnHover',
      'filled',
      'inverted',
      'error',
      'errorFilled',
      'disabled',
      'disabledFilled',
    ];

    return (
      <Button
        autoFocus={boolean('autoFocus', false)}
        bgColor={color('bgColor', '')}
        bgHoverColor={color('bgHoverColor', '')}
        className={text('className', '')}
        dense={boolean('dense', false)}
        id={text('id', '')}
        innerRef={refReturn(innerRef)}
        label={text('label', 'example button')}
        labelColor={color('labelColor', '')}
        labelHoverColor={color('labelHoverColor', '')}
        mediaQuery={text('mediaQuery', '')}
        name={text('name', 'example-button')}
        onBlur={FuncReturn(onBlur)}
        onClick={FuncReturn(onClick)}
        onFocus={FuncReturn(onFocus)}
        onMouseDown={FuncReturn(onMouseDown)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        onMouseUp={FuncReturn(onMouseUp)}
        onTouchStart={FuncReturn(onTouchStart)}
        onTouchEnd={FuncReturn(onTouchEnd)}
        style={object('style', {})}
        type={select('type', typeOptions, 'flat')}
      />
    );
  })
);
