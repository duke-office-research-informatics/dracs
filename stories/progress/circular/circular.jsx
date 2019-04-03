import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, object, color, select, boolean } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { CircularProgress, theme } from '../../../src/index.js';
const stories = storiesOf('Progress', module);

stories.addDecorator(withKnobs);

stories.add(
  'Circular Progress',
  withInfo(`
    The circular progress component is meant to display a percentage of completed items.  The percentage is calculated into a percentage out of 100 using the supplied \`min\` and \`max\` props to define the range.
    The inner label can be set via a string, and defaults to the percentage complete passed to the component.
    The bottom label is optional.

    #### Example declaration:
    ~~~js
    import { CircularProgress } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <CircularProgress
      value={75}
    />
    ~~~
  `)(() => {
    const value = number('value', 50);
    const max = number('max', 100);
    const min = number('min', 0);
    const size = text('size', '200px');
    const strokeWidth = number('strokeWidth', 2 );
    const controlledAnimationDuration = number('ctrlAnimDur', 400);
    const uncontrolledAnimationDuration = number('unctrlAnimDur', 2000);
    const type = select('type', ['controlled', 'uncontrolled'], 'controlled');
    const progressCircleColor = color('progressCircleColor', theme.colors.action);
    const backgroundCircleColor = color('backgroundCircleColor', theme.colors.border);
    const insideLabelColor = color('insideLabelColor', theme.colors.subheading);
    const bottomLabel = text('bottomLabel', '');
    const insideLabel = text('insideLabel', '');
    const insideLabelStyle = object('insideLabelStyle', {});
    const bottomLabelStyle = object('bottomLabelStyle', {});
    const wrapperStyle = object('wrapperStyle', {});
    const animateOnMount = boolean('animateOnMount', true);
    return(
      <CircularProgress
        animateOnMount={animateOnMount}
        backgroundCircleColor={backgroundCircleColor}
        bottomLabel={bottomLabel}
        bottomLabelStyle={bottomLabelStyle}
        controlledAnimationDuration={controlledAnimationDuration}
        insideLabel={insideLabel}
        insideLabelColor={insideLabelColor}
        insideLabelStyle={insideLabelStyle}
        max={max}
        min={min}
        progressCircleColor={progressCircleColor}
        size={size}
        strokeWidth={strokeWidth}
        type={type}
        uncontrolledAnimationDuration={uncontrolledAnimationDuration}
        value={value}
        wrapperStyle={wrapperStyle}
      />
    );
  })
);
