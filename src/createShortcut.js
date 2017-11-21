export default (handles, env) => (
  Object.keys(handles)
    .reduce((shortcut, name) => {
      shortcut[name] = handles[name](env);
      return shortcut;
    }, {})
);
