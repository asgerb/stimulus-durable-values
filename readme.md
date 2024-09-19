# Stimulus Durable Values

Easily make your Stimulus controller values persist through morphs.

## Installing the package

Install the package using your package handler of choice

### Using npm
```bash
npm i stimulus-durable-values
```

### Using yarn
```bash
yarn add stimulus-durable-values
```

## Usage

### Setting up the API

Import the `DurableValuePropertiesBlessing` and add it to the `blessings` array on the `Controller` class:

```js
import { Controller } from "@hotwired/stimulus"
import { DurableValuePropertiesBlessing } from "stimulus-durable-values"

Controller.blessings.push(DurableValuePropertiesBlessing)
```

In rails apps this would typically be done in the `app/javascript/controllers/application.js` file.

### Implementing in a Controller

Now you can mark values as durable in your controller:

```js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { open: Boolean }
  static durableValues = ["open"]

  // Your controller logic
}
```

Whenever you change a durable value in the controller, it will be saved. If the DOM is updated (via a morph), the value will automatically revert to the saved state, ensuring consistent behavior across interactions.
