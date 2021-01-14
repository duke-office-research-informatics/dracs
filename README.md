# README

Duke Research Application Component System v1.0.41

This is the repository for Duke Research Application Component System (DRACS) components.

The documentation is implemented in `react-storybook`available here https://duke-office-research-informatics.github.io/dracs/?path=/story/app-header--header

Each component has a playground in which you can manipulate each prop and see the outcome from the UI, and an info section that tells how to import the component from dracs, how to declare it, and a table that lists all props.

-- with snapshot testing (enzyme-to-json), accessibliity testing (jest-aXe), and style testing (jest-styled-components).

### What is this repository for?

Making the DRACS component package available, and providing documentation and testing for DRACS components in the same repo.
The documentation application allows people who are interested in using DRACS components to see what each looks like, what it can do via props, and whether or not it is suitable for their needs.

### How do I use this library in my application?

- Make sure that you have node and NPM installed -- and that your app is a `react.js` application that uses or can use `styled-components` for styling.
- install this package via NPM - `npm install @duke-office-research-informatics/dracs --save`
- make sure that your application meets DRACS' peerDependencies (react > v16.8.0 , react-dom > v16.8.0, styled-components > v4.0.0, lodash v4.17.4)
- add styled-components' `themeProvider` (https://www.styled-components.com/docs/advanced#theming) to the root of your application, using the DRACS theme (`import { theme } from 'dracs'`) as the provided theme, and declare it in your app root like so:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@duke-office-research-informatics/dracs";
import App from "path/to/your/app";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
```

- a css reset is highly recommended -- use the reset in `assets/reset.css` of this repo for guaranteed interoperablility with DRACS -- or feel free to use your own.
- start importing and using the components! For more info on component API's, see the documentation provided in this repo.

Special Note:
If you are affiliated with a CTSA institution, please provide your name, email address and CTSA institution name.
We would like to keep up with these collaborations.

```
UL1TR002553 Boulware (PI) 05/02/18–4/30/23
Duke CTSA
The Duke CTSA catalyzes the translation of scientific discoveries into health benefits for communities through collaborative research. It provides key infrastructure, resources, and learning opportunities for translational researchers at Duke and its partners. The grant supports research through pilot funding, training and career development, and Cores with expertise in research design, regulatory, biomedical informatics, data sciences, recruitment, participant interactions, community engagement, special populations, team science,  and workforce development.
```

### How do I set up the documentation?

- Node and NPM are required to run this repo -- please install them if you have not previously.
- Clone this repo `git clone git@github.com:duke-office-research-informatics/dracs.git`.
- Once cloned, enter the root directory and run `npm install` from your terminal.
- once the dependencies have installed run `npm run storybook` from your terminal.
- the application should be running at `localhost:9001`.

#### With Docker and Docker Compose

If you have docker and docker-compose installed, you can build and run
dracs in docker.

##### build and run the service locally

```bash
docker-compose build dracs
docker-compose up -d dracs
docker-compose run dracs bash
```

Service will be running on https://localhost:9091

#### view or tail the logs from the running dracs service

```bash
# just print them once to stdout
docker-compose logs dracs
# tail them until you type ctrl-C
docker-compose logs -f dracs
```

#### run with local files mounted into container

You can mount your local files into the running container for live changes.
This is an experimental feature, and may not work as well as running node and
npm natively. Mounting the local filesystem into the running container
definitely imposes a performance penalty, especially when running docker in
a Virtual Machine, e.g. Docker For Mac, and Docker For Windows. If you simply
want to run the dracs service for documentation, the above commands are
preferred.

```bash
[ -L docker-compose.override.yml ] || ln -s docker-compose.dev.yml docker-compose.override.yml
docker-compose up -d dracs
docker-compose run dracs bash
```

One caveat, when you build the dracs image, it does not create
node_modules in your local file system. If you do not have node_modules
on your local file system, you will need to run the following before any
of the above commands will succeed:

```bash
[ -L docker-compose.override.yml ] || ln -s docker-compose.dev.yml docker-compose.override.yml
docker-compose run dracs bash
npm install
```

By default, NODE_ENV is set to `development` in the Dockerfile. You can change
this when you run npm install, e.g.

```bash
NODE_ENV=production npm install
```

#### cleaning up docker containers

When you are ready to stop the running dracs service, and/or after running any
interactive bash containers via docker-compose run, you should stop and clean up
these containers. docker-compose provides a single command which accomplishes both:

```bash
docker-compose down
```

If you should ever want to rebuild the docker image from scratch, you can remove
the dracs image from your local docker registry, and rebuild:

```bash
docker rmi dracs
docker-compose build dracs
```

### Contribution guidelines

- Contributions are encouraged. Any contribution must be approved via PR and must include the new/update component/feature, and the corresponding documentation and testing.

- We are currently implementing a test framework for existing dracs components. Once all existing components have been tested, we will add documentation on how to a) document and b) test a DRACS component to further encourage outside contribution.

- To use a development branch of dracs in your project, add the git repo to your `dependencies` list in your application's `package.json` like so : `"dracs": "git+ssh://git@github.com:duke-office-research-informatics/dracs.git#DEV_BRANCH"`
