import routers from '../routers.js';

const getRegistedRoutes = () => {
  routers.forEach((route) => {
    route.stack
      .filter(
        (layer) =>
          process.argv[2] === undefined || layer.name === process.argv[2]
      )
      .forEach((layer) => {
        layer.methods.forEach((method) => {
          console.log(`${layer.name} ${method}  ${layer.path}`);
        });
      });
  });
};

getRegistedRoutes();
