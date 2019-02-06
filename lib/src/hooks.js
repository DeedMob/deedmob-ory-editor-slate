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
var immutable_1 = require("immutable");
var head_1 = __importDefault(require("ramda/src/head"));
var map_1 = __importDefault(require("ramda/src/map"));
var path_1 = __importDefault(require("ramda/src/path"));
var reduce_1 = __importDefault(require("ramda/src/reduce"));
var tail_1 = __importDefault(require("ramda/src/tail"));
var react_1 = __importDefault(require("react"));
var alignment_1 = __importDefault(require("./plugins/alignment"));
var blockquote_1 = __importDefault(require("./plugins/blockquote"));
var index_1 = __importDefault(require("./plugins/code/index"));
var emphasize_1 = __importDefault(require("./plugins/emphasize"));
var headings_1 = __importDefault(require("./plugins/headings"));
var index_2 = __importDefault(require("./plugins/link/index"));
var lists_1 = __importDefault(require("./plugins/lists"));
var index_3 = __importStar(require("./plugins/paragraph/index"));
// FIXME #126
var slate_1 = require("slate");
var slate_html_serializer_1 = __importDefault(require("slate-html-serializer"));
var slate_plain_serializer_1 = __importDefault(require("slate-plain-serializer"));
var DEFAULT_NODE = index_3.P;
exports.defaultPlugins = [
    new index_3.default(),
    new emphasize_1.default(),
    new headings_1.default({ DEFAULT_NODE: DEFAULT_NODE }),
    new index_2.default(),
    new index_1.default({ DEFAULT_NODE: DEFAULT_NODE }),
    new lists_1.default({ DEFAULT_NODE: DEFAULT_NODE }),
    new blockquote_1.default({ DEFAULT_NODE: DEFAULT_NODE }),
    new alignment_1.default({ DEFAULT_NODE: DEFAULT_NODE })
];
exports.lineBreakSerializer = {
    // tslint:disable-next-line:no-any
    deserialize: function (el) {
        if (el.tagName.toLowerCase() === "br") {
            return { object: "text", text: "\n" };
        }
        if (el.nodeName === "#text") {
            if (el.value && el.value.match(/<!--.*?-->/)) {
                return;
            }
            return {
                object: "text",
                leaves: [
                    {
                        object: "leaf",
                        text: el.value
                    }
                ]
            };
        }
    },
    // tslint:disable-next-line:no-any
    serialize: function (object, children) {
        if (object.type === "text" || children === "\n") {
            return react_1.default.createElement("br", null);
        }
    }
};
exports.html = new slate_html_serializer_1.default({
    rules: exports.defaultPlugins.concat([exports.lineBreakSerializer])
});
exports.createInitialState = function () { return ({
    editorState: slate_1.Value.fromJSON({
        document: {
            nodes: [
                {
                    object: "block",
                    type: index_3.P,
                    nodes: [
                        {
                            object: "text",
                            leaves: [
                                {
                                    text: ""
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
}); };
exports.unserialize = function (_a) {
    var importFromHtml = _a.importFromHtml, serialized = _a.serialized, editorState = _a.editorState;
    if (serialized) {
        // tslint:disable-next-line:no-any
        return { editorState: slate_1.Value.fromJSON(serialized) };
    }
    else if (importFromHtml) {
        return { editorState: exports.html.deserialize(importFromHtml) };
    }
    else if (editorState) {
        return { editorState: editorState };
    }
    return exports.createInitialState();
};
// tslint:disable-next-line:no-any
exports.serialize = function (_a) {
    var editorState = _a.editorState;
    return ({
        // tslint:disable-next-line:no-any
        serialized: editorState.toJSON(editorState)
    });
};
exports.merge = function (states) {
    var nodes = map_1.default(path_1.default(["editorState", "document", "nodes"]), states);
    var mergedNodes = reduce_1.default(
    // tslint:disable-next-line:no-any
    function (a, b) { return a.concat(b); }, head_1.default(nodes), tail_1.default(nodes));
    var mergedDocument = slate_1.Document.create({ nodes: mergedNodes });
    var mergedEditorState = slate_1.Value.create({ document: mergedDocument });
    return { editorState: mergedEditorState };
};
exports.split = function (state) {
    var nodes = path_1.default(["editorState", "document", "nodes"], state);
    return nodes
        ? nodes.toArray().map(function (node) {
            var splittedDocument = slate_1.Document.create({ nodes: immutable_1.List([node]) });
            var splittedEditorState = slate_1.Value.create({
                document: splittedDocument
            });
            return { editorState: splittedEditorState };
        })
        : [];
};
// const position = (): {
//   top: ?number,
//   right: ?number,
//   left: ?number,
//   bottom: ?number
// } => {
//   if (window && window.getSelection) {
//     const selection = window.getSelection()
//     if (!selection.rangeCount) {
//       return {
//         top: null,
//         right: null,
//         left: null,
//         bottom: null,
//       }
//     }
//
//     return selection.getRangeAt(0).getBoundingClientRect()
//   }
//
//   if (window.document.selection) {
//     return window.document.selection
//       .createRange()
//       .getBoundingClientRect()
//   }
//
//   return {
//     top: null,
//     right: null,
//     left: null,
//     bottom: null,
//   }
// }
// if editor state is empty, remove cell when backspace or delete was pressed.
exports.handleRemoveHotKey = function (_, _a) {
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        return slate_plain_serializer_1.default.serialize(editorState).length < 1 ? resolve() : reject();
    });
};
var windowSelectionWaitTime = 1;
exports.handleFocusPreviousHotKey = function (e, _a) {
    // const isArrowUp = e.keyCode === 38
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        if (editorState.selection.isExpanded) {
            return reject();
        }
        setTimeout(function () {
            // if (isArrowUp && next.top === current.top) {
            //   return resolve()
            // } else
            if (editorState.selection.isCollapsed &&
                editorState.selection.anchor.isAtStartOfNode(editorState.document.nodes.first())) {
                return resolve();
            }
            reject();
        }, windowSelectionWaitTime);
    });
};
exports.handleFocusNextHotKey = function (e, _a) {
    // const isArrowDown = e.keyCode === 40
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        if (editorState.selection.isExpanded) {
            return reject();
        }
        setTimeout(function () {
            // if (isArrowDown && next.top === current.top) {
            //   return resolve()
            // } else
            if (editorState.selection.isCollapsed &&
                editorState.selection.anchor.isAtEndOfNode(editorState.document.nodes.last())) {
                return resolve();
            }
            reject();
        }, windowSelectionWaitTime);
    });
};
