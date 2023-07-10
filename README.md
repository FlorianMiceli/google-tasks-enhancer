# Google Task Enhancer

A chrome extension to enhance Google Tasks experience across Google Workspace. Planning to add more features.

[Link to the Chrome Web store page](https://chrome.google.com/webstore/detail/google-tasks-enhancer/jgkonicgfhoedmeimlgmaokeoofjihfb?hl=fr)

## Features

- Adds a button to set all overdue tasks to today, in the top bar.
![Alt text](features_images/image-1.png)
- 

## How to login

- click on the extension icon
- click on "login"
- approve the app, google has not approved the app yet
- accept google task access

## Useful links

[Architecture of a chrome extension](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)

[How to implement Oauth2](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/)

[Inject code with "content_scripts"](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

[Access other files from a content script](https://developer.chrome.com/docs/extensions/mv3/manifest/web_accessible_resources/)

[Inspect only css that is applied to an element with Chrome devTools](https://developer.chrome.com/docs/devtools/css/reference/#computed)

## Todo

- time zone settings
- replace getAuthToken by launchWebAuthFlow (to support Microsoft Edge)
- refresh tasks after "Overdue to today"
