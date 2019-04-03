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
import { Drawer, P, theme } from '../../src/index.js';

const stories = storiesOf('Drawer', module);

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
  'Drawer',
  withInfo(`
    The drawer comes in form the side and displays information.

    #### Example declaration:
    ~~~js
    import { Drawer } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Drawer
        active={activeProp}
      >
        <child>
      </Drawer>
    ~~~
    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`ActivableRenderer\` is an HOC)
    ~~~js
    /** Boolean that sets whether or not the Drawer will render */
    active: propTypes.bool,
    /** CSS-consumable string (hex, rgba, etc) color declaration for Drawer background color */
    backgroundColor: propTypes.string,
    /** React element(s) to display in the drawer */
    children: propTypes.node,
    /** style object to customize the drawer with inline styles */
    drawerStyle: propTypes.object,
    /** Number (in miliseconds) that will delay the drawer mount and dismount to allow for animations to render */
    delay: propTypes.number,
    /** Ref (functional) that targets the drawer's html/dom node */
    innerRef: propTypes.func,
    /** Boolean that sets whether or not Drawer uses a portal */
    insideTree: propTypes.bool,
    /** Function that will be called when the user hits the \`esc\` key.  For accessibility reasons, this function should close the drawer */
    onEscKeyDown: propTypes.func,
    /** Function that will be called when the user clicks on the overlay beneath the dialog.  For accessibility reasons, this function should close the drawer */
    onOverlayClick: propTypes.func,
    /** CSS-consumable string (hex, rgba, etc) color declaration for unwrapped body text in the drawer body */
    textColor: propTypes.string,
    /** String that sets whether the Drawer moves in from the right or left */
    type: propTypes.oneOf(['left', 'right']),
    /** Boolean that sets whether or not the drawer has an overlay */
    withOverlay: propTypes.bool,
    ~~~
  `)(() => {
    const escKey = select('onEscKeyDown', FuncOptions, 'none');
    const overlayClick = select('onOverlayClick', FuncOptions, 'none');
    return (
      <div
        style={{
          width: '500px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Drawer
          active={boolean('active', true)}
          withOverlay={boolean('withOverlay', true)}
          insideTree={boolean('insideTree', false)}
          type={select('type', ['left', 'right'], 'left')}
          drawerStyle={object('drawerStyle', { padding: '8px' })}
          backgroundColor={color('backgroundColor', theme.colors.actionHover)}
          textColor={color('textColor', '#fff')}
          delay={number('delay', 400)}
          onEscKeyDown={FuncReturn(escKey)}
          onOverlayClick={FuncReturn(overlayClick)}
        >
          {text('child text', 'I am the drawer\'s child text')}
          <P>{text('wrapped text', 'I am child text wrapped in a P-tag')}</P>
        </Drawer>
      </div>
    );
  })
);
