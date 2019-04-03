import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { SolidDivider, DashedDivider, H5 } from '../../src/index.js';

const stories = storiesOf('Dividers', module);

stories.add(
  'Divders',
  withInfo(`
    Dividers are used to divide discrete UI components.  There is a \`SolidDivider\` and a \`DashedDivider\`.  They take no props.
    #### Example declaration:
    ~~~js
    import { SolidDivider, DashedDivider } from 'dracs';
    ~~~
    #### Example usage:
    ~~~js
    <SolidDivider/>

    <DashedDivider/>
    ~~~
  `)(()=>{
    return(
      <div style={{width: '100vw'}}>
        <div style={{width: '100%', height: '50px', display: 'flex', flexDirection: 'column', flex: '1 1 auto', alignItems: 'center', justifyContent: 'center'}}>
          <H5>Dashed Divider</H5>
          <DashedDivider/>
        </div>
        <div style={{width: '100%', height: '50px', display: 'flex', flexDirection: 'column', flex: '1 1 auto', alignItems: 'center', justifyContent: 'center'}}>
          <H5>Solid Divider</H5>
          <SolidDivider/>
        </div>
      </div>
    );
  })
);
