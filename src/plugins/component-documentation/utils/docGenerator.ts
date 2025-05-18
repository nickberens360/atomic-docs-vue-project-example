import {
  PropType,
  Prop,
  Props,
  Component,
  PropItem,
  Header,
  EventDefinition,
  EventItem,
  SlotDefinition,
  SlotItem,
  ComponentDocumentationOptions
} from '@/plugins/component-documentation/utils/types';

export function getPropType(prop: Prop): string {
  if (Array.isArray(prop.type)) {
    return prop.type.map(t => t.name).join(' | ');
  }
  return prop.type ? prop.type.name : 'Type Undefined';
}

export function getPropDefault(prop: Prop): string {
  if (prop.default === undefined) {
    return 'undefined';
  }
  if (typeof prop.default === 'function') {
    const defaultValue = prop.default();
    return JSON.stringify(defaultValue);
  }
  return JSON.stringify(prop.default);
}

export function generatePropsItems(component: Component): PropItem[] {
  console.log('component', component);
  if (!component.props) return [];
  const props = component.props;
  return Object.keys(props).map(propName => {
    const prop = props[propName];
    return {
      name: propName,
      type: getPropType(prop),
      required: prop.required ? 'true' : 'false',
      default: getPropDefault(prop),
    };
  });
}

export function getPropsHeaders(additionalHeaders: Header[] = []): Header[] {
  return [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Required', key: 'required' },
    { title: 'Default', key: 'default' },
    { title: 'Actions', key: 'actions' },
    ...additionalHeaders
  ];
}

export function getEventHeaders(additionalHeaders: Header[] = []): Header[] {
  return [
    { title: 'Event', key: 'event' },
    { title: 'Payload', key: 'payload' },
    { title: 'Description', key: 'description' },
    ...additionalHeaders
  ];
}

//TODO: No longer working
// export function generateEventItems(definitions: EventDefinition[]): EventItem[] {
//   return definitions.map(({ name, payload = 'None', description = 'No description provided' }) => ({
//     event: name,
//     payload,
//     description,
//   }));
// }

export function getSlotHeaders(additionalHeaders: Header[] = []): Header[] {
  return [
    { title: 'Name', key: 'name' },
    { title: 'Content', key: 'content' },
    { title: 'Description', key: 'description' },
    ...additionalHeaders
  ];
}
//TODO: No longer working
// export function generateSlotItems(definitions: SlotDefinition[]): SlotItem[] {
//   return definitions.map(({ name, defaultContent = 'None', description = 'No description provided' }) => ({
//     name,
//     content: defaultContent,
//     description,
//   }));
// }

// Using the ComponentDocumentationOptions interface from types.ts

export function generateComponentDocumentation(options: ComponentDocumentationOptions = {}) {
  const {
    component,
    slotDefinitions = [],
    eventDefinitions = [],
    propsAdditionalHeaders = [],
    eventsAdditionalHeaders = [],
    slotsAdditionalHeaders = []
  } = options;
  return {
    props: {
      headers: getPropsHeaders(propsAdditionalHeaders),
      items: component ? generatePropsItems(component) : []
    },
    events: {
      headers: getEventHeaders(eventsAdditionalHeaders),
      items: [] // TODO: Uncomment when generateEventItems is fixed: generateEventItems(eventDefinitions)
    },
    slots: {
      headers: getSlotHeaders(slotsAdditionalHeaders),
      items: [] // TODO: Uncomment when generateSlotItems is fixed: generateSlotItems(slotDefinitions)
    }
  };
}
