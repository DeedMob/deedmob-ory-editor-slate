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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
var Link_1 = __importDefault(require("@material-ui/icons/Link"));
var React = __importStar(require("react"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var helpers_1 = require("../../helpers");
var Plugin_1 = __importDefault(require("../Plugin"));
var node_1 = __importDefault(require("./node"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var slate_1 = require("slate");
var ory_editor_ui_1 = require("ory-editor-ui");
exports.A = 'LINK/LINK';
var LinkButton = /** @class */ (function (_super) {
    __extends(LinkButton, _super);
    function LinkButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            href: '',
            title: '',
            hadLinks: false,
            wasExpanded: false,
        };
        _this.onRef = function (component) {
            if (!component && true) {
                return null;
            }
            var e = component.querySelector('input');
            if (e) {
                e.focus();
            }
        };
        _this.onClick = function (e) {
            var _a = _this.props, editorState = _a.editorState, editor = _a.editor;
            e.preventDefault();
            var hasLinks = editorState.inlines.some(function (inline) { return inline.type === exports.A; });
            if (hasLinks) {
                editor.unwrapInline(exports.A);
            }
            else if (editorState.selection.isExpanded) {
                _this.setState({
                    open: true,
                    wasExpanded: editorState.selection.isExpanded,
                    href: '',
                    title: '',
                    hadLinks: hasLinks,
                });
            }
            else {
                _this.setState({
                    open: true,
                    wasExpanded: editorState.selection.isExpanded,
                    href: '',
                    title: '',
                    hadLinks: hasLinks,
                });
            }
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
            _this.props.editor.focus();
        };
        _this.handleSubmit = function () {
            _this.setState({ open: false });
            if (!_this.state.href) {
                _this.handleClose();
                return;
            }
            if (_this.state.wasExpanded) {
                _this.props.editor
                    .focus()
                    .wrapInline({
                    type: exports.A,
                    data: { href: _this.state.href },
                })
                    .moveToEnd();
                return;
            }
            if (!_this.state.title) {
                _this.handleClose();
                return;
            }
            _this.props.editor
                .insertText(_this.state.title)
                .moveFocusBackward(_this.state.title.length)
                .wrapInline({
                type: exports.A,
                data: { href: _this.state.href },
            })
                .moveToEnd()
                .focus();
        };
        _this.onHrefChange = function (e) {
            _this.setState({ href: e.target.value });
        };
        _this.onTitleChange = function (e) {
            _this.setState({ title: e.target.value });
        };
        return _this;
    }
    LinkButton.prototype.render = function () {
        var actions = (React.createElement(React.Fragment, null,
            React.createElement(Button_1.default, { variant: "text", color: "primary", onClick: this.handleClose }, "Cancel"),
            React.createElement(Button_1.default, { variant: "text", color: "primary", onClick: this.handleSubmit }, "Ok")));
        var editorState = this.props.editorState;
        var hasLinks = editorState.inlines.some(function (inline) { return inline.type === exports.A; });
        return (React.createElement(ory_editor_ui_1.ThemeProvider, null,
            React.createElement("span", null,
                React.createElement(helpers_1.ToolbarButton, { onClick: this.onClick, isActive: hasLinks, icon: React.createElement(Link_1.default, null) }),
                React.createElement("span", null,
                    React.createElement(Dialog_1.default, { className: "ory-prevent-blur", title: "Create a link", 
                        // modal={false}
                        open: this.state.open },
                        React.createElement(DialogTitle_1.default, { id: "confirmation-dialog-title" }, "Create a link"),
                        React.createElement(DialogContent_1.default, null,
                            this.state.wasExpanded ? null : (React.createElement("div", null,
                                React.createElement(TextField_1.default, { placeholder: "Link title", onChange: this.onTitleChange, value: this.state.title }))),
                            React.createElement("div", { ref: this.onRef },
                                React.createElement(TextField_1.default, { placeholder: "http://example.com/my/link.html", onChange: this.onHrefChange, value: this.state.href }))),
                        React.createElement(DialogActions_1.default, null, actions))))));
    };
    return LinkButton;
}(React.Component));
var LinkPlugin = /** @class */ (function (_super) {
    __extends(LinkPlugin, _super);
    function LinkPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'link';
        /*schema = {
          nodes: { [A]: Link },
        };*/
        _this.hoverButtons = [LinkButton];
        _this.toolbarButtons = [LinkButton];
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'a':
                    return {
                        object: 'inline',
                        type: exports.A,
                        nodes: next(el.childNodes),
                        data: slate_1.Data.create({
                            href: (el.attrs.find(function (_a) {
                                var name = _a.name;
                                return name === 'href';
                            }) || {
                                value: '',
                            }).value,
                        }),
                    };
                default:
                    return;
            }
        };
        _this.serialize = function (
        // tslint:disable-next-line:no-any
        object, 
        // tslint:disable-next-line:no-any
        children) {
            if (object.object !== 'inline') {
                return;
            }
            switch (object.type) {
                case exports.A:
                    return React.createElement("a", { href: object.data.get('href') }, children);
                default:
                    return;
            }
        };
        _this.renderNode = function (props, editor, next) {
            switch (props.node.type) {
                case exports.A: {
                    return React.createElement(node_1.default, __assign({}, props));
                }
                default:
                    return next();
            }
        };
        return _this;
    }
    return LinkPlugin;
}(Plugin_1.default));
exports.default = LinkPlugin;
