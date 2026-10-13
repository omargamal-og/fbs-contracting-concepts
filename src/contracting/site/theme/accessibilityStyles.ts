// These selectors cover only the contracting layout and its own portal roots.
const roots = '[data-contracting-site], [data-contracting-portal]'
const descendants = '[data-contracting-site] *, [data-contracting-portal] *'

export const accessibilityStyles = {
  [
    '[data-contracting-site] :is(a, button, input, textarea, select, [tabindex]):focus-visible, ' +
    '[data-contracting-portal] :is(a, button, input, textarea, select, [tabindex]):focus-visible'
  ]: {
    outline: '2px solid #082F4D !important',
    outlineOffset: '3px',
    boxShadow: '0 0 0 4px #FFFFFF !important',
  },
  '[data-contracting-site] nav a[aria-current="page"], [data-contracting-portal] nav a[aria-current="page"]': {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    [roots]: { scrollBehavior: 'auto !important' },
    [descendants]: {
      animation: 'none !important',
      transition: 'none !important',
      scrollBehavior: 'auto !important',
    },
    '[data-contracting-site] *::before, [data-contracting-site] *::after, [data-contracting-portal] *::before, [data-contracting-portal] *::after': {
      animation: 'none !important',
      transition: 'none !important',
    },
    '[data-contracting-site] a:hover, [data-contracting-site] a:hover img, [data-contracting-site] :is(a, button):hover::after': {
      transform: 'none !important',
    },
    // The app sets viewport smooth scrolling. Restore it automatically on unmount.
    'html:has([data-contracting-site])': { scrollBehavior: 'auto !important' },
  },
}
