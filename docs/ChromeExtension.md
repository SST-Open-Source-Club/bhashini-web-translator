# How to Make a Chrome Extension?

### What is an Chrome Extension?

A Chrome extension is a small software program that extends the functionality of the web browser by adding extra features, allowing users to customize their web experience.

Extensions are written with the same web technologies used to create web applications:

-   HTML is used as a content markup language.
-   CSS is used for styling.
-   JavaScript is used for scripting and logic.
-   Web Platform APIs let you use feature available to a standard web page.

> **Note:** A chrome extension is also compatible with other browsers which are based on chromium like Microsoft Edge, Opera and Brave.
> Hence making it the best way to reach majority of users.

### Contents of an chrome extension

Extensions contain different files, depending on the functionality provided. The following are some of the most frequently used files:

-   **The manifest:**

    The extension's manifest is the only required file that **must** have a specific file name: `manifest.json` . It also has to be located in the extension's root directory. The manifest records important metadata, defines resources, declares permissions, and identifies which files to run in the background and on the page.

-   **The service worker**

    The extension service worker handles and listens for browser events. There are many types of events, such as navigating to a new page, removing a bookmark, or closing a tab. It can use all the Chrome APIs, but it cannot interact directly with the content of web pages; that's the job of content scripts.

-   **Content scripts**

    Content scripts execute JavaScript in the context of a web page. They can also read and modify the DOM of the pages they're injected into. Content Scripts can only use a subset of the Chrome APIs but can indirectly access the rest by exchanging messages with the extension service worker.

-   **The popup and other pages**

    An extension can include various HTML files, such as a popup, an options page, and other HTML pages. All these pages have access to Chrome APIs.

### Basic structure of an chrome extension

``` plaintext
my_extension/
  |- manifest.json
  |- popup.html
  |- popup.js
  |- background.js
  |- images/
  |    |- icon16.png
  |    |- icon48.png
  |    |- icon128.png
  |- css/
  |    |- styles.css
  |- js/
  |    |- content.js
```

-   `manifest.json` is the main configuration file for the extension.
-   `popup.html` is the HTML file for the popup.
-   `popup.js` is the JavaScript file for the popup logic.
-   `background.js` is the JavaScript file for the background script.
-   The `images/` directory contains icon images used by the extension.
-   The `css/` directory can hold CSS stylesheets.
-   The `js/` directory can store additional JavaScript files, such as content scripts.


### Contents of the `manifest.json` file:

```json
{
  "manifest_version": 3,
  "name": "Name of the Extension",
  "version": "1.0",
  "description": "Description of the Extension",
  "permissions": ["activeTab", "storage"],
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons.16",
      "48": "icons.48",
      "128": "icons.128"
    }
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### Roles of support files:

-   `popup.html`: This is the HTML file for the extension's popup. When a user clicks on the extension icon in the browser's toolbar, the popup is displayed. It typically provides a small user interface for interacting with the extension.

-   `popup.js`: This script contains the logic that defines how the popup behaves and interacts with the user. It is used to handle user interactions, perform actions, and communicate with other parts of the extension, like the background script.

-   `content.js`: This script run in the context of web pages and can interact with the DOM of the web page. These are used to modify or enhance the content of web pages. For example, you can use content scripts to inject custom styles, scripts, or manipulate the page's elements based on your extension's functionality.

-   `background.js`: This script runs separately from web pages and can handle various tasks, such as listening for events, managing state, and coordinating communication between different parts of the extension. Background scripts can also access the extension's storage and communicate with content scripts and the popup.

