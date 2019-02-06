"use strict";
/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-reflect, default-case, react/display-name */
var React = __importStar(require("react"));
var FormatBold_1 = __importDefault(require("@material-ui/icons/FormatBold"));
var FormatItalic_1 = __importDefault(require("@material-ui/icons/FormatItalic"));
var FormatUnderlined_1 = __importDefault(require("@material-ui/icons/FormatUnderlined"));
var helpers_1 = require("../helpers");
var Plugin_1 = __importDefault(require("./Plugin"));
var is_hotkey_1 = __importDefault(require("is-hotkey"));
exports.STRONG = 'EMPHASIZE/STRONG';
exports.EM = 'EMPHASIZE/EM';
exports.U = 'EMPHASIZE/U';
// eslint-disable-next-line react/display-name
var createButton = function (type, icon) { return function (_a) {
    var editor = _a.editor, editorState = _a.editorState;
    var onClick = function (e) {
        e.preventDefault();
        editor.toggleMark(type);
    };
    var isActive = editorState && editorState.activeMarks.some(function (mark) { return mark.type === type; });
    return React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
}; };
var EmphasizePlugin = /** @class */ (function (_super) {
    __extends(EmphasizePlugin, _super);
    function EmphasizePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'emphasize';
        /*schema = {
          marks: {
            [STRONG]: makeTagMark('strong'),
            [EM]: makeTagMark('em'),
            [U]: makeTagMark('u'),
          },
        };*/
        _this.hoverButtons = [
            createButton(exports.STRONG, React.createElement(FormatBold_1.default, null)),
            createButton(exports.EM, React.createElement(FormatItalic_1.default, null)),
            createButton(exports.U, React.createElement(FormatUnderlined_1.default, null)),
        ];
        _this.onKeyDown = function (e, editor, next) {
            var mark;
            if (is_hotkey_1.default('mod+b', e)) {
                mark = exports.STRONG;
            }
            if (is_hotkey_1.default('mod+i', e)) {
                mark = exports.EM;
            }
            if (is_hotkey_1.default('mod+u', e)) {
                mark = exports.U;
            }
            if (mark) {
                editor.toggleMark(mark);
                e.preventDefault();
                return true;
            }
            else {
                return next();
            }
        };
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'strong':
                case 'b':
                    return {
                        object: 'mark',
                        type: exports.STRONG,
                        nodes: next(el.childNodes),
                    };
                case 'em':
                case 'i':
                    return {
                        object: 'mark',
                        type: exports.EM,
                        nodes: next(el.childNodes),
                    };
                case 'u':
                    return {
                        object: 'mark',
                        type: exports.U,
                        nodes: next(el.childNodes),
                    };
                default:
                    return;
            }
        };
        // tslint:disable-next-line:no-any
        _this.serialize = function (object, children) {
            if (object.object !== 'mark') {
                return;
            }
            switch (object.type) {
                case exports.STRONG:
                    return React.createElement("strong", null, children);
                case exports.EM:
                    return React.createElement("em", null, children);
                case exports.U:
                    return React.createElement("u", null, children);
                default:
                    return;
            }
        };
        _this.renderMark = function (props, editor, next) {
            var children = props.children, mark = props.mark, attributes = props.attributes;
            switch (mark.type) {
                case exports.STRONG:
                    return React.createElement("strong", __assign({}, attributes), children);
                case exports.EM:
                    return React.createElement("em", __assign({}, attributes), children);
                case exports.U:
                    return React.createElement("u", __assign({}, attributes), children);
                default:
                    return next();
            }
        };
        return _this;
    }
    return EmphasizePlugin;
}(Plugin_1.default));
exports.default = EmphasizePlugin;
