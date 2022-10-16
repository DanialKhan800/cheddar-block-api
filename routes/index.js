import userRouts from "../routes/users.route.js";
import gamePointRoutes from "../routes/gamepoints.route.js";
import transactionRoutes from "../routes/transaction.route.js";
import gameRoutes from "../routes/game.route.js";
import gameActivityRoutes from "../routes/gameactivity.route.js";
import express  from 'express';


const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRouts,
  },
  {
    path: '/gamepoint',
    route: gamePointRoutes,
  },
  {
    path: '/transaction',
    route: transactionRoutes,
  },
  {
    path: '/game',
    route: gameRoutes,
  },
  {
    path: '/gameactivity',
    route: gameActivityRoutes,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;