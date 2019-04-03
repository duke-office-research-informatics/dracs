import React from 'react';
import styled from 'styled-components';
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
import { BottomSheet, theme, H3, H4, P } from '../../src/index.js';

const SheetWrap = styled.div`
  position: relative;
  display: flex;
  flex: 1 0 auto;
  width: 300px;
  height: 500px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: solid 1px ${p => p.theme.colors.borderDark};
  background-color: ${p => p.theme.colors.actionHover};
`;

const FuncOptions = {
  none: 'no click handler declared',
  withHandler: 'with click handler',
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
const stories = storiesOf('Bottom Sheet', module);

stories.addDecorator(withKnobs);

stories.add(
  'Bottom Sheet',
  withInfo(`
  #### Example declaration:
  ~~~js
  import { BottomSheet } from 'dracs';
  ~~~
  #### Example usage:
  ~~~js
  <BottomSheet
    active={<boolean>}
    height={<height>}
  >
    {children}
  </BottomSheet>
  ~~~
  * The bottom sheet's container element must have 'position: relative' declared in order for the sheet to position itself properly.
`)(() => {
    const onOverlayClick = select('onOverlayClick', FuncOptions, 'none');
    /* eslint-disable react/no-unescaped-entities */
    return (
      <SheetWrap>
        <H3 color="#fff">check the 'active' box to toggle the bottom sheet</H3>
        <BottomSheet
          active={boolean('active', false)}
          delay={number('delay', 300)}
          height={text('height', '200px')}
          bodyStyle={object('bodyStyle', {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
          })}
          bgColor={color('bgColor', '#fff')}
          textColor={color('textColor', theme.colors.base)}
          overlayStyle={object('overlayStyle', {})}
          onOverlayClick={FuncReturn(onOverlayClick)}
        >
          <H4 bold color={theme.colors.base}>
            hello, I am a bottom sheet!{' '}
          </H4>
          <P>you can declare any react element as my child and it will display here</P>
        </BottomSheet>
      </SheetWrap>
    );
  })
);
