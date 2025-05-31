// Navigation item interfaces
export interface ComponentItem {
  type: 'component';
  label: string;
  relativePath: string;
  exampleComponent: string;
}

export interface DirectoryItem {
  type: 'directory';
  label: string;
  relativePath: string;
  children: Record<string, NavigationItem>;
}

export type NavigationItem = ComponentItem | DirectoryItem;

// Nav item interfaces used in recursive components
export interface ComponentNavItem {
  type: 'component';
  label: string;
  relativePath?: string;
  exampleComponent?: string;
}

export interface DirectoryNavItem {
  type: 'directory';
  label: string;
  relativePath?: string;
  children: Record<string, NavItem>;
}

export type NavItem = ComponentNavItem | DirectoryNavItem;

// Plugin interface
export interface ComponentDocPlugin {
  convertPathToExampleName: (path: string) => string;
  componentModules: Record<string, () => Promise<any>>;
  exampleModules: Record<string, () => Promise<any>>;
}