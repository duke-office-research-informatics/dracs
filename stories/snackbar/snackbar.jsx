import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, color, text, boolean, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Snackbar, theme, H5 } from '../../src/index.js';

const stories = storiesOf('Notifications', module);

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
  'Snackbar',
  withInfo(`
    Snackbars provide non-obtrusive feedback about an action/operation that renders at the bottom of the screen for a set amount of time.
    Snackbars can contain an action, but do not require one.

    #### Example declaration:
    ~~~js
    import { Snackbar } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Snackbar
        active={activeProp}
        actionLabel='Undo thing?'
        label='You Did a thing'
        onClick={undoThing}
      />
    ~~~


    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`ActivableRenderer\` is an HOC)
    ~~~js
    /** String -- renders a button on the right side of the component with a label that is the string value */
    actionLabel: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) color value for the action label color (when actionLabel is declared) */
    actionColor: propTypes.string,
    /** CSS-consumable (hex, rgba, etc) color value for when the user hovers over the action button (when actionLabel is declared) */
    actionHoverColor: propTypes.string,
    /** Sets whether or not the snackbar renders */
    active: propTypes.bool,
    /** React element(s) passed as a child of the modal */
    children: propTypes.node,
    /** Number in miliseconds that delays the component's mount/dismount so that the snackbar's enter and exit animations have time to render */
    delay: propTypes.number,
    /** Label that displays in the snackbar */
    label: propTypes.oneOfType([propTypes.string, propTypes.element]),
    /** CSS-consumable (hex, rgba, etc) color value for the snackbar label */
    labelColor: propTypes.string,
    /** Function that is called on click of the action button.  For when the action button is declared via the actionLabel prop */
    onClick: propTypes.func,
    /** Function that is declared when the snackbar dismounts at the end of its' timeout */
    onTimeout: propTypes.func,
    /** Number that sets the amount of time (in miliseconds) that the snackbar will be rendered */
    timeout: propTypes.number,
    ~~~
  `)(() => {
    const onClick = select('onClick', FuncOptions, 'none');
    const onTimeout = select('onTimeout', FuncOptions, 'none');
    /* eslint-disable react/no-unescaped-entities */
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
        <H5 italic>Click the 'active' input to mount/dismount the snackbar</H5>
        <Snackbar
          active={boolean('active', true)}
          label={text('label', 'You completed an action')}
          actionLabel={text('actionLabel', '')}
          labelColor={color('labelColor', '#fff')}
          actionColor={color('actionColor', theme.colors.action)}
          actionHoverColor={color('actionHoverColor', theme.colors.actionHover)}
          delay={number('delay', 300)}
          onClick={FuncReturn(onClick)}
          onTimeout={FuncReturn(onTimeout)}
          timeout={number('timeout', 2000)}
        />
      </div>
    );
  })
);
