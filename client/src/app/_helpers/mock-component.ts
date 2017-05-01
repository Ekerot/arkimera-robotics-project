import { Component } from '@angular/core';

/**
 * Examples:
 * MockComponent({ selector: 'app-selector' });
 * MockComponent({ selector: 'app-selector-2', inputs: ['something'] });
 */
export function MockComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs
  };
  return Component(metadata)(class _ { });
}
