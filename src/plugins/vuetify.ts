// plugins/vuetify.js -- Framework documentation: https://vuetifyjs.com

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VBtn, VRadio } from 'vuetify/components';
import colors from 'vuetify/util/colors';

const baseColor = colors.blueGrey;

const blueGreyTheme = {
  dark: false,
  colors: {
    'background': baseColor.lighten5,
    'surface-app-bar': baseColor.base,
    'surface-app-navigation': baseColor.lighten2,
    'on-surface-app-navigation': colors.shades.black,
    'surface-app-navigation-footer': baseColor.lighten1,
    'on-surface-app-navigation-footer': colors.shades.black,
    'surface-app-navigation-header': baseColor.lighten3,
    'on-surface-app-navigation-header': colors.shades.black,
    'surface-app-navigation-avatar': baseColor.lighten1,

    'surface-light': baseColor.lighten5,
    'surface-variant': baseColor.lighten4,
    'on-surface-variant': colors.shades.black,
    'surface-bright': colors.grey.lighten5,

    'on-surface-low-contrast-text': baseColor.lighten2,
    'on-surface-high-contrast-text': '#032955',

    'primary': colors.shades.black,
    'primary-lighten-1': baseColor.lighten1,
    'primary-lighten-2': baseColor.lighten2,
    'primary-lighten-3': baseColor.lighten3,
    'primary-lighten-4': baseColor.lighten4,
    'primary-lighten-5': baseColor.lighten5,
    'primary-darken-1': baseColor.darken1,
    'primary-darken-2': baseColor.darken2,
    'primary-darken-3': baseColor.darken3,
    'primary-darken-4': baseColor.darken4,

    'error': colors.red.base,
    'on-error': colors.shades.white,
    'warning': colors.orange.base,
    'on-warning': colors.shades.white,
    'on-warning-lighten-1': colors.shades.white,
    'success': colors.green.base,
    'on-success': colors.shades.white,
    'secondary': colors.cyan.base,
    'accent': colors.deepPurple.base,
    'info': colors.blue.base,

    'meru-deprecated': colors.pink.lighten5,
    'meru-neutral': colors.grey.base,
    'meru-anchor-link': colors.lightBlue.darken3,
  },
  variables: {
    'border-color': baseColor.base,
  }
};
const darkBlueGreyTheme = {
  dark: true,
  colors: {


    // surface: colors.grey.darken4,
    // 'surface-app-bar': baseColor.darken4,
    // 'surface-app-navigation': baseColor.darken3,
    // 'on-surface-app-navigation': colors.shades.white,
    // 'surface-app-navigation-footer': baseColor.darken2,
    // 'on-surface-app-navigation-footer': colors.shades.white,
    // 'surface-app-navigation-header': baseColor.darken1,
    // 'on-surface-app-navigation-header': colors.shades.white,
    // 'surface-app-navigation-avatar': baseColor.darken2,
    //
    // 'surface-light': baseColor.darken3,

    surface: '#0e0e0e',
    background: colors.shades.black,
    'surface-light': '#1a1a1a',
    // background: colors.grey.darken4,
    // 'surface-light': colors.grey.darken3,
    // 'surface-variant': colors.grey.darken4,
    // 'on-surface-variant': colors.shades.white,
    // 'on-surface-variant': colors.shades.white,
    // 'surface-bright': colors.grey.darken3,
    //
    // 'on-surface-low-contrast-text': baseColor.lighten4,
    // 'on-surface-high-contrast-text': baseColor.lighten5, // Light blue for contrast
    //
    'primary': colors.shades.white,
    // 'primary-lighten-1': baseColor.lighten1,
    // 'primary-lighten-2': baseColor.darken1,
    // 'primary-lighten-3': baseColor.darken2,
    // 'primary-lighten-4': baseColor.darken3,
    // 'primary-lighten-5': baseColor.darken4,
    // 'primary-darken-1': baseColor.lighten2,
    // 'primary-darken-2': baseColor.lighten3,
    // 'primary-darken-3': baseColor.lighten4,
    // 'primary-darken-4': baseColor.lighten5,
    //
    // 'error': colors.red.lighten1,
    // 'on-error': colors.shades.white,
    // 'warning': colors.orange.lighten1,
    // 'on-warning': colors.shades.white,
    // 'on-warning-lighten-1': colors.shades.white,
    // 'success': colors.green.lighten1,
    // 'on-success': colors.shades.white,
    // 'secondary': colors.cyan.lighten1,
    // 'accent': colors.deepPurple.lighten1,
    // 'info': colors.blue.lighten1,
    //
    // 'meru-deprecated': colors.pink.darken4,
    // 'meru-neutral': colors.grey.darken1,
    // 'meru-anchor-link': colors.lightBlue.lighten2,
  },
  variables: {
    'border-color': baseColor.lighten1,
  }
};

export default createVuetify({
  theme: {
    defaultTheme: 'blueGreyTheme',
    variations: {
      colors: [
        'error',
        'warning',
        'info',
        'success',
        'accent',
        'secondary',
        'meru-neutral',
      ],
      lighten: 5,
      darken: 4,
    },
    themes: {
      blueGreyTheme,
      darkBlueGreyTheme,
    }
  },
  aliases: {
    VBtnPrimary: VBtn,
    VBtnSecondary: VBtn,
    VRadioSmall: VRadio
  },
  defaults: {
    VAlert: {
      density: 'compact'
    },
    VAutocomplete: {
      variant: 'underlined'
    },
    VBtnPrimary: {
      color: 'primary',
      variant: 'flat'
    },
    VBtnSecondary: {
      class: 'bg-surface',
      color: 'primary',
      variant: 'outlined'
    },
    VCardText: {
      class: ['text-body-1'],
    },
    // VContainer: {
    //   fluid: true,
    // },
    VDataTable: {
      class: ['text-body-4', 'bg-surface'],
      mobile: null,
      mobileBreakpoint: 'sm',
    },
    VDialog: {
      scrollStrategy: 'none'
    },
    VFooter: {
      color: 'surface-light',
      height: 64
    },
    VProgressLinear: {
      color: 'primary',
      indeterminate: true
    },
    VRadio: {
      class: ['text-h4', 'text-primary'],
      falseIcon: '$circle',
      trueIcon: '$dotCircle',
      ripple: false
    },
    VRadioGroup: {
      falseIcon: '$circle',
      inline: true,
      trueIcon: '$dotCircle'
    },
    VRadioSmall: {
      class: ['text-subtitle-1']
    },
    VSelect: {
      variant: 'underlined'
    },
    VTabs: {
      color: 'primary',
      class: ['text-primary-lighten-1']
    },
    VTextarea: {
      variant: 'solo',
    },
    VTextField: {
      variant: 'solo',
      // bgColor: 'surface-light',
      flat: true,
      hideDetails: true,
    },
    VToolbar: {
      flat: true,
    },
  },
  // icons: {
  //   defaultSet: 'fa',
  //   aliases: {
  //     ...aliases,
  //     ...reformattedIcons,
  //     sort: 'fal fa-arrow-up',
  //   },
  //   sets: {
  //     fa,
  //   },
  //},
});
