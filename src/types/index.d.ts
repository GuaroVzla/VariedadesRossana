/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * Global type declarations
 */

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

