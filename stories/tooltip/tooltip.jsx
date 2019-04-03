import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, boolean, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { Tooltip, H3, Button } from '../../src/index.js';

const stories = storiesOf('Tooltips', module);

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

const composeOptions = {
  button: 'Button',
  h3: 'H3',
};

const composeReturn = value => {
  switch (value) {
  case 'h3':
    return H3;
    break;
  case 'button':
    return Button;
    break;
  default:
    return H3;
  }
};
stories.add(
  'Tooltip',
  withInfo(`
    The tooltip is used to convey further contextual (but not extremely important) information to a user, generally pertaining to the element that the tooltip is composing.

    The DRACS tooltip is a higher-order-component that works by composing the element that is to have the tooltip display.
    This guarantees that the tooltip will know the position and sizing of the element it is composing and can thus render in the position specified by the \`tooltipPosition\` prop.

    #### Example declaration:
    ~~~js
    import { Tooltip, H5 } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    const ExampleTooltip = Tooltip(H5);

    <ExampleTooltip
      tooltip='Example Info'
    >
      I'm the H5 the tooltip is composing
    </ExampleTooltip>
    ~~~

    #### Prop Type Deifinitions -- until React-Docgen has better HOC support (\`Tooltip\` is an HOC)
    ~~~js
    /** React element(s) passed as a child of the tooltip */
    children: propTypes.node,
    /** Function called when the composed element loses focus */
    onBlur: propTypes.func,
    /** Function called when the composed element is clicked */
    onClick: propTypes.func,
    /** Function called when the composed element gains focus */
    onFocus: propTypes.func,
    /** Function called when the cursor enters the composed element */
    onMouseEnter: propTypes.func,
    /** Function called when the cursor leaves the composed element */
    onMouseLeave: propTypes.func,
    /** String or react element that displays as the tooltips label/body */
    tooltip: propTypes.oneOfType([
      propTypes.string,
      propTypes.node,
    ]),
    /** Number (in miliseconds) that delays the tooltip's mount/dismount to allow its' enter/exit animations to render */
    tooltipDelay: propTypes.number,
    /** Sets whether or not the tooltip will dismount if the composed element is clicked while the tooltip is active */
    tooltipHideOnClick: propTypes.bool,
    /** Sets whether or not the tooltip will dismount if the composed element loses focus */
    tooltipHideOnBlur: propTypes.bool,
    /** String that sets an HTML/CSS ID attribute on the tooltip */
    tooltipId: propTypes.string,
    /** Sets whether the tooltip displays above, below, to the left, or to the right of the composed component.  If 'horizontal', the tooltip will evaluate where there is more space to the left or right, 'vertical' top/bottom, then display where there is more space */
    tooltipPosition: propTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
    /** Sets whether or not the tooltip renders on click of the composed component */
    tooltipShowOnClick: propTypes.bool,
    /** Sets whether the tooltip renders when the composed element gains focus */
    tooltipShowOnFocus: propTypes.bool,
    ~~~
  `)(() => {
    const composedElement = select('Composed Element', composeOptions, 'button');
    const TooltipExample = Tooltip(composeReturn(composedElement));
    const tooltipPosition = select(
      'tooltipPosition',
      ['vertical', 'horizontal', 'top', 'bottom', 'left', 'right'],
      'vertical'
    );
    const onBlur = select('onBlur', FuncOptions, 'none');
    const onClick = select('onClick', FuncOptions, 'none');
    const onFocus = select('onFocus', FuncOptions, 'none');
    const onMouseEnter = select('onMouseEnter', FuncOptions, 'none');
    const onMouseLeave = select('onMouseLeave', FuncOptions, 'none');

    return (
      <TooltipExample
        tooltipPosition={tooltipPosition}
        tooltip={text('tooltip', 'Contextual Info')}
        tooltipId={text('tooltipId', '')}
        onBlur={FuncReturn(onBlur)}
        onClick={FuncReturn(onClick)}
        onFocus={FuncReturn(onFocus)}
        onMouseEnter={FuncReturn(onMouseEnter)}
        onMouseLeave={FuncReturn(onMouseLeave)}
        tooltipDelay={number('tooltipDelay', 0)}
        tooltipHideOnClick={boolean('tooltipHideOnClick', false)}
        tooltipHideOnBlur={boolean('tooltipHideOnBlur', false)}
        tooltipShowOnClick={boolean('tooltipShowOnClick', false)}
        tooltipShowOnFocus={boolean('tooltipShowOnFocus', false)}
        label={
          composedElement === 'button' ? text('button label', 'Button composed with Tooltip') : null
        }
      >
        {composedElement === 'h3' ? text('body text', 'H3 composed with Tooltip') : null}
      </TooltipExample>
    );
  })
);
