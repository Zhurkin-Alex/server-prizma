"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSitesSchema = exports.siteSchema = void 0;
const zod_1 = require("zod");
exports.siteSchema = zod_1.z.object({
    name: zod_1.z.string(),
    template: zod_1.z.string(),
    rss: zod_1.z.string().url(),
    logo: zod_1.z.string()
});
exports.createSitesSchema = zod_1.z.array(exports.siteSchema);
