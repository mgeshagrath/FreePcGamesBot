import { AxiosResponse } from 'axios';
import { redirectRoute, storeApi } from '../services';

// Utilities

export const fetchAll = (...args: string[]): Promise<AxiosResponse<ResponseTypes[]>>[] =>
  args.map(url => storeApi.get(url));

export const userResponse = (type: string, game?: GameTypes) => {
  if (type === 'utility') {
    return `
*Tutturuuuu~*
/aflojajuegos - _get a list of free games_
    `;
  }

  if (type === 'start') {
    return `
_Tutturuuuu~
Anone, Mayushii will try her best to find something for you!_
`;
  }

  if (type === 'nogames') {
    return `Mayushii could not find anything, but there is a *banana* for you. hehe`;
  }

  if (type === 'error') {
    return `Something went wrong.`;
  }

  if (type === 'correct' && game) {
    const { name, currentPrice, store, id, fullPrice } = game;
    return `
*${name}* is _${currentPrice}_ on [${store}](${redirectRoute}${id})
full price is *${fullPrice}$*, our _supa hacka_ is happy with his new game!.
    `;
  }

  return 'Something went wrong!';
};
