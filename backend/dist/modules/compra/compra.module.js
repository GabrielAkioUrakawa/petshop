"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraModule = void 0;
const common_1 = require("@nestjs/common");
const compra_controller_1 = require("./compra.controller");
const compra_service_1 = require("./compra.service");
const compra_repository_1 = require("./compra.repository");
let CompraModule = class CompraModule {
};
exports.CompraModule = CompraModule;
exports.CompraModule = CompraModule = __decorate([
    (0, common_1.Module)({
        controllers: [compra_controller_1.CompraController],
        providers: [compra_service_1.CompraService, compra_repository_1.CompraRepository]
    })
], CompraModule);
//# sourceMappingURL=compra.module.js.map