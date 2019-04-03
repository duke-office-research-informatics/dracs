import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, select } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import {
  List,
  SingleLineListItem,
  IconContacts,
  IconEmail,
  IconTrashcan,
  Switch,
  theme,
} from '../../../src/index.js';

const stories = storiesOf('Lists', module);
stories.addDecorator(withKnobs);

const FuncOptions = {
  none: 'no handler declared',
  withHandler: 'with handler declared',
};
/* eslint-disable no-unreachable */
const FuncReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'withHandler':
    return () => alert('handler declared');
    break;
  default:
    return null;
  }
};

const childOptions = {
  none: 'none',
  switchUnchecked: 'Switch component - unchecked',
  switchChecked: 'Switch component - checked',
  contacts: 'Contacts Icon',
  email: 'Email Icon',
  trashcan: 'Trashcan Icon',
};

const childReturn = value => {
  switch (value) {
  case 'none':
    return null;
    break;
  case 'switchUnchecked':
    return <Switch />;
    break;
  case 'switchChecked':
    return <Switch checked={true} />;
    break;
  case 'contacts':
    return <IconContacts />;
    break;
  case 'email':
    return <IconEmail />;
    break;
  case 'trashcan':
    return <IconTrashcan />;
    break;
  default:
    return null;
  }
};
/* eslint-enable no-unreachable */
const exampleData = [
  {
    name: 'Wright Flyer',
    manufacturer: 'Wright Brothers',
    description: 'First airplane that ever flew',
  },
  {
    name: 'Spitfire',
    manufacturer: 'Supermarine',
    description: 'Iconic World War II fighter',
  },
  {
    name: '787',
    manufacturer: 'Boeing',
    description: 'First airliner constructed out of primarily composite materials',
  },
  {
    name: 'SR-71 Blackbird',
    manufacturer: 'Lockheed',
    description: 'Holds the  world record for the fastest air-breathing manned airplane in history',
  },
  {
    name: 'SR22',
    manufacturer: 'Cirrus',
    description: 'The best-selling single-engine four-seat aircraft for more than a decade',
  },
];

stories.add(
  'Single Line Item',
  withInfo(`
    DRACS lists consist of the List parent component wrapping a list item component.  Lists can be single-, double-, or triple- lined.

    All list items include:
    - A lefthand item and clickhandler,
    - The main central area
    - A righthand item passed as a child of the list item.

    The single line list item passes the main area as the \`title\` prop.

     #### Example Declaration
     ~~~js
     import { List, SingleLineListItem } from 'dracs';
     ~~~
     #### Example usage:
     ~~~js

     const exampleData = [
       {
         name: 'Wright Flyer',
         manufacturer: 'Wright Brothers',
         description: 'First airplane that ever flew',
       },
       {
         name: 'Spitfire',
         manufacturer: 'Supermarine',
         description: 'Iconic World War II fighter',
       },
       {
         name: '787',
         manufacturer: 'Boeing',
         description: 'First airliner constructed out of primarily composite materials'
       },
       {
         name: 'SR-71 Blackbird',
         manufacturer: 'Lockheed',
         description: 'Holds the  world record for the fastest air-breathing manned airplane in history'
       },
       {
         name: 'SR22',
         manufacturer: 'Cirrus',
         description: 'The best-selling single-engine four-seat aircraft for more than a decade'
       }
     ]

     render(){
       <List>
         {exampleData.map(item => {
           return(
             <SingleLineListItem
               title={item.name}
             />
           );
         })}
       </List>
     }
     ~~~
  `)(() => {
    const listData = object('List Data', exampleData);
    const children = select('children', childOptions, 'none');
    const leftIcon = select('leftIcon', childOptions, 'none');
    const onClick = select('onClick', FuncOptions, 'none');
    const onLeftIconClick = select('onLeftIconClick', FuncOptions, 'none');

    return (
      <List
        style={object('List component style', {
          border: `solid 1px ${theme.colors.border}`,
          width: '300px',
        })}
      >
        {listData.map(item => {
          return (
            <SingleLineListItem
              key={item.manufacturer}
              bottomBorder={boolean('bottomBorder', false)}
              clickable={boolean('clickable', false)}
              leftIcon={childReturn(leftIcon)}
              onClick={FuncReturn(onClick)}
              onLeftIconClick={FuncReturn(onLeftIconClick)}
              title={item.name}
              wrapperStyle={object('Item wrapperStyle', {})}
            >
              {childReturn(children)}
            </SingleLineListItem>
          );
        })}
      </List>
    );
  })
);
