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
var styles_1 = require("@material-ui/core/styles");
var React = __importStar(require("react"));
var react_portal_1 = require("react-portal");
var is_hotkey_1 = __importDefault(require("is-hotkey"));
var slate_react_1 = require("slate-react");
var ory_editor_ui_1 = require("ory-editor-ui");
var const_1 = require("../const");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var hooks_1 = require("../hooks");
var theme = styles_1.createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    },
});
var Slate = /** @class */ (function (_super) {
    __extends(Slate, _super);
    function Slate(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            _this.updateToolbar();
        };
        _this.flushState = function () {
            if (_this.state.editorState) {
                _this.props.onChange({ editorState: _this.state.editorState });
            }
        };
        _this.onStateChange = function (_a) {
            var value = _a.value;
            _this.setState({
                editorState: value,
            }, function () {
                _this.updateToolbar();
            });
            _this.flushStateDebounced();
        };
        _this.updateToolbar = function () {
            var editorState = _this.getState();
            var toolbar = _this.toolbar.current;
            if (!toolbar ||
                editorState.selection.isBlurred ||
                editorState.selection.isCollapsed) {
                return;
            }
            var s = window.getSelection();
            var oRange = s.getRangeAt(0); // get the text range
            var oRect = oRange.getBoundingClientRect();
            if (oRect) {
                var left = oRect.left, top_1 = oRect.top, width = oRect.width;
                toolbar.style.opacity = '1';
                toolbar.style.top = top_1 + window.scrollY - toolbar.offsetHeight + "px";
                toolbar.style.left = left +
                    window.scrollX -
                    toolbar.offsetWidth / 2 +
                    width / 2 + "px";
            }
        };
        _this.onPaste = function (e, editor, next) {
            var transfer = slate_react_1.getEventTransfer(e);
            if (transfer.type !== 'html') {
                return next();
            }
            // tslint:disable-next-line:no-any
            var document = hooks_1.html.deserialize(transfer.html).document;
            return editor.insertFragment(document);
        };
        _this.onKeyDown = function (e, editor, next) {
            // we need to prevent slate from handling undo and redo
            if (is_hotkey_1.default(['mod+z', 'mod+y'], e)) {
                _this.setState({ editorState: undefined });
                return true;
            }
            if (is_hotkey_1.default('shift+enter', e)) {
                e.preventDefault();
                editor.insertText('\n');
                return true;
            }
            return next();
        };
        _this.state = {};
        _this.editor = React.createRef();
        _this.toolbar = React.createRef();
        _this.flushStateDebounced = lodash_debounce_1.default(_this.flushState, 1000, {
            leading: true,
            trailing: true,
            maxWait: 10000,
        });
        return _this;
    }
    Slate.prototype.getState = function () {
        return this.state.editorState !== undefined
            ? this.state.editorState
            : this.props.state.editorState;
    };
    Slate.prototype.render = function () {
        var _a = this.props, focused = _a.focused, readOnly = _a.readOnly, plugins = _a.plugins, HoverButtons = _a.HoverButtons, ToolbarButtons = _a.ToolbarButtons;
        var editorState = this.getState();
        var isOpened = editorState.selection.isExpanded && editorState.selection.isFocused;
        return (React.createElement("div", null,
            focused && (React.createElement(react_portal_1.Portal, null,
                React.createElement(ory_editor_ui_1.ThemeProvider, { theme: theme },
                    React.createElement("div", { className: 'ory-prevent-blur ory-plugins-content-slate-inline-toolbar ' +
                            (isOpened
                                ? ''
                                : 'ory-plugins-content-slate-inline-toolbar--hidden'), style: { padding: 0 }, ref: this.toolbar },
                        React.createElement(HoverButtons, { editorState: editorState, editor: this.editor.current }))))),
            React.createElement(slate_react_1.Editor, { ref: this.editor, onChange: this.onStateChange, onKeyDown: this.onKeyDown, readOnly: Boolean(readOnly), className: "ory-plugins-content-slate-container", 
                // onBlur={this.onBlur}
                // onFocus={this.onFocus}
                value: editorState, plugins: plugins, onPaste: this.onPaste, placeholder: const_1.placeholder }),
            readOnly ? null : (React.createElement(ory_editor_ui_1.BottomToolbar, { open: focused },
                React.createElement(ToolbarButtons, { editor: this.editor.current, editorState: editorState })))));
    };
    return Slate;
}(React.Component));
exports.default = Slate;
