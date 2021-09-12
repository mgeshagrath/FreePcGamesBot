import { Telegraf } from 'telegraf';
import { TELEGRAM_TOKEN } from './credentials';
import { fetchAll, userResponse } from './libs';
import { freeRoute, storeRoute } from './services';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.command(['start', 'help'], ctx => {
  ctx.replyWithMarkdown(userResponse('utility'));
});

bot.command('aflojajuegos', async ctx => {
  ctx.replyWithMarkdown(userResponse('start'));
  try {
    const queryArr = fetchAll(freeRoute, storeRoute);

    const [gameData, storeData] = await Promise.all(queryArr);

    if (gameData.data.length === 0) {
      ctx.replyWithMarkdown(userResponse('nogames'));
      return;
    }

    const stores: { [key: string]: string } = storeData.data.reduce((obj, store) => {
      return { ...obj, [store.storeID]: store.storeName };
    }, {});

    const data = gameData.data.map(game => ({
      name: game.title,
      fullPrice: game.normalPrice,
      currentPrice: game.savings.includes('100') ? 'FREE' : `${game.salePrice}$`,
      store: stores[game.storeID],
      id: game.dealID,
    }));

    data.map(game =>
      ctx.replyWithMarkdown(userResponse('correct', game), {
        disable_web_page_preview: true,
      })
    );
  } catch (err) {
    ctx.replyWithMarkdown(userResponse('error'));
  }
});

bot.launch();
