export type SubDemo = { name: string; slug: string };
export type CatalogComponent = { name: string; slug: string; demos: SubDemo[] };
export type Category = { name: string; components: CatalogComponent[] };

export const categories: Category[] = [
  {
    name: "Accordion",
    components: [
      {
        name: "Accordion",
        slug: "accordion",
        demos: [
          { name: "Accessibility Animations", slug: "accessibility-animations" },
          { name: "Basic", slug: "basic" },
          { name: "Customization Advanced Expansion Styles", slug: "customization-advanced-expansion-styles" },
          { name: "Customization Expansion Styles", slug: "customization-expansion-styles" },
          { name: "Customization Icons", slug: "customization-icons" },
          { name: "Customization Theming", slug: "customization-theming" },
          { name: "Disable Group", slug: "disable-group" },
          { name: "Disable Individual", slug: "disable-individual" },
          { name: "Listen Changes", slug: "listen-changes" },
          { name: "Multiple", slug: "multiple" },
          { name: "Readonly Group", slug: "readonly-group" },
          { name: "Readonly Individual", slug: "readonly-individual" },
          { name: "Toggle", slug: "toggle" },
        ],
      },
    ],
  },
  {
    name: "Action Sheet",
    components: [
      {
        name: "Action Sheet",
        slug: "action-sheet",
        demos: [
          { name: "Controller", slug: "controller" },
          { name: "Inline IsOpen", slug: "inline-isOpen" },
          { name: "Inline Trigger", slug: "inline-trigger" },
          { name: "Role Info On Dismiss", slug: "role-info-on-dismiss" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Styling", slug: "theming-styling" },
        ],
      },
    ],
  },
  {
    name: "Alert",
    components: [
      {
        name: "Alert",
        slug: "alert",
        demos: [
          { name: "Buttons", slug: "buttons" },
          { name: "Customization", slug: "customization" },
          { name: "Inputs Radios", slug: "inputs-radios" },
          { name: "Inputs Text Inputs", slug: "inputs-text-inputs" },
          { name: "Presenting Controller", slug: "presenting-controller" },
          { name: "Presenting IsOpen", slug: "presenting-isOpen" },
          { name: "Presenting Trigger", slug: "presenting-trigger" },
        ],
      },
    ],
  },
  {
    name: "Badge",
    components: [
      {
        name: "Badge",
        slug: "badge",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Inside Tab Bar", slug: "inside-tab-bar" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Breadcrumbs",
    components: [
      {
        name: "Breadcrumbs",
        slug: "breadcrumbs",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Collapsing Items Expand On Click", slug: "collapsing-items-expand-on-click" },
          { name: "Collapsing Items Items Before After", slug: "collapsing-items-items-before-after" },
          { name: "Collapsing Items Max Items", slug: "collapsing-items-max-items" },
          { name: "Collapsing Items Popover On Click", slug: "collapsing-items-popover-on-click" },
          { name: "Icons Custom Separators", slug: "icons-custom-separators" },
          { name: "Icons Icons On Items", slug: "icons-icons-on-items" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Button",
    components: [
      {
        name: "Button",
        slug: "button",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Expand", slug: "expand" },
          { name: "Fill", slug: "fill" },
          { name: "Icons", slug: "icons" },
          { name: "Shape", slug: "shape" },
          { name: "Size", slug: "size" },
          { name: "Text Wrapping", slug: "text-wrapping" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "Ripple Effect",
        slug: "ripple-effect",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Customizing", slug: "customizing" },
          { name: "Type", slug: "type" },
        ],
      },
    ],
  },
  {
    name: "Card",
    components: [
      {
        name: "Card",
        slug: "card",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Buttons", slug: "buttons" },
          { name: "List", slug: "list" },
          { name: "Media", slug: "media" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Checkbox",
    components: [
      {
        name: "Checkbox",
        slug: "checkbox",
        demos: [
          { name: "Alignment", slug: "alignment" },
          { name: "Basic", slug: "basic" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Indeterminate", slug: "indeterminate" },
          { name: "Justify", slug: "justify" },
          { name: "Label Link", slug: "label-link" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Chip",
    components: [
      {
        name: "Chip",
        slug: "chip",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Slots", slug: "slots" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Content",
    components: [
      {
        name: "Content",
        slug: "content",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Fixed", slug: "fixed" },
          { name: "Fullscreen", slug: "fullscreen" },
          { name: "Header Footer", slug: "header-footer" },
          { name: "Scroll Events", slug: "scroll-events" },
          { name: "Scroll Methods", slug: "scroll-methods" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
          { name: "Theming Safe Area", slug: "theming-safe-area" },
        ],
      },
    ],
  },
  {
    name: "Date & Time Pickers",
    components: [
      {
        name: "Datetime Button",
        slug: "datetime-button",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Format Options", slug: "format-options" },
        ],
      },
      {
        name: "Datetime",
        slug: "datetime",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Buttons Customizing Button Texts", slug: "buttons-customizing-button-texts" },
          { name: "Buttons Customizing Buttons", slug: "buttons-customizing-buttons" },
          { name: "Buttons Showing Confirmation Buttons", slug: "buttons-showing-confirmation-buttons" },
          { name: "Date Constraints Advanced", slug: "date-constraints-advanced" },
          { name: "Date Constraints Max Min", slug: "date-constraints-max-min" },
          { name: "Date Constraints Values", slug: "date-constraints-values" },
          { name: "Format Options", slug: "format-options" },
          { name: "HighlightedDates Array", slug: "highlightedDates-array" },
          { name: "HighlightedDates Callback", slug: "highlightedDates-callback" },
          { name: "Localization Custom Locale", slug: "localization-custom-locale" },
          { name: "Localization First Day Of Week", slug: "localization-first-day-of-week" },
          { name: "Localization Hour Cycle", slug: "localization-hour-cycle" },
          { name: "Localization Locale Extension Tags", slug: "localization-locale-extension-tags" },
          { name: "Localization Time Label", slug: "localization-time-label" },
          { name: "Multiple", slug: "multiple" },
          { name: "Presentation Date", slug: "presentation-date" },
          { name: "Presentation Month And Year", slug: "presentation-month-and-year" },
          { name: "Presentation Time", slug: "presentation-time" },
          { name: "Presentation Wheel", slug: "presentation-wheel" },
          { name: "Show Adjacent Days", slug: "show-adjacent-days" },
          { name: "Styling Calendar Days", slug: "styling-calendar-days" },
          { name: "Styling Calendar Header", slug: "styling-calendar-header" },
          { name: "Styling Datetime Header", slug: "styling-datetime-header" },
          { name: "Styling Wheel Styling", slug: "styling-wheel-styling" },
          { name: "Title Customizing Title", slug: "title-customizing-title" },
          { name: "Title Showing Default Title", slug: "title-showing-default-title" },
        ],
      },
      {
        name: "Picker",
        slug: "picker",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Modal", slug: "modal" },
          { name: "Prefix Suffix", slug: "prefix-suffix" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Floating Action Button",
    components: [
      {
        name: "FAB",
        slug: "fab",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Before Content", slug: "before-content" },
          { name: "Button Sizing", slug: "button-sizing" },
          { name: "List Side", slug: "list-side" },
          { name: "Positioning", slug: "positioning" },
          { name: "Safe Area", slug: "safe-area" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Custom Properties", slug: "theming-css-custom-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
        ],
      },
    ],
  },
  {
    name: "Grid",
    components: [
      {
        name: "Grid",
        slug: "grid",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Customizing Column Number", slug: "customizing-column-number" },
          { name: "Customizing Padding", slug: "customizing-padding" },
          { name: "Customizing Width", slug: "customizing-width" },
          { name: "Fixed", slug: "fixed" },
          { name: "Horizontal Alignment", slug: "horizontal-alignment" },
          { name: "Offset Responsive", slug: "offset-responsive" },
          { name: "Offset", slug: "offset" },
          { name: "Push Pull Responsive", slug: "push-pull-responsive" },
          { name: "Push Pull", slug: "push-pull" },
          { name: "Size Auto", slug: "size-auto" },
          { name: "Size Responsive", slug: "size-responsive" },
          { name: "Size", slug: "size" },
          { name: "Vertical Alignment", slug: "vertical-alignment" },
        ],
      },
    ],
  },
  {
    name: "Icons",
    components: [
      {
        name: "Icon",
        slug: "icon",
        demos: [
          { name: "Basic", slug: "basic" },
        ],
      },
    ],
  },
  {
    name: "Infinite Scroll",
    components: [
      {
        name: "Infinite Scroll",
        slug: "infinite-scroll",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Custom Infinite Scroll Content", slug: "custom-infinite-scroll-content" },
          { name: "Infinite Scroll Content", slug: "infinite-scroll-content" },
        ],
      },
    ],
  },
  {
    name: "Inputs",
    components: [
      {
        name: "Input OTP",
        slug: "input-otp",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Fill", slug: "fill" },
          { name: "Pattern", slug: "pattern" },
          { name: "Separators", slug: "separators" },
          { name: "Shape", slug: "shape" },
          { name: "Size", slug: "size" },
          { name: "States", slug: "states" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Type", slug: "type" },
        ],
      },
      {
        name: "Input Password Toggle",
        slug: "input-password-toggle",
        demos: [
          { name: "Basic", slug: "basic" },
        ],
      },
      {
        name: "Input",
        slug: "input",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Clear", slug: "clear" },
          { name: "Counter Alignment", slug: "counter-alignment" },
          { name: "Counter", slug: "counter" },
          { name: "Fill", slug: "fill" },
          { name: "Filtering", slug: "filtering" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "Label Slot", slug: "label-slot" },
          { name: "Mask", slug: "mask" },
          { name: "No Visible Label", slug: "no-visible-label" },
          { name: "Set Focus", slug: "set-focus" },
          { name: "Start End Slots", slug: "start-end-slots" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Types", slug: "types" },
        ],
      },
      {
        name: "Textarea",
        slug: "textarea",
        demos: [
          { name: "Autogrow", slug: "autogrow" },
          { name: "Basic", slug: "basic" },
          { name: "Clear On Edit", slug: "clear-on-edit" },
          { name: "Counter", slug: "counter" },
          { name: "Fill", slug: "fill" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "Label Slot", slug: "label-slot" },
          { name: "No Visible Label", slug: "no-visible-label" },
          { name: "Start End Slots", slug: "start-end-slots" },
          { name: "Theming", slug: "theming" },
        ],
      },
    ],
  },
  {
    name: "Item",
    components: [
      {
        name: "Item Divider",
        slug: "item-divider",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "Item Group",
        slug: "item-group",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Sliding Items", slug: "sliding-items" },
        ],
      },
      {
        name: "Item Sliding",
        slug: "item-sliding",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Expandable", slug: "expandable" },
          { name: "Icons", slug: "icons" },
        ],
      },
      {
        name: "Item",
        slug: "item",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Buttons", slug: "buttons" },
          { name: "Clickable", slug: "clickable" },
          { name: "Content Types Actions", slug: "content-types-actions" },
          { name: "Content Types Controls", slug: "content-types-controls" },
          { name: "Content Types Metadata", slug: "content-types-metadata" },
          { name: "Content Types Supporting Visuals", slug: "content-types-supporting-visuals" },
          { name: "Content Types Text", slug: "content-types-text" },
          { name: "Detail Arrows", slug: "detail-arrows" },
          { name: "Inputs", slug: "inputs" },
          { name: "Lines", slug: "lines" },
          { name: "Media", slug: "media" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
          { name: "Theming Input Highlight", slug: "theming-input-highlight" },
        ],
      },
      {
        name: "Label",
        slug: "label",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Input", slug: "input" },
          { name: "Item", slug: "item" },
          { name: "Theming Colors", slug: "theming-colors" },
        ],
      },
      {
        name: "Note",
        slug: "note",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Item", slug: "item" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "List",
    components: [
      {
        name: "List Header",
        slug: "list-header",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Buttons", slug: "buttons" },
          { name: "Lines", slug: "lines" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "List",
        slug: "list",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Inset", slug: "inset" },
          { name: "Lines", slug: "lines" },
        ],
      },
    ],
  },
  {
    name: "Media",
    components: [
      {
        name: "Avatar",
        slug: "avatar",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Chip", slug: "chip" },
          { name: "Item", slug: "item" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "Image",
        slug: "img",
        demos: [
          { name: "Basic", slug: "basic" },
        ],
      },
      {
        name: "Thumbnail",
        slug: "thumbnail",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Item", slug: "item" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Menu",
    components: [
      {
        name: "Menu",
        slug: "menu",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Multiple", slug: "multiple" },
          { name: "Sides", slug: "sides" },
          { name: "Theming", slug: "theming" },
          { name: "Toggle", slug: "toggle" },
          { name: "Type", slug: "type" },
        ],
      },
      {
        name: "Split Pane",
        slug: "split-pane",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Modal",
    components: [
      {
        name: "Backdrop",
        slug: "backdrop",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Styling", slug: "styling" },
        ],
      },
      {
        name: "Modal",
        slug: "modal",
        demos: [
          { name: "Can Dismiss Boolean", slug: "can-dismiss-boolean" },
          { name: "Can Dismiss Function", slug: "can-dismiss-function" },
          { name: "Can Dismiss Prevent Swipe To Close", slug: "can-dismiss-prevent-swipe-to-close" },
          { name: "Card Basic", slug: "card-basic" },
          { name: "Custom Dialogs", slug: "custom-dialogs" },
          { name: "Inline Basic", slug: "inline-basic" },
          { name: "Inline Is Open", slug: "inline-is-open" },
          { name: "Performance Mount", slug: "performance-mount" },
          { name: "Sheet Auto Height", slug: "sheet-auto-height" },
          { name: "Sheet Background Content", slug: "sheet-background-content" },
          { name: "Sheet Basic", slug: "sheet-basic" },
          { name: "Sheet Expand To Scroll", slug: "sheet-expand-to-scroll" },
          { name: "Sheet Handle Behavior", slug: "sheet-handle-behavior" },
          { name: "Styling Animations", slug: "styling-animations" },
          { name: "Styling Theming", slug: "styling-theming" },
        ],
      },
    ],
  },
  {
    name: "Popover",
    components: [
      {
        name: "Popover",
        slug: "popover",
        demos: [
          { name: "Customization Positioning", slug: "customization-positioning" },
          { name: "Customization Sizing", slug: "customization-sizing" },
          { name: "Customization Styling", slug: "customization-styling" },
          { name: "Nested", slug: "nested" },
          { name: "Performance Mount", slug: "performance-mount" },
          { name: "Presenting Inline Isopen", slug: "presenting-inline-isopen" },
          { name: "Presenting Inline Trigger", slug: "presenting-inline-trigger" },
        ],
      },
    ],
  },
  {
    name: "Progress Indicators",
    components: [
      {
        name: "Loading",
        slug: "loading",
        demos: [
          { name: "Controller", slug: "controller" },
          { name: "Inline", slug: "inline" },
          { name: "Spinners", slug: "spinners" },
          { name: "Theming", slug: "theming" },
        ],
      },
      {
        name: "Progress Bar",
        slug: "progress-bar",
        demos: [
          { name: "Buffer", slug: "buffer" },
          { name: "Determinate", slug: "determinate" },
          { name: "Indeterminate", slug: "indeterminate" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
        ],
      },
      {
        name: "Skeleton Text",
        slug: "skeleton-text",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "Spinner",
        slug: "spinner",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Resizing", slug: "theming-resizing" },
        ],
      },
    ],
  },
  {
    name: "Radio",
    components: [
      {
        name: "Radio",
        slug: "radio",
        demos: [
          { name: "Alignment", slug: "alignment" },
          { name: "Basic", slug: "basic" },
          { name: "Empty Selection", slug: "empty-selection" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Justify", slug: "justify" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "Label Wrap", slug: "label-wrap" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
          { name: "Using Comparewith", slug: "using-comparewith" },
        ],
      },
    ],
  },
  {
    name: "Range",
    components: [
      {
        name: "Range",
        slug: "range",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Dual Knobs", slug: "dual-knobs" },
          { name: "Ion Change Event", slug: "ion-change-event" },
          { name: "Ion Knob Move Event", slug: "ion-knob-move-event" },
          { name: "Label Slot", slug: "label-slot" },
          { name: "Labels", slug: "labels" },
          { name: "No Visible Label", slug: "no-visible-label" },
          { name: "Pins", slug: "pins" },
          { name: "Slots", slug: "slots" },
          { name: "Snapping Ticks", slug: "snapping-ticks" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
        ],
      },
    ],
  },
  {
    name: "Refresher",
    components: [
      {
        name: "Refresher",
        slug: "refresher",
        demos: [
          { name: "Advanced", slug: "advanced" },
          { name: "Basic", slug: "basic" },
          { name: "Custom Content", slug: "custom-content" },
          { name: "Custom Scroll Target", slug: "custom-scroll-target" },
          { name: "Pull Properties", slug: "pull-properties" },
        ],
      },
    ],
  },
  {
    name: "Reorder",
    components: [
      {
        name: "Reorder",
        slug: "reorder",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Custom Icon", slug: "custom-icon" },
          { name: "Custom Scroll Target", slug: "custom-scroll-target" },
          { name: "Reorder Move Event", slug: "reorder-move-event" },
          { name: "Reorder Start End Events", slug: "reorder-start-end-events" },
          { name: "Toggling Disabled", slug: "toggling-disabled" },
          { name: "Updating Data", slug: "updating-data" },
          { name: "Wrapper", slug: "wrapper" },
        ],
      },
    ],
  },
  {
    name: "Searchbar",
    components: [
      {
        name: "Searchbar",
        slug: "searchbar",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Cancel Button", slug: "cancel-button" },
          { name: "Clear Button", slug: "clear-button" },
          { name: "Debounce", slug: "debounce" },
          { name: "Search Icon", slug: "search-icon" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Segment",
    components: [
      {
        name: "Segment Button",
        slug: "segment-button",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Layout", slug: "layout" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
        ],
      },
      {
        name: "Segment",
        slug: "segment",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Scrollable", slug: "scrollable" },
          { name: "Swipeable", slug: "swipeable" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Select",
    components: [
      {
        name: "Select",
        slug: "select",
        demos: [
          { name: "Basic Multiple Selection", slug: "basic-multiple-selection" },
          { name: "Basic Responding To Interaction", slug: "basic-responding-to-interaction" },
          { name: "Basic Single Selection", slug: "basic-single-selection" },
          { name: "Customization Button Text", slug: "customization-button-text" },
          { name: "Customization Custom Toggle Icons", slug: "customization-custom-toggle-icons" },
          { name: "Customization Icon Flip Behavior", slug: "customization-icon-flip-behavior" },
          { name: "Customization Interface Options", slug: "customization-interface-options" },
          { name: "Customization Styling Select", slug: "customization-styling-select" },
          { name: "Fill", slug: "fill" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Interfaces Action Sheet", slug: "interfaces-action-sheet" },
          { name: "Interfaces Modal", slug: "interfaces-modal" },
          { name: "Interfaces Popover", slug: "interfaces-popover" },
          { name: "Justify", slug: "justify" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "Label Slot", slug: "label-slot" },
          { name: "No Visible Label", slug: "no-visible-label" },
          { name: "Objects As Values Multiple Selection", slug: "objects-as-values-multiple-selection" },
          { name: "Objects As Values Using Comparewith", slug: "objects-as-values-using-comparewith" },
          { name: "Start End Slots", slug: "start-end-slots" },
        ],
      },
    ],
  },
  {
    name: "Tabs",
    components: [
      {
        name: "Tabs",
        slug: "tabs",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Select Method", slug: "select-method" },
        ],
      },
    ],
  },
  {
    name: "Toast",
    components: [
      {
        name: "Toast",
        slug: "toast",
        demos: [
          { name: "Buttons", slug: "buttons" },
          { name: "Icon", slug: "icon" },
          { name: "Inline Basic", slug: "inline-basic" },
          { name: "Inline Is Open", slug: "inline-is-open" },
          { name: "Layout", slug: "layout" },
          { name: "Position Anchor", slug: "position-anchor" },
          { name: "Presenting Controller", slug: "presenting-controller" },
          { name: "Swipe Gesture", slug: "swipe-gesture" },
          { name: "Theming", slug: "theming" },
        ],
      },
    ],
  },
  {
    name: "Toggle",
    components: [
      {
        name: "Toggle",
        slug: "toggle",
        demos: [
          { name: "Alignment", slug: "alignment" },
          { name: "Basic", slug: "basic" },
          { name: "Helper Error", slug: "helper-error" },
          { name: "Justify", slug: "justify" },
          { name: "Label Placement", slug: "label-placement" },
          { name: "List", slug: "list" },
          { name: "On Off", slug: "on-off" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
          { name: "Theming Css Shadow Parts", slug: "theming-css-shadow-parts" },
        ],
      },
    ],
  },
  {
    name: "Toolbar",
    components: [
      {
        name: "Buttons",
        slug: "buttons",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Placement", slug: "placement" },
          { name: "Types", slug: "types" },
        ],
      },
      {
        name: "Footer",
        slug: "footer",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Custom Scroll Target", slug: "custom-scroll-target" },
          { name: "Fade", slug: "fade" },
          { name: "No Border", slug: "no-border" },
          { name: "Translucent", slug: "translucent" },
        ],
      },
      {
        name: "Header",
        slug: "header",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Condense", slug: "condense" },
          { name: "Custom Scroll Target", slug: "custom-scroll-target" },
          { name: "Fade", slug: "fade" },
          { name: "No Border", slug: "no-border" },
          { name: "Translucent", slug: "translucent" },
        ],
      },
      {
        name: "Title",
        slug: "title",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Collapsible Large Title Basic", slug: "collapsible-large-title-basic" },
          { name: "Collapsible Large Title Buttons", slug: "collapsible-large-title-buttons" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
      {
        name: "Toolbar",
        slug: "toolbar",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Buttons", slug: "buttons" },
          { name: "Progress Bars", slug: "progress-bars" },
          { name: "Searchbars", slug: "searchbars" },
          { name: "Segments", slug: "segments" },
          { name: "Theming Colors", slug: "theming-colors" },
          { name: "Theming Css Properties", slug: "theming-css-properties" },
        ],
      },
    ],
  },
  {
    name: "Typography",
    components: [
      {
        name: "Text",
        slug: "text",
        demos: [
          { name: "Basic", slug: "basic" },
        ],
      },
    ],
  },
  {
    name: "Other",
    components: [
      {
        name: "Animations",
        slug: "animations",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Before And After Hooks", slug: "before-and-after-hooks" },
          { name: "Chain", slug: "chain" },
          { name: "Gesture", slug: "gesture" },
          { name: "Group", slug: "group" },
          { name: "Keyframes", slug: "keyframes" },
          { name: "Modal Override", slug: "modal-override" },
          { name: "Preference Based", slug: "preference-based" },
        ],
      },
      {
        name: "App",
        slug: "app",
        demos: [
          { name: "Set Focus", slug: "set-focus" },
        ],
      },
      {
        name: "Config",
        slug: "config",
        demos: [
          { name: "Mode", slug: "mode" },
        ],
      },
      {
        name: "Gestures",
        slug: "gestures",
        demos: [
          { name: "Basic", slug: "basic" },
          { name: "Double Click", slug: "double-click" },
        ],
      },
      {
        name: "Keyboard",
        slug: "keyboard",
        demos: [
          { name: "Enterkeyhint", slug: "enterkeyhint" },
          { name: "Inputmode", slug: "inputmode" },
        ],
      },
      {
        name: "Layout",
        slug: "layout",
        demos: [
          { name: "Dynamic Font Scaling", slug: "dynamic-font-scaling" },
        ],
      },
      {
        name: "Picker Legacy",
        slug: "picker-legacy",
        demos: [
          { name: "Controller", slug: "controller" },
          { name: "Inline IsOpen", slug: "inline-isOpen" },
          { name: "Inline Trigger", slug: "inline-trigger" },
          { name: "Multiple Column", slug: "multiple-column" },
        ],
      },
    ],
  },
];
