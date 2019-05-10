import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUnderline } from '@fortawesome/fontawesome-free-solid';
import { toggleMark } from 'prosemirror-commands';
import { markActive } from '../util';
var Underline = /** @class */ (function () {
    function Underline() {
    }
    Object.defineProperty(Underline.prototype, "name", {
        get: function () {
            return 'underline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "schema", {
        get: function () {
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'u' },
                    { style: 'text-decoration=underline' }
                ],
                toDOM: function () { return ['span', {
                        style: 'text-decoration:underline'
                    }]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faUnderline });
        },
        enumerable: true,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return markActive(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}());
export default Underline;
//# sourceMappingURL=underline.js.map