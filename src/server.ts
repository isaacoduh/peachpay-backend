import { IAuthPayload } from "./interfaces/auth.interface";
import http from "http";
import {
  Request,
  Response,
  Application,
  json,
  NextFunction,
  urlencoded,
} from "express";
import compression from "compression";
import { verify } from "jsonwebtoken";
import { appRoutes } from "./routes";
const SERVER_PORT = process.env.PORT || 7200;

export function start(app: Application): void {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startServer(app);
}

function securityMiddleware(app: Application): void {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload: IAuthPayload = verify(token, "secret") as IAuthPayload;
      req.currentUser = payload;
    }
    next();
  });
}

function standardMiddleware(app: Application): void {
  app.use(compression());
  app.use(json({ limit: "200mb" }));
  app.use(urlencoded({ extended: true, limit: "200mb" }));
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    startHttpServer(httpServer);
  } catch (error) {}
}

function startHttpServer(httpServer: http.Server): void {
  httpServer.listen(SERVER_PORT, () => {
    console.log(`server running on port ${SERVER_PORT}`);
  });
}
