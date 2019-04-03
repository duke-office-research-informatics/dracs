import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { TextArea, IconWarning } from '../../src/index.js';

const stories = storiesOf('Inputs', module);
stories.addDecorator(withKnobs);

const FuncOptions = {
  none: 'no handler declared',
  withHandler: 'with handler declared',
};
/* eslint-disable no-unreachable */
const FuncReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'withHandler':
    return () => alert('handler declared');
    break;
  default:
    return null;
  }
};

const rightOptions = {
  none: 'No Icon',
  warning: 'Warning Icon',
};

const rightReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'warning':
    return IconWarning;
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */

stories.add(
  'Textarea',
  withInfo(`
    The TextArea component is used to get a large volume of text input from the user.  This component implements a modified version of the Material Design specifications for a textarea component.


    The component includes:
    - A controlled textarea
    - An optional floating label
    - Optional help/error text that displays below the textarea
    - An optional icon that can display to the left of the help/error text.


    The component's inputState prop controls whether it renders with the default/primary styling and html attributes, error styling and html attributes, or disabled styling and html attributes.

    #### Example declaration:
    ~~~js
    import { TextArea, } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    state = {
      exampleTextarea: '',
    }

    onChange = (value, name) => {
      this.setState({
        [name]: value
      })
    }
    <TextArea
      labelText='Example Textarea'
      name='exampleTextarea'
      onChange={this.onChange}
      placeholder='Enter text here'
      value={this.state.exampleTextarea}
      width='100%'
    />
    ~~~
  `)(() => {
    const inputState = select('inputState', ['primary', 'error', 'disabled'], 'primary');
    const helpIcon = select('helpIcon', rightOptions, 'warning');
    const onBlur = select('onBlur', FuncOptions, 'none');
    const onChange = select('onChange', FuncOptions, 'none');
    const onClick = select('onClick', FuncOptions, 'none');
    const onFocus = select('onFocus', FuncOptions, 'none');
    const onKeyUp = select('onKeyUp', FuncOptions, 'none');
    const onKeyDown = select('onKeyDown', FuncOptions, 'none');
    const onMouseDown = select('onMouseDown', FuncOptions, 'none');
    const onMouseEnter = select('onMouseEnter', FuncOptions, 'none');
    const onMouseLeave = select('onMouseLeave', FuncOptions, 'none');
    const onMouseUp = select('onMouseUp', FuncOptions, 'none');
    const onTouchStart = select('onTouchStart', FuncOptions, 'none');
    const onTouchEnd = select('onTouchEnd', FuncOptions, 'none');
    return (
      <TextArea
        autoFocus={boolean('autoFocus', false)}
        helpText={text('helpText', 'Helpful wording here')}
        helpIcon={rightReturn(helpIcon)}
        labelText={text('labelText', 'Example Textarea')}
        name={text('name', 'exampleTextarea')}
        onBlur={FuncReturn(onBlur)}
        onClick={FuncReturn(onClick)}
        onChange={FuncReturn(onChange)}
        onFocus={FuncReturn(onFocus)}
        onKeyDown={FuncReturn(onKeyDown)}
        onKeyUp={FuncReturn(onKeyUp)}
        onMouseDown={FuncReturn(onMouseDown)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        onMouseUp={FuncReturn(onMouseUp)}
        onTouchStart={FuncReturn(onTouchStart)}
        onTouchEnd={FuncReturn(onTouchEnd)}
        placeholder={text('placeholder', 'use the "value" input to input text here')}
        readOnly={boolean('readOnly', false)}
        required={boolean('required', false)}
        inputState={inputState}
        type={text('type', 'text')}
        value={text('value', '')}
        height={text('height', '200px')}
        width={text('width', '300px')}
      />
    );
  })
);
