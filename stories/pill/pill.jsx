import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, object, color, select, boolean } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Pill, theme } from '../../src/index.js';
const stories = storiesOf('Pill', module);

stories.addDecorator(withKnobs);

stories.add(
  'Pill',
  withInfo(`
    Pills are used to display a static value that can optionally be removed/cancelled.
    #### Example declaration:
    ~~~js
    import { Pill } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <Pill
      cancellable
      labelText='Ima Pill'
      onCancel={cancelFunction}
    />
    ~~~
  `)(() => {
    const labelText = text('label text', 'info');
    const cancellable = boolean('cancellable', true);
    return(
      <Pill
        cancellable={cancellable}
        labelText={labelText}
      />
    );
  })
);
