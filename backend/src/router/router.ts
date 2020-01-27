import { Router, NextFunction, Response, Request } from "express";
import routerUser from "./api/router.api.users";
import routerAuth from "./api/router.api.auth";

const router = Router();

function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.use('/api/auth', routerAuth);

router.get('/', (req: Request, res: Response) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

router.get('/profile', isAuth, function (req: Request, res: Response) {
  res.sendFile(process.cwd() + '/public/profile.html');
})

router.use('/api/users', isAuth, routerUser)

export default router;