"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var place_router_1 = __importDefault(require("./routers/place.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var near_router_1 = __importDefault(require("./routers/near.router"));
var database_config_1 = require("./configs/database.config");
(0, database_config_1.dbconncet)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200", "https://packyourbags-swart.vercel.app"]
}));
app.use("/api/places", place_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api", near_router_1.default);
// (app as any)._router.stack.forEach((layer: any) => {
//     if (layer.route) {
//       console.log(layer.route.path);
//     }
//   });
app.get("/", function (req, res) {
    res.send("Welcome to the backend server of packyourbags");
});
var port = 5000;
app.listen(port, function () {
    console.log("Website served on http://localhost:" + port);
});
