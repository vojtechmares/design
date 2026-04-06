export interface NavItem {
  label: string;
  id: string;
  icon: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'FOUNDATIONS',
    items: [
      { label: 'Typography', id: 'typography', icon: 'Type' },
      { label: 'Color Palette', id: 'colors', icon: 'Palette' },
      { label: 'Code Colors', id: 'code-colors', icon: 'Code' },
      { label: 'Container & Spacing', id: 'grid-layout', icon: 'LayoutGrid' },
      { label: 'Shapes & Radius', id: 'shapes', icon: 'Triangle' },
      { label: 'Animations', id: 'animations', icon: 'Sparkles' },
    ],
  },
  {
    title: 'COMPONENTS',
    items: [
      { label: 'Hero', id: 'hero', icon: 'PanelTop' },
      { label: 'Section', id: 'section', icon: 'Square' },
      { label: 'Card', id: 'card', icon: 'CreditCard' },
      { label: 'Buttons', id: 'buttons', icon: 'MousePointerClick' },
      { label: 'Forms & Inputs', id: 'forms-inputs', icon: 'TextCursorInput' },
      { label: 'Loading & Skeletons', id: 'loading-skeletons', icon: 'Loader' },
      { label: 'Callout', id: 'callout-box', icon: 'MessageSquareQuote' },
    ],
  },
  {
    title: 'GUIDELINES',
    items: [
      { label: 'States', id: 'states', icon: 'ToggleLeft' },
      { label: "Do's & Don'ts", id: 'dos-donts', icon: 'CheckCircle' },
    ],
  },
];

export const sectionIds: string[] = navGroups.flatMap((g) => g.items.map((i) => i.id));
