import { readInheritableStaticArrayValues } from "@hotwired/stimulus/dist/core/inheritable_statics"
import { camelize } from "@hotwired/stimulus/dist/core/string_helpers"
import { ValuePropertiesBlessing } from "@hotwired/stimulus/dist/core/value_properties"

export function DurableValuePropertiesBlessing(constructor) {
  let properties = {}
  const definitions = readInheritableStaticArrayValues(
    constructor,
    "durableValues",
  )
  const valuePropertiesBlessing = ValuePropertiesBlessing(constructor)

  definitions.forEach((name) => {
    const key = camelize(`${name}Value`)
    const changedMethodName = `${key}Changed`
    const originalChangedMethod = constructor.prototype[changedMethodName]

    properties[key] = {
      get() {
        return valuePropertiesBlessing[key].get.call(this)
      },
      set(value) {
        if (!this.durableValues) {
          this.durableValues = {}
        }
        this.durableValues[key] = value
        valuePropertiesBlessing[key].set.call(this, value)
      },
    }
    constructor.prototype[changedMethodName] = function () {
      if (this.durableValues && this.durableValues[key] !== this[key]) {
        this[key] = this.durableValues[key]
      }
      if (typeof originalChangedMethod === "function") {
        originalChangedMethod.call(this)
      }
    }
  })

  return properties
}
