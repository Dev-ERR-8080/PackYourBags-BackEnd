"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var express_1 = require("express");
var places_model_1 = require("../models/places.model");
var router = (0, express_1.Router)();
// 📍 Find Nearest Travel Destination within Budget & Filters
router.get("/near", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lat, lon, budgetParam, budget, category, minRating, query, nearestPlace, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                lat = parseFloat(String(req.query.lat));
                lon = parseFloat(String(req.query.lon));
                budgetParam = parseInt(String(req.query.budget));
                budget = budgetParam !== undefined && !isNaN(Number(budgetParam)) ? parseInt(String(budgetParam)) : null;
                category = req.query.category ? String(req.query.category) : undefined;
                minRating = req.query.minRating ? parseFloat(String(req.query.minRating)) : undefined;
                // || isNaN(budget)
                if (isNaN(lat) || isNaN(lon)) {
                    res.status(400).json({ error: "Invalid or missing Lat, Lon." });
                    return [2 /*return*/];
                }
                query = {
                    location: {
                        $near: {
                            $geometry: { type: "Point", coordinates: [lon, lat] },
                            $maxDistance: 2000000, // 2000 km max range
                        },
                    }
                };
                if (budget != null) {
                    query.$or = [
                        { "price_range.budget": { $lte: budget } },
                        { "price_range.standard": { $lte: budget } },
                        { "price_range.luxury": { $lte: budget } }
                    ];
                }
                if (category) {
                    query.category = category;
                }
                if (minRating !== undefined) {
                    query["ratings.average"] = { $gte: minRating };
                }
                console.log("Final Query:", JSON.stringify(query, null, 2));
                return [4 /*yield*/, places_model_1.PlacesModel.find(query).sort({ "ratings.average": -1 }).limit(3)];
            case 1:
                nearestPlace = _a.sent();
                if (!nearestPlace.length) {
                    res.status(404).json({ message: "No suitable destination found within Budget." });
                    return [2 /*return*/];
                }
                res.json(nearestPlace[0]);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
