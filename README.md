#### The emailsInput component

##### Technical details
The project uses Typescript, postcss, jest, and can be bundled with parceljs. 

##### Getting started
- `npm install` to install the dependencies
- `npm start` to start the devServer. This will use the `index.html` file at the root of the project as an entrypoint, and serve it locally.

Other commands:
- `npm run test`
- `npm run build:website` will use the `index.html` as an entrypoint and create a production bundle in the `dist` folder
- `npm run build:library` only bundle the emailsInput code in the dist folder
- `npm run build:library:umd` only bundle the emailsInput code in the dist folder in UMD format

##### Technical overview

###### Example uses

*As a global*

- Run `npm run build:library:umd` and use as follow

```html
<head>
  <link rel="stylesheet" href="./emailsInput.css">
</head>
...
<div style="..." id="content"></div>
<div style="..." id="content2"></div>
<div style="..." id="content3"></div>

<script src="./emailsInput.js"></script>
<script type="text/javascript">
  const id1 = document.getElementById('content');
  window.miro.EmailsInput(id1);

  const id2 = document.getElementById('content2');
  window.miro.EmailsInput(id2);

  const id3 = document.getElementById('content3');
  window.miro.EmailsInput(id3);
</script>
```

###### Technical choices

I tried to keep the code as dumb and straightforward as possible. The code gets the main elements by classname, adds event listeners, and interacts with the DOM via a viewModel. The code is quite specific to the use case, but should be simple enough to be modified/extended should the requirements change.

The widget is meant to occupy 100% of the size of its parent. It should look reasonably good as long as the parent isn't very small, and as long as the parent roughly respects the same ratio as the mock (500x340). Since making it fully responsive wasn't part of the requirement, I didn't invest time into it.

The test suite focuses on the critical aspects of the code, rather than on 100% code coverage. 

The code has been tested on Chrome, Firefox and Safari, running on MacOS 11.2. IE and Edge have been tested on Browserstack, with the free minutes I had left. Ideally I'd have loved to borrow a Windows laptop to have more direct feedback. 
