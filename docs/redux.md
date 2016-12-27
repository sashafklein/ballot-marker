# Redux Patterns

This app stores *all* data in a central Redux store. All UI interactions are recorded in the central store, which allows all components to be "stateless" pure functions of their properties, which they get from the store. And at the end of the ballot marking process, all the user's choices can be read from the global state object.

Redux reducers are stored in `src/store/modules/` and collected into the `src/store/reducers.js` file. The actions are centrally located in `src/store/actions.js` and follow the basic pattern of having argument names be identical to key names in the returned object, for simplicity. This pattern is tested in the `src/store/__specs__/actions.spec.js` file.