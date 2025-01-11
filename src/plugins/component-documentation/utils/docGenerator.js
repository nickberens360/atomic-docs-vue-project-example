
export function getPropType(prop) {
  if (Array.isArray(prop.type)) {
    return prop.type.map(t => t.name).join(' | ');
  }
  return prop.type ? prop.type.name : 'Type Undefined';
}

export function getPropDefault(prop) {
  if (prop.default === undefined) {
    return 'undefined';
  }
  if (typeof prop.default === 'function') {
    const defaultValue = prop.default();
    return JSON.stringify(defaultValue);
  }
  return JSON.stringify(prop.default);
}

export function generatePropsItems(component) {
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

export function getPropsHeaders(additionalHeaders = []) {
  return [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Required', key: 'required' },
    { title: 'Default', key: 'default' },
    { title: 'Actions', key: 'actions' },
    ...additionalHeaders
  ];
}

export function getEventHeaders(additionalHeaders = []) {
  return [
    { title: 'Event', key: 'event' },
    { title: 'Payload', key: 'payload' },
    { title: 'Description', key: 'description' },
    ...additionalHeaders
  ];
}

//TODO: No longer working
// export function generateEventItems(definitions) {
//   return definitions.map(({ name, payload = 'None', description = 'No description provided' }) => ({
//     event: name,
//     payload,
//     description,
//   }));
// }

export function getSlotHeaders(additionalHeaders = []) {
  return [
    { title: 'Name', key: 'name' },
    { title: 'Content', key: 'content' },
    { title: 'Description', key: 'description' },
    ...additionalHeaders
  ];
}
//TODO: No longer working
// export function generateSlotItems(definitions) {
//   return definitions.map(({ name, defaultContent = 'None', description = 'No description provided' }) => ({
//     name,
//     defaultContent,
//     description,
//   }));
// }

export function generateComponentDocumentation(options = {}) {
  const {
    component,
    // slotDefinitions = [],
    // eventDefinitions = [],
    propsAdditionalHeaders = [],
    eventsAdditionalHeaders = [],
    slotsAdditionalHeaders = []
  } = options;
  return {
    props: {
      headers: getPropsHeaders(propsAdditionalHeaders),
      items: generatePropsItems(component)
    },
    events: {
      headers: getEventHeaders(eventsAdditionalHeaders),
      // items: generateEventItems(eventDefinitions)
    },
    slots: {
      headers: getSlotHeaders(slotsAdditionalHeaders),
      // items: generateSlotItems(slotDefinitions)
    }
  };
}