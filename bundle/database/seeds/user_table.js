"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../app/models/user.model");
const Faker = require("faker");
const seed = {
    environment: ['test', 'dev'],
    run: () => __awaiter(this, void 0, void 0, function* () {
        yield user_model_1.User.destroy({
            truncate: true
        });
        const ROW_COUNT = 10;
        for (let i = 0; i < ROW_COUNT; i++) {
            try {
                yield user_model_1.User.create({
                    username: Faker.internet.userName(),
                    password: Faker.internet.password()
                });
            }
            catch (err) {
                throw err;
            }
        }
    })
};
exports.seed = seed;
//# sourceMappingURL=user_table.js.map