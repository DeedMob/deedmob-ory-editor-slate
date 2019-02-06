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
/* eslint-disable prefer-reflect */
var React = __importStar(require("react"));
var FormatAlignLeft_1 = __importDefault(require("@material-ui/icons/FormatAlignLeft"));
var FormatAlignCenter_1 = __importDefault(require("@material-ui/icons/FormatAlignCenter"));
var FormatAlignRight_1 = __importDefault(require("@material-ui/icons/FormatAlignRight"));
var FormatAlignJustify_1 = __importDefault(require("@material-ui/icons/FormatAlignJustify"));
var helpers_1 = require("../helpers");
var Plugin_1 = __importDefault(require("./Plugin"));
var createButton = function (align, icon, type) { return function (_a) {
    var editorState = _a.editorState, editor = _a.editor;
    var onClick = function (e) {
        e.preventDefault();
        var _isActive = editorState.blocks.some(function (block) { return block.data.get('align') === align; });
        editor.setBlocks({
            data: { align: _isActive ? null : align },
            type: type,
        });
    };
    var isActive = editorState.blocks.some(function (block) { return block.data.get('align') === align; });
    return React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
}; };
var AlignmentPlugin = /** @class */ (function (_super) {
    __extends(AlignmentPlugin, _super);
    function AlignmentPlugin(props) {
        var _this = _super.call(this) || this;
        _this.name = 'alignment';
        _this.toolbarButtons = [
            createButton('left', React.createElement(FormatAlignLeft_1.default, null), props.DEFAULT_NODE),
            createButton('center', React.createElement(FormatAlignCenter_1.default, null), props.DEFAULT_NODE),
            createButton('right', React.createElement(FormatAlignRight_1.default, null), props.DEFAULT_NODE),
            createButton('justify', React.createElement(FormatAlignJustify_1.default, null), props.DEFAULT_NODE),
        ];
        return _this;
    }
    return AlignmentPlugin;
}(Plugin_1.default));
exports.default = AlignmentPlugin;
