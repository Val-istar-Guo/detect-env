export default function (policy) {
  if (!policy.default) throw new Error('detectEnv expect deault value');
  return policy[process.env.NODE_ENV] || policy.default;
}
