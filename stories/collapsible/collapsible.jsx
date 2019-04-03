import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, text, boolean, object, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Collapsible, P, theme } from '../../src/index.js';

const stories = storiesOf('Collapsible', module);
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
  'Collapsible',
  withInfo(`
    The \`Collapsible\` component is a UI 'accordion' component.  It has a \`title\`/\`toggle\` and a \`body\` that is hidden unless toggled.
    The \`title\` is passed as a prop, and \`the body\` is passed as a child of \`Collapsible\`
    #### Example declaration:
    ~~~js
    import { Collapsible } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Collapsible
        title='Example Title'
        active={activeProp}
      >
        <child/>
      </Collapsible>
    ~~~
  `)(() => {
    const toggleClick = select('onToggleClick', FuncOptions, 'none');
    return (
      <div
        style={{
          height: '200px',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Collapsible
          active={boolean('active', false)}
          componentWrapperPadding={text('componentWrapperPadding', '')}
          onToggleClick={FuncReturn(toggleClick)}
          title={text('title', 'Example Collapsible')}
          titleColor={color('titleColor', theme.colors.base)}
          titleHoverColor={color('titleHoverColor', theme.colors.base)}
          wrapperStyle={object('wrapperStyle', {
            border: 'solid 1px #e8e5e2',
            borderRadius: '4px',
            width: '100%',
          })}
        >
          <P>{text('collapsible body text', 'This is the collapsible body')}</P>
        </Collapsible>
      </div>
    );
  })
);
