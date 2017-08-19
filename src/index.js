import create from './create';

const defaultDetector = create();
defaultDetector.create = create;

export default defaultDetector;

