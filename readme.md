# Stimulus Durable Values

```
import { Application } from "@hotwired/stimulus"
import { Controller } from "@hotwired/stimulus"
import { DurableValuePropertiesBlessing } from "@asgerb/stimulus-durable-values"

Controller.blessings.push(DurableValuePropertiesBlessing)

const application = Application.start()
window.Stimulus = application

export { application }
```
