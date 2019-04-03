import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, object, color, select, boolean, text } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components';
import { LinearProgress, theme } from '../../../src/index.js';
const stories = storiesOf('Progress', module);

const Wrapper = styled.div`
min-width: 500px;
width: 100%;
`;

stories.addDecorator(withKnobs);

stories.add(
  'Linear Progress',
  withInfo(`
    The linear progress bar component is meant to display an amount or percentage of completed items.
    When the type is 'controlled', the percentage displayed by the line is calculated out of 100 using the supplied \`range.min\` and \`range.max\` props to define the range, and using the \`valueBegin\` and \`valueEnd\` props to set where the line begins and ends relative to the range.
    When the type is 'uncontrolled', the comonent animates the line in an infinite loop.
    #### Example declaration:
    ~~~js
    import { LinearProgress } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <LinearProgress
      range={
        min: 0,
        max: 100,
        valueBegin: 0,
        valueEnd: 75,
      }
    />
    ~~~
  `)(() => {
    const valueBegin = number('valueBegin', 0);
    const valueEnd = number('valueEnd', 75);
    const min = number('min', 0);
    const max = number('max', 100);
    const height = text('height', '8px');
    const width = text('width', '100%');
    const strokeWidth = number('strokeWidth', 1);
    const animationDuration = number('animationDuration', 600);
    const type = select('type', ['controlled', 'uncontrolled'], 'controlled');
    const strokeLinecap = select('strokeLinecap', ['square', 'round'], 'square');
    const progressLineColor = color('progressLineColor', theme.colors.action);
    const backgroundLineColor = color('backgroundLineColor', theme.colors.border);
    const wrapperStyle = object('wrapperStyle', {});
    const backgroundLine = boolean('backgroundLine', true);
    const animateOnMount = boolean('animateOnMount', true);

    return(
      <Wrapper>
        <LinearProgress
          animateOnMount={animateOnMount}
          animationDuration={animationDuration}
          backgroundLine={backgroundLine}
          backgroundLineColor={backgroundLineColor}
          height={height}
          progressLineColor={progressLineColor}
          range={{
            max: max,
            min: min,
            valueBegin: valueBegin,
            valueEnd: valueEnd,
          }}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          type={type}
          width={width}
          wrapperStyle={wrapperStyle}
        />
      </Wrapper>
    );
  })
);
