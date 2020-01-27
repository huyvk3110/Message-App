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
const mongodb_1 = require("mongodb");
class DB {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                mongodb_1.MongoClient.connect(process.env.DB, function (error, client) {
                    if (error)
                        return rej(error);
                    console.log('Data base started');
                    DB.ins = client.db('message');
                    res(DB.ins);
                });
            });
        });
    }
}
exports.default = DB;
DB.ins = undefined;
//# sourceMappingURL=database.js.map