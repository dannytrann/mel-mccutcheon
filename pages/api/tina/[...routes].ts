import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider } from "tinacms-authjs";

import databaseClient from "../../../tina/__generated__/databaseClient";
import { authOptions } from "../../../tina/auth-options";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({ authOptions }),
  databaseClient,
});

const tinaApiRoute = (
  req: Parameters<typeof handler>[0],
  res: Parameters<typeof handler>[1]
) => {
  return handler(req, res);
};

export default tinaApiRoute;
