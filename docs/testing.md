# Testing Patterns

- [Testing tools](#tools)
- [What we test](#what-we-test)
  + [Unit tests](#unit-tests)
  + [Component tests](#component-tests)
  + [API tests](#api-tests)

## Tools

This project uses the following technologies for testing:

- [Mocha](https://mochajs.org/) - A popular and feature-rich test runner with informative output.
- [Chai](http://chaijs.com/) - An assertion library.
- [Enzyme](https://github.com/airbnb/enzyme) - An Airbnb-built library for testing React components.
- [Sinon](sinonjs.org) - A popular JavaScript mocking library.

> Note: I've auto-included Chai's `expect` function in all spec files, so Chai doesn't need to be imported.

Unlike in most applications, the tests in this application are generally collocated within the directory being tested, following the patterns in [this article](https://formidable.com/blog/2016/02/08/unit-testing-react-native-with-mocha-and-enzyme/). Taking a `src/bundles` directory for example, the test for `src/bundles/SomeComponent/index.js` is located at `src/bundles/SomeComponent/__specs__/index.spec.js`. This allows for easy file imports and switching between tests. Only files in `__specs__` directories and ending with `.spec.js` will be run by the `npm test` command.

## Test types

### Unit tests

Simple tests of low-level data structures and functions are written almost entirely using basic JavaScript and Chai for assertions. Things like internal utilities, as well as Redux Actions and Reducers, which are purely functional and have consistently predictable output with given inputs, should be tested for fast development and to protect against regressions. For testing Redux Reducers/Actions, we follow the [documented Redux patterns](http://redux.js.org/docs/recipes/WritingTests.html), in addition to writing some tests that assert/enforce patterns around Action naming/structure.

### Component tests

Although `enzyme` makes component testing relatively straightforward, testing Redux-connected components adds a significant layer of complication. To simplify testing these components (which are attached to a global "store" with a snapshot of the application's data state), we follow a number of best practices:

- **Components should be tested "shallowly" as much as possible.** A test of a component should avoid assertions about the behavior of nested components.

  > As an example, our `Dropdown` component renders multiple `DropdownListItem` components. We test only that given certain props, the `Dropdown` component renders the list items correctly, and passes them the predicted props. What a `DropdownListItem` does with those props is tested separately.

- **When writing components, export them by name *and* by default.** This allows us to import an *unconnected* version of the component for testing, and a connected version in the app:

  ```
  import { Text } from 'react-native';

  export const MyComponent = props => {
    return (<Text>{ props.title }</Text>);
  };

  const injectProps = s => ({ title: s.title });
  export default connect(injectProps)(MyComponent);
  ```

  > In the above example, we could now `import { MyComponent } from '../src/components/MyComponent'` in our test and `import MyComponent from './components/MyComponent'` in the app code. In the test, the imported component is not connected, and will make no attempts to connect to the Redux store, so we can simply pass in the props it expects.

- **Test that complex behavior is *called*; then test that behavior separately.** For example, if testing that clicking a dropdown item dispatches a request to update the clicked item for that dropdown, simply test that the passed `dispatch` function is called, with the expected arguments. To test this behavior, we use `sinon` spies:

  ```
  import sinon from 'sinon';
  import { shallow } from 'enzyme';

  import { MyComponent } from '../src/components/MyComponent';

  describe("MyComponent", () => {
    it("dispatches its ID when clicked", t => {
      const fakeDispatch = sinon.spy();
      const component = shallow(<MyComponent
        dispatch={ fakeDispatch }
        id="unique-id"
      />)

      component.simulate('click');
      t.true(fakeDispatch.called);
      t.deepEqual(
        fakeDispatch.lastCall.args[0],
        { type: 'MY_COMPONENT_CLICK', id: 'unique-id' }
      );
    });
  });
  ```

  > In a separate test (ie of the reducer function), follow through on what that `dispatch` should do with those arguments.

- **Avoid testing exact HTML.** Enzyme provides a handy `html()` method, which can render a component as a string of HTML. While it seems convenient to test the output directly, doing so is extremely brittle, as the test will fail -- and waste time -- on the slightest change to the component. So attempt to test core elements of the HTML rather than the HTML itself:

  Bad:

  ```
    test('The rendered component has the right classes and title', t => {
      const component = shallow(<MyComponent classes="extra" title="Hi"/>)
      t.is(
        component.html(),
        '<View class="my-component extra"><Text class="title">Hi</Text></View>'
      )
    })
  ```

  Better:

  ```
    test('The rendered component has the right classes and title', t => {
      const component = shallow(<MyComponent classes="extra" title="Hi"/>)
      t.true(component.hasClass('extra'));
      t.is(
        component.find('.title').first().text(),
        'Hi'
      );
    })
  ```

#### Component Test Gotchas

It's important to import components correctly in the tests. When testing that one component is nested in another, you'll need to import the *unconnected* version of the parent component, and the *connected* version of its child:

```
import { Dropdown } from '../../src/components/Dropdown';
import DropdownListItem from '../../src/components/dropdown/DropdownListItem';
```

- We import the *unconnected* parent, because Enzyme can't render, even shallowly, a connected component.
- We import the *connected* child, because Enzyme doesn't render it at all (when the parent is shallowly rendered), and when asserting that the child is in the parent's tree, we need to pass the **exact** component class/function that is being rendered -- ie the connected version.

An example:

```
import { Checkbox } from '../../src/components/Checkbox';
import Checkable from '../../src/components/Checkable';

test('Checkbox renders a Checkable component', t => {
 *  const component = shallow(<Checkbox name="my-checkbox" checkID="my-checkbox" />);
 *  t.is(
 *    component.find(Checkable).length,
 *    1
 *  );
});
```
