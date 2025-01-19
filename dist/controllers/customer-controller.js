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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerById = exports.getCustomers = exports.createCustomer = void 0;
const db_1 = require("../db/db");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, phone } = req.body;
        if (!email || !name || !phone) {
            return res.status(400).json({ message: "Email, name, and phone are required." });
        }
        const customer = yield db_1.db.customer.create({
            data: {
                email,
                name,
                phone,
            },
        });
        return res.status(201).json(customer);
    }
    catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({ message: "Failed to create customer." });
    }
});
exports.createCustomer = createCustomer;
const getCustomers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield db_1.db.customer.findMany();
        return res.status(200).json(customers);
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        return res.status(500).json({ message: "Failed to fetch customers." });
    }
});
exports.getCustomers = getCustomers;
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const customer = yield db_1.db.customer.findUnique({
            where: { id },
        });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found." });
        }
        return res.status(200).json(customer);
    }
    catch (error) {
        console.error("Error fetching customer by ID:", error);
        return res.status(500).json({ message: "Failed to fetch customer." });
    }
});
exports.getCustomerById = getCustomerById;
