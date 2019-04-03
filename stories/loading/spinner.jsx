import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, text, object, number } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Spinner, theme } from '../../src/index.js';

const stories = storiesOf('Loading Indicators', module);
stories.addDecorator(withKnobs);

stories.add(
  'Spinner',
  withInfo(`
    The loading spinner is used to indicate a when a component/view/action is in a loading state.

    #### Example Declaration
    ~~~js
    import { Spinner } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Spinner />
    ~~~
  `)(()=>{
    return(
      <Spinner
        color={color('color', theme.colors.action)}
        margin={text('margin', '4px')}
        size={number('size', 32)}
        wrapperStyle={object('wrapperStyle', {})}
      />
    );
  })
);
