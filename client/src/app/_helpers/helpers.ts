import { config } from '../_config/config';

export const buildAzoraOneUrl = (application: string): string => {
  let result = config.azoraOneUrl;
  result = result.replace(config.replaceText, application);
  return result;
}
