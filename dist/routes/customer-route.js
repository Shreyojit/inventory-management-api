"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_controller_1 = require("../controllers/customer-controller");
const express_1 = __importDefault(require("express"));
const customerRouter = express_1.default.Router();
customerRouter.post("/", customer_controller_1.createCustomer);
customerRouter.get("/", customer_controller_1.getCustomers);
customerRouter.get("/:id", customer_controller_1.getCustomerById);
exports.default = customerRouter;
