import { AxiosResponse } from 'axios';
import { redirectRoute, storeApi } from '../services';

// Utilities

export const fetchAll = (...args: string[]): Promise<AxiosResponse<ResponseTypes[]>>[] =>
  args.map(url => storeApi.get(url));

export const userResponse = (type: string, game?: GameTypes) => {
  if (type === 'utility') {
    return `
*Free Games Tracker*
/aflojajuegos - _get a list of free games_
    `;
  }

  if (type === 'start') {
    return `
_Let me see what I can get..._

...pobre
....asqueoroso
.....sopa do macaco
......muerto de hambre

        *NELSON*
    `;
  }

  if (type === 'nogames') {
    return `Juan, te busca Kike, dice que *no hay juegos gratis*.`;
  }

  if (type === 'error') {
    return `Something went wrong. Joseph, es hora de que _vuelvas_ con *Amanda*.`;
  }

  if (type === 'correct' && game) {
    const { name, currentPrice, store, id, fullPrice } = game;

    return `
*${name}* is _${currentPrice}_ on [${store}](${redirectRoute}${id})
full price is ${fullPrice}$, so... you should take it.
    `;
  }

  return 'Something went wrong!';
};
