import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, object, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { RadioGroup, RadioButton } from '../../src/index.js';

const stories = storiesOf('Buttons', module);

stories.addDecorator(withKnobs);

const FuncOptions = {
  none: 'no change handler declared',
  withHandler: 'with change handler declared',
};
/* eslint-disable no-unreachable */
const FuncReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'withHandler':
    return () => alert('change handler declared');
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */

stories.add(
  'Radio Buttons',
  withInfo(`
    The RadioGroup and RadioButton components are meant to be used in tandem to create a field of radio buttons.
    Radio buttons are used when the user needs to make a choice between more than two options, and can only choose a single option.


    \`RadioGroup\` receives a \`value\` prop, which it uses to evaluate each of the \`RadioButton\`'s \`value\` props.
    If a \`RadioButton\`'s \`value\` is the same as the \`RadioGroup\`'s \`value\`, then that button's \`checked\` prop will be set to \`true\`,
    otherwise it will be set to \`false\`.

    #### Example declaration:
    ~~~js
    import { RadioGroup, RadioButton } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    const ExampleData = [
      {
        "id": 1,
        "name": "Radio Button 1"
      },
      {
        "id": 2,
        "name": "Radio Button 2"
      },
      {
        "id": 3,
        "name": "Radio Button 3"
      }
    ]

    <RadioGroup
      name='ExampleGroup'
      value={value}
      onChange={function}
      wrapperStyle={wrapperStyle}
    >
      {ExampleData.map(({ id, name }) => {
        return(
          <RadioButton
            changeOnLabelClick={changeOnLabelClick}
            label={name}
            labelStyle={labelStyle}
            name={\`button-\${id}\`}
            value={id}
          />
        );
      })}
    </RadioGroup>
    ~~~
  `)(() => {
    const value = number('value', 1, { range: true, min: 1, max: 3, step: 1 });
    const changeOnLabelClick = boolean('changeOnLabelClick', false);
    const onChange = select('onChange', FuncOptions, 'withHandler');
    const ExampleData = object('Example Data', [
      {
        id: 1,
        name: 'Radio Button 1',
      },
      {
        id: 2,
        name: 'Radio Button 2',
      },
      {
        id: 3,
        name: 'Radio Button 3',
      },
    ]);
    const wrapperStyle = object('wrapperStyle', {});
    const labelStyle = object('labelStyle', {
      fontWeight: 700,
      fontSize: '1em',
      marginLeft: '24px',
      paddingLeft: '4px',
      marginTop: '2px',
    });
    return (
      <RadioGroup
        name="ExampleGroup"
        value={value}
        onChange={FuncReturn(onChange)}
        wrapperStyle={wrapperStyle}
        disabled={boolean('group disabled', false)}
      >
        {ExampleData.map(({ id, name }) => {
          return (
            <RadioButton
              key={id}
              value={id}
              label={name}
              name={`button-${id}`}
              changeOnLabelClick={changeOnLabelClick}
              labelStyle={labelStyle}
              disabled={boolean(`disable button ${id}`, false)}
            />
          );
        })}
      </RadioGroup>
    );
  })
);
