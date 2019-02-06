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
var LooksOne_1 = __importDefault(require("@material-ui/icons/LooksOne"));
var LooksTwo_1 = __importDefault(require("@material-ui/icons/LooksTwo"));
var Looks3_1 = __importDefault(require("@material-ui/icons/Looks3"));
var Looks4_1 = __importDefault(require("@material-ui/icons/Looks4"));
var Looks5_1 = __importDefault(require("@material-ui/icons/Looks5"));
var Looks6_1 = __importDefault(require("@material-ui/icons/Looks6"));
// import { Data } from 'slate'
var helpers_1 = require("../helpers");
var Plugin_1 = __importDefault(require("./Plugin"));
exports.H1 = 'HEADINGS/HEADING-ONE';
exports.H2 = 'HEADINGS/HEADING-TWO';
exports.H3 = 'HEADINGS/HEADING-THREE';
exports.H4 = 'HEADINGS/HEADING-FOUR';
exports.H5 = 'HEADINGS/HEADING-FIVE';
exports.H6 = 'HEADINGS/HEADING-SIX';
// tslint:disable-next-line:no-any
var createNode = function (type, el, next) { return ({
    object: 'block',
    type: type,
    // data: Data.create({ style: el.attribs.style }),
    nodes: next(el.childNodes),
}); };
var HeadingsPlugin = /** @class */ (function (_super) {
    __extends(HeadingsPlugin, _super);
    /*schema = {
      nodes: {
        [H1]: makeTagNode('h1'),
        [H2]: makeTagNode('h2'),
        [H3]: makeTagNode('h3'),
        [H4]: makeTagNode('h4'),
        [H5]: makeTagNode('h5'),
        [H6]: makeTagNode('h6'),
      },
    };*/
    function HeadingsPlugin(props) {
        var _this = _super.call(this) || this;
        _this.name = 'headings';
        _this.createButton = function (type, icon) { return function (_a) {
            var editorState = _a.editorState, editor = _a.editor;
            var onClick = function (e) {
                e.preventDefault();
                var _isActive = editorState.blocks.some(function (block) { return block.type === type; });
                editor
                    .setBlocks(_isActive ? _this.DEFAULT_NODE : type);
            };
            var isActive = editorState.blocks.some(function (block) { return block.type === type; });
            return React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
        }; };
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'h1':
                    return createNode(exports.H1, el, next);
                case 'h2':
                    return createNode(exports.H2, el, next);
                case 'h3':
                    return createNode(exports.H3, el, next);
                case 'h4':
                    return createNode(exports.H4, el, next);
                case 'h5':
                    return createNode(exports.H5, el, next);
                case 'h6':
                    return createNode(exports.H6, el, next);
                default:
                    return;
            }
        };
        _this.serialize = function (
        // tslint:disable-next-line:no-any
        object, 
        // tslint:disable-next-line:no-any
        children) {
            if (object.object !== 'block') {
                return;
            }
            var style = { textAlign: object.data.get('align') };
            switch (object.type) {
                case exports.H1:
                    return React.createElement("h1", { style: style }, children);
                case exports.H2:
                    return React.createElement("h2", { style: style }, children);
                case exports.H3:
                    return React.createElement("h3", { style: style }, children);
                case exports.H4:
                    return React.createElement("h4", { style: style }, children);
                case exports.H5:
                    return React.createElement("h5", { style: style }, children);
                case exports.H6:
                    return React.createElement("h6", { style: style }, children);
                default:
                    return;
            }
        };
        _this.renderNode = function (props, editor, next) {
            var children = props.children;
            var style = { textAlign: props.node.data.get('align') };
            switch (props.node.type) {
                case exports.H1:
                    return React.createElement("h1", { style: style }, children);
                case exports.H2:
                    return React.createElement("h2", { style: style }, children);
                case exports.H3:
                    return React.createElement("h3", { style: style }, children);
                case exports.H4:
                    return React.createElement("h4", { style: style }, children);
                case exports.H5:
                    return React.createElement("h5", { style: style }, children);
                case exports.H6:
                    return React.createElement("h6", { style: style }, children);
                default:
                    return next();
            }
        };
        _this.DEFAULT_NODE = props.DEFAULT_NODE;
        _this.toolbarButtons = [
            _this.createButton(exports.H1, React.createElement(LooksOne_1.default, null)),
            _this.createButton(exports.H2, React.createElement(LooksTwo_1.default, null)),
            _this.createButton(exports.H3, React.createElement(Looks3_1.default, null)),
            _this.createButton(exports.H4, React.createElement(Looks4_1.default, null)),
            _this.createButton(exports.H5, React.createElement(Looks5_1.default, null)),
            _this.createButton(exports.H6, React.createElement(Looks6_1.default, null)),
        ];
        return _this;
    }
    return HeadingsPlugin;
}(Plugin_1.default));
exports.default = HeadingsPlugin;
