import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, color, text, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { QueuedSnackbar,  H5 } from '../../src/index.js';

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
  'Queued Snackbar',
  withInfo(`
    Snackbars provide non-obtrusive feedback about an action/operation that renders at the bottom of the screen for a set amount of time.
    Snackbars can contain an action, but do not require one.

    Queued means that messages can be sent to the component and it will display them in order without cancelling previous messages. Anytime
    the snack prop changes, the object is added to the queue.  Once an item is added to the queue, it will be displayed in the order it was received.

    #### Example declaration:
    ~~~js
    import { Snackbar } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
      <Snackbar
        snack={{
          message:'a message',
          buttonLabel: 'do a thing?',
          onClick: this.doThing,
        }}
      />
    ~~~
  `)(() => {
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
        <H5 italic>each keystroke in the message input should queue a new snackbar message</H5>
        <QueuedSnackbar
          snack={{
            message: text('message', 'Hi'),
            buttonLabel: text('buttonLabel', ''),
            onClick: FuncReturn(select('onClick', FuncOptions, 'none')),
            messageColor: color('messageColor'),
            buttonLabelColor: color('buttonLabelColor'),
            buttonLabelHoverColor: color('buttonLableHoverColor'),
            onDismiss: FuncReturn(select('onTimeout', FuncOptions, 'none')),
          }}
          timeout={number('timeout', 2000)}
        />
      </div>
    );
  })
);
