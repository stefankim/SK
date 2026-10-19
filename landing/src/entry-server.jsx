import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { CASE_STUDIES } from './data/caseStudies';
export {
  CLIENTS, CONTENT, EMAIL, LANGS, LANG_PATH, METRIC_VALUES, PROJECTS, SITE_URL, SOCIAL, STACK_NAMES,
} from './data/content';
export { pageTitle, pathFor } from './i18n';

export const render = (route) => renderToString(<App route={route} />);
