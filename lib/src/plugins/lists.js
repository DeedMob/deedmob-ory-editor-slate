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
var List_1 = __importDefault(require("@material-ui/icons/List"));
var FormatListNumbered_1 = __importDefault(require("@material-ui/icons/FormatListNumbered"));
var FormatIndentIncrease_1 = __importDefault(require("@material-ui/icons/FormatIndentIncrease"));
var FormatIndentDecrease_1 = __importDefault(require("@material-ui/icons/FormatIndentDecrease"));
var slate_edit_list_1 = __importDefault(require("@guestbell/slate-edit-list"));
var helpers_1 = require("../helpers");
var Plugin_1 = __importDefault(require("./Plugin"));
exports.UL = 'LISTS/UNORDERED-LIST';
exports.OL = 'LISTS/ORDERED-LIST';
exports.LI = 'LISTS/LIST-ITEM';
var INCREASE_INDENT = 'INCREASE_INDENT';
var DECREASE_INDENT = 'DECREASE_INDENT';
var ListsPlugin = /** @class */ (function (_super) {
    __extends(ListsPlugin, _super);
    /*schema = {
      nodes: {
        [UL]: makeTagNode('ul'),
        [OL]: makeTagNode('ol'),
        [LI]: makeTagNode('li'),
      },
    };*/
    function ListsPlugin(props) {
        var _this = _super.call(this) || this;
        _this.name = 'lists';
        _this.createButton = function (type, icon) { return function (_a) {
            var editorState = _a.editorState, editor = _a.editor;
            var _b = _this.plugin.changes, wrapInList = _b.wrapInList, unwrapList = _b.unwrapList, increaseItemDepth = _b.increaseItemDepth, decreaseItemDepth = _b.decreaseItemDepth;
            var onClick = function (e) {
                e.preventDefault();
                if (type !== exports.UL && type !== exports.OL) {
                    if (type === INCREASE_INDENT) {
                        increaseItemDepth(editor);
                    }
                    else {
                        decreaseItemDepth(editor);
                    }
                }
                else {
                    var _inList = _this.plugin.utils.isSelectionInList(editorState);
                    if (_inList) {
                        unwrapList(editor);
                    }
                    else {
                        wrapInList(editor, type);
                    }
                }
            };
            var inList = _this.plugin.utils.isSelectionInList(editorState);
            var isType = editorState.blocks.some(function (block) {
                return !!editorState.document.getClosest(block.key, function (parent) { return parent.type === type; });
            });
            var isIncreaseDecrease = type === INCREASE_INDENT || type === DECREASE_INDENT;
            var previousItem = _this.plugin.utils.getPreviousItem(editorState);
            var currentItem = _this.plugin.utils.getCurrentItem(editorState);
            var itemDepth = _this.plugin.utils.getItemDepth(editorState);
            var canIncreaseIndent = previousItem && currentItem && isIncreaseDecrease;
            var canDecreaseIndent = itemDepth > 1 && currentItem && isIncreaseDecrease;
            var increaseDecreaseDisabled = type === INCREASE_INDENT ? !canIncreaseIndent : !canDecreaseIndent;
            return (React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: inList && isType, icon: icon, disabled: isIncreaseDecrease && increaseDecreaseDisabled }));
        }; };
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'ul':
                    return {
                        object: 'block',
                        type: exports.UL,
                        nodes: next(el.childNodes),
                    };
                case 'li':
                    return {
                        object: 'block',
                        type: exports.LI,
                        nodes: next(el.childNodes),
                    };
                case 'ol':
                    return {
                        object: 'block',
                        type: exports.OL,
                        nodes: next(el.childNodes),
                    };
                default:
                    return undefined;
            }
        };
        // tslint:disable-next-line:no-any
        _this.serialize = function (object, children) {
            if (object.object !== 'block') {
                return;
            }
            switch (object.type) {
                case exports.UL:
                    return React.createElement("ul", null, children);
                case exports.LI:
                    return React.createElement("li", null, children);
                case exports.OL:
                    return React.createElement("ol", null, children);
                default:
                    return undefined;
            }
        };
        _this.renderNode = function (props, editor, next) {
            var children = props.children, attributes = props.attributes;
            switch (props.node.type) {
                case exports.UL:
                    return React.createElement("ul", __assign({}, attributes), children);
                case exports.LI:
                    return React.createElement("li", __assign({}, attributes), children);
                case exports.OL:
                    return React.createElement("ol", __assign({}, attributes), children);
                default:
                    return next();
            }
        };
        _this.DEFAULT_NODE = props.DEFAULT_NODE;
        _this.plugin = slate_edit_list_1.default({
            types: [exports.UL, exports.OL],
            typeItem: exports.LI,
            typeDefault: props.DEFAULT_NODE,
        });
        _this.plugins = [_this.plugin];
        _this.toolbarButtons = [
            _this.createButton(exports.UL, React.createElement(List_1.default, null)),
            _this.createButton(exports.OL, React.createElement(FormatListNumbered_1.default, null)),
            _this.createButton(INCREASE_INDENT, React.createElement(FormatIndentIncrease_1.default, null)),
            _this.createButton(DECREASE_INDENT, React.createElement(FormatIndentDecrease_1.default, null)),
        ];
        return _this;
    }
    return ListsPlugin;
}(Plugin_1.default));
exports.default = ListsPlugin;
