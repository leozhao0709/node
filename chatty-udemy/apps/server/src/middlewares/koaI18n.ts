import Koa from 'koa';
import i18next from 'i18next';
import enResource from '../i18n/en-US.js';
import zhCNResource from '../i18n/zh-CN.js';

i18next.init({
  lng: 'en-US',
  debug: true,
  resources: {
    ...enResource,
    ...zhCNResource,
  },
  fallbackLng: 'en-US',
});

const koaI18n = (): Koa.Middleware => async (ctx, next) => {
  let lng = ctx.header['accept-language'];
  if (lng === undefined) {
    lng = 'en-US';
  }
  if (i18next.language !== lng) {
    await i18next.changeLanguage(lng);
  }

  await next();
};

export default koaI18n;
