// Define shared types for the component-documentation plugin

/**
 * Represents a Vue component property type
 */
export interface PropType {
  name: string;
}

/**
 * Represents a Vue component property
 */
export interface Prop {
  type: PropType | PropType[];
  required?: boolean;
  default?: unknown;
}

/**
 * Represents a collection of Vue component properties
 */
export interface Props {
  [key: string]: Prop;
}

/**
 * Represents a Vue component with its properties
 */
export interface Component {
  props?: Props;
  // Future extensions could include methods, computed properties, etc.
}

/**
 * Represents a processed property item for display
 */
export interface PropItem {
  name: string;
  type: string;
  required: string;
  default: string;
}

/**
 * Represents a table header
 */
export interface Header {
  title: string;
  key: string;
}

/**
 * Represents an event definition
 */
export interface EventDefinition {
  name: string;
  payload?: string;
  description?: string;
}

/**
 * Represents a processed event item for display
 */
export interface EventItem {
  event: string;
  payload: string;
  description: string;
}

/**
 * Represents a slot definition
 */
export interface SlotDefinition {
  name: string;
  defaultContent?: string;
  description?: string;
}

/**
 * Represents a processed slot item for display
 */
export interface SlotItem {
  name: string;
  content: string;
  description: string;
}

/**
 * Options for generating component documentation
 */
export interface ComponentDocumentationOptions {
  component?: Component;
  slotDefinitions?: SlotDefinition[];
  eventDefinitions?: EventDefinition[];
  propsAdditionalHeaders?: Header[];
  eventsAdditionalHeaders?: Header[];
  slotsAdditionalHeaders?: Header[];
}

/**
 * Interface for the component documentation plugin
 */
export interface ComponentDocPlugin {
  convertPathToExampleName: (path: string) => string;
  componentModules: Record<string, () => Promise<VueComponent>>;
  exampleModules: Record<string, () => Promise<VueComponent>>;
}

/**
 * Represents a dynamically imported Vue component
 */
export interface VueComponent {
  default: Component;
}

/**
 * Represents a component item in the navigation
 */
export interface ComponentNavItem {
  type: 'component';
  label: string;
  relativePath: string;
  exampleComponent: string;
}

/**
 * Represents a directory item in the navigation
 */
export interface DirectoryNavItem {
  type: 'directory';
  label: string;
  relativePath: string;
  children: Record<string, NavItem>;
}

/**
 * Union type for navigation items
 */
export type NavItem = ComponentNavItem | DirectoryNavItem;
