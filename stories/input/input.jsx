import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Input, IconWarning, IconSearch, IconEmail, IconCloseCircle } from '../../src/index.js';

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

const leftOptions = {
  none: 'No Icon',
  search: 'Search Icon',
  email: 'Email Icon',
};

const leftReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'search':
    return IconSearch;
    break;
  case 'email':
    return IconEmail;
    break;
  default:
    return null;
  }
};

const rightOptions = {
  none: 'No Icon',
  close: 'Close Icon',
  warning: 'Warning Icon',
};

const rightReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'close':
    return IconCloseCircle;
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
  'Input',
  withInfo(`
    The input component is used to get text input from the user.  This component implements a modified version of the Material Design specifications for an input component.


    The component includes:
    - A controlled input
    - An optional floating label
    - An optional icon that displays outside of the input on the far-left side of the component
    - An optional icon that displays within the input to the far-right
    - Optional help/error text that displays below the input
    - An optional icon that can display to the left of the help/error text.


    The component's inputState prop controls whether it renders with the default/primary styling and html attributes, error styling and html attributes, or disabled styling and html attributes.

    #### Example declaration:
    ~~~js
    import { Input, IconSearch, IconCloseCircle } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    state = {
      exampleInput: '',
    }

    onChange = (value, name) => {
      this.setState({
        [name]: value
      })
    }
    <Input
      iconLeft={IconSearch}
      iconRight={IconCloseCircle}
      labelText='Example Input'
      name='exampleInput'
      onChange={this.onChange}
      placeholder='Enter text here'
      value={this.state.exampleInput}
      width='100%'
    />
    ~~~
  `)(() => {
    const inputState = select('inputState', ['primary', 'error', 'disabled'], 'primary');
    const iconLeft = select('iconLeft', leftOptions, 'search');
    const iconRight = select('iconRight', rightOptions, 'close');
    const helpIcon = select('helpIcon', rightOptions, 'warning');
    const icnLtClk = select('onIconLeftClick', FuncOptions, 'none');
    const icnRtClk = select('onIconRightClick', FuncOptions, 'none');
    const onBlur = select('onBlur', FuncOptions, 'none');
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
      <Input
        autoFocus={boolean('autoFocus', false)}
        dense={boolean('dense', false)}
        helpText={text('helpText', 'Helpful wording here')}
        helpIcon={rightReturn(helpIcon)}
        iconLeft={leftReturn(iconLeft)}
        onIconLeftClick={FuncReturn(icnLtClk)}
        iconRight={rightReturn(iconRight)}
        onIconRightClick={FuncReturn(icnRtClk)}
        labelText={text('labelText', 'Example Input')}
        name={text('name', 'exampleInput')}
        noLabel={boolean('noLabel', false)}
        onBlur={FuncReturn(onBlur)}
        onClick={FuncReturn(onClick)}
        onFocus={FuncReturn(onFocus)}
        onKeyDown={FuncReturn(onKeyDown)}
        onKeyUp={FuncReturn(onKeyUp)}
        onMouseDown={FuncReturn(onMouseDown)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        onMouseUp={FuncReturn(onMouseUp)}
        onTouchStart={FuncReturn(onTouchStart)}
        onTouchEnd={FuncReturn(onTouchEnd)}
        placeholder={text('placeholder', 'use the "value" input')}
        readOnly={boolean('readOnly', false)}
        required={boolean('required', false)}
        inputState={inputState}
        type={text('type', 'text')}
        value={text('value', 'hello')}
        width={text('width', '300px')}
      />
    );
  })
);
