/* eslint-disable import/no-anonymous-default-export */
import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { TinaCloudProvider } from "tinacms";



const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient: TinaCloudProvider,
});

//@ts-ignore
export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res);
};
