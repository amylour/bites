# Bites - Task Management Application

![Responsive Design](documentation/images/responsiveimg.png)

Bites is designed with neurodiversity in mind, offering a simple and intuitive approach to task management that helps reduce cognitive overload. Unlike busy, energy-draining apps, Bites uses a clean, minimal interface with bite-sized, color-coded task squares to make prioritizing and organizing tasks straightforward and stress-free. By focusing on clarity and ease of use, Bites helps users stay productive without feeling overwhelmed, so you can manage your day with more focus and less effort. It’s task management made to fit your flow, not disrupt it.The application is built using HTML, CSS (Bootstrap), and JavaScript.

You can check out the deployed project [here](https://amylour.github.io/bites/).


## Features

- Create tasks with different sizes.
- Store tasks in local storage.
- Display tasks on page load.
- Modal alert for task limits.

## Code Overview

- **Task Creation**: Allows users to create tasks with different sizes and store them in local storage.
- **local Storage**: Tasks are stored in local storage and reloaded on page load.
- **Modal Alert**: Displays a modal alert when task limits are reached.

### Excerpt from 

script.js

 (lines 59 to 86)

```javascript
modal.style.alignItems = 'center';
modal.style.zIndex = '1000';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modalContent.style.backgroundColor = '#fff';
modalContent.style.padding = '20px';
modalContent.style.borderRadius = '12px';
modalContent.style.textAlign = 'center';
modalContent.style.maxWidth = '400px';
modalContent.style.width = '80%';

const alertText = document.createElement('p');
alertText.textContent = `You only need ${sizeLimits[size]} of those right now. Try clearing some tasks before adding more.`;
alertText.style.color = '#ED553B';
alertText.style.fontFamily = 'Fredoka, sans-serif';

const closeButton = document.createElement('button');
closeButton.textContent = 'No problemo!';
closeButton.style.marginTop = '10px';
closeButton.style.padding = '10px 20px';
closeButton.style.border = 'none';
closeButton.style.borderRadius = '5px';
closeButton.style.backgroundColor = '#ED553B';
closeButton.style.color = '#fff';
closeButton.style.cursor = 'pointer';

closeButton.addEventListener('click', function() {
    // Close modal logic here
});
```

## UX Design

### Root Variables

The application uses CSS root variables to maintain a consistent design and make it easier to update styles globally.

#### `assets/css/styles.css`

```css
:root {
    --primary-color: #ED553B;
    --secondary-color: #fff;
    --font-family: 'Fredoka, sans-serif';
    --border-radius: 12px;
    --modal-max-width: 400px;
    --modal-padding: 20px;
    --button-padding: 10px 20px;
    --button-border-radius: 5px;
}

body {
    font-family: var(--font-family);
}

.modal-content {
    background-color: var(--secondary-color);
    padding: var(--modal-padding);
    border-radius: var(--border-radius);
    text-align: center;
    max-width: var(--modal-max-width);
    width: 80%;
}

button {
    margin-top: 10px;
    padding: var(--button-padding);
    border: none;
    border-radius: var(--button-border-radius);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    cursor: pointer;
}
```



