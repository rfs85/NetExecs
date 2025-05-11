import { onRequestGet as __api_modules_ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\modules.ts"
import { onRequestGet as __api_protocols_ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\protocols.ts"
import { onRequestGet as __api_saved_commands_ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\saved-commands.ts"
import { onRequestPost as __api_saved_commands_ts_onRequestPost } from "H:\\NetExecs2025\\functions\\api\\saved-commands.ts"
import { onRequestGet as __api_tutorials_ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\tutorials.ts"
import { onRequestGet as __api_modules__protocol__ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\modules-[protocol].ts"
import { onRequestGet as __api_modules__protocol___name__ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\modules-[protocol]-[name].ts"
import { onRequestDelete as __api_saved_commands__id__ts_onRequestDelete } from "H:\\NetExecs2025\\functions\\api\\saved-commands-[id].ts"
import { onRequestGet as __api_tutorials__slug__ts_onRequestGet } from "H:\\NetExecs2025\\functions\\api\\tutorials-[slug].ts"

export const routes = [
    {
      routePath: "/api/modules",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_modules_ts_onRequestGet],
    },
  {
      routePath: "/api/protocols",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_protocols_ts_onRequestGet],
    },
  {
      routePath: "/api/saved-commands",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_saved_commands_ts_onRequestGet],
    },
  {
      routePath: "/api/saved-commands",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_saved_commands_ts_onRequestPost],
    },
  {
      routePath: "/api/tutorials",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_tutorials_ts_onRequestGet],
    },
  {
      routePath: "/api/modules-:protocol",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_modules__protocol__ts_onRequestGet],
    },
  {
      routePath: "/api/modules-:protocol-:name",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_modules__protocol___name__ts_onRequestGet],
    },
  {
      routePath: "/api/saved-commands-:id",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_saved_commands__id__ts_onRequestDelete],
    },
  {
      routePath: "/api/tutorials-:slug",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_tutorials__slug__ts_onRequestGet],
    },
  ]