"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluginButtonProps = /** @class */ (function () {
    function PluginButtonProps() {
    }
    return PluginButtonProps;
}());
exports.PluginButtonProps = PluginButtonProps;
/**
 * @class this is the base class for slate plugins
 */
var Plugin = /** @class */ (function () {
    function Plugin() {
        /**
         * @member the slate plugins added to the editor
         */
        // tslint:disable-next-line:no-any
        this.plugins = [];
    }
    return Plugin;
}());
exports.default = Plugin;
