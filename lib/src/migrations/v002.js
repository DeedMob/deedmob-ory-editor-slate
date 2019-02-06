"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("ory-editor-core/lib/service/plugin/classes");
var deep_rename_keys_1 = __importDefault(require("deep-rename-keys"));
var migration = new classes_1.Migration({
    toVersion: '0.0.2',
    fromVersionRange: '^0.0.1',
    migrate: function (state) {
        // wrap with document
        state = __assign({}, state, (state.serialized
            ? { serialized: { document: state.serialized } }
            : {}));
        // rename keys
        state = deep_rename_keys_1.default(state, function (key) {
            switch (key) {
                case 'kind':
                    return 'object';
                case 'ranges':
                    return 'leaves';
                default:
                    return key;
            }
        });
        return state;
    },
});
exports.default = migration;
