import { config } from '../_config/config';

export const buildAzoraOneUrl = (application: string): string => {
  let result = config.azoraOneUrl;
  result = result.replace(config.replaceText, application);
  return result;
}

export const buildWebsocketUrl = (username: string): string => {
  const result = config.webAPISocketUrl + '/sockets/' + username;
  return result;
}
