# Styling Patterns

React Native exclusively uses inline styles, meaning we can't attach classes to components, or define a single broad stylesheet. Given this, I've chosen three basic patterns for styling in the app that should simplify the application of consistent style patterns and create rules for applying them.

### Store global styles centrally

Rather than copy and paste global styles, I've built a directory of global styles usable throughout the app. These are located in `src/shared/styles` (accessable via import as `@styles`) and include:

- **colors** - All app colors should be defined in this file.
- **functions** - Any style-computing functions should be defined here. These might include functions for creating round centered images of a given width.
- **layout** - All basic layout "classes" which determine margins, centering, etc for common components.
- **text** - All rules of text sizing and presentation (the default color, size, font-family, underline, etc for, say, an "h1"), should be stored here.

  > Note that the **layout** file defines layout information for text. So an `h1` rule in the **text** file should avoid defining layout rules, which, as a separate concern, are applied separately.

- **whitespace** - A file which generates whitespace shortcuts for adding whitespace inline. It defines margin and padding, in units of five up to 100, in each direction: `mt5` (`{marginTop: 5}`), `ph85` (`{paddingHorizontal: 85}`), etc.

These style files can be imported directly `import c from '@styles/colors'`, or, more often, used through the global styles index file:

> If imported through the global styles (`gbs`, below) file, these modules are all accessible through one-character keys. Respectively: `c`, `f`, `l`, `t`, `w`.

```
import gbs from '@styles';

<View style={ [gbs.l.paragraph, gbs.w.mt10, { backgroundColor: gbs.c.darkGreen }] }>
  <Text style={ [gbs.t.paragraph, { color: gbs.c.pink }]}>Hello</Text>
</View>
```

### Define specific styles inline

Because inline styles are generally considered messy, (and because of React Native's `StyleSheet` object) most React Native programmers seem to define their styles in an object above the component or in an included file. In my experience, this adds complexity and code distance and encourages custom styles (and consequent style inconsistencies). Instead, I've tried to enforce a pattern of only using global styles and styling occasional exceptions inline. (See example above).

### Use the StyleSheet component sparingly

The `StyleSheet` component converts a styles object into an Immutable object. Using it is a best practice, but only works if the styles are not being passed through to a sub-component.

To pass styles to a subcomponent, I've followed a pattern for reusable components, like `Button`s, where they have default styles but can also take `addStyles` or `replaceStyles` properties. These props are objects with keys pointing to styles for subsections of the reusable component. `addStyles` are merged with the default styles; `replaceStyles` overwrite.

In the below example all the button's default styles other than `backgroundColor` will be preserved, but the text within the button will be completely restyled to match the `replaceStyles` specified.

```
<Button
  addStyles={ {
    button: {
      backgroundColor: c.blue
    }
  }}
  replaceStyles={ {
    text: {
      color: c.white,
      alignSelf: 'flex-end'
    }
  }}
>
  I'll be styled exclusively as described in replaceStyles above!
</Button>
```

The button component, compares and combines its default styles for the whole component and the text, and then wraps the result in a `StyleSheet.create` call.

### To look at

- https://www.npmjs.com/package/color
- https://medium.com/the-react-native-log/tips-for-styling-your-react-native-apps-3f61608655eb#.y4aun777o
