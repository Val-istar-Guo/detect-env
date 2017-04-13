export default function (policy) {
  if (!('default' in policy)) throw new Error('detectEnv expect deault value');
  return policy[process.env.NODE_ENV] || policy.default;
}
