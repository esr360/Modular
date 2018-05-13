///****************************************************************
/// Synergy - https://github.com/esr360/Synergy
///
/// @author [@esr360](http://twitter.com/esr360)
///****************************************************************

export const global = {
    'module-namespace': '',
    'component-glue': '_',
    'modifier-glue': '-'
}

// Vendor
//*****************************************************************

export { default as deepextend } from 'deep-extend';
export { default as getChildrenWithoutSelector } from 'get-children-without-parent-selector';

// Tools & Utilities
//*****************************************************************

// Tools
import { 
    component, 
    modifier 
} from './tools';

// Utilities
import {
    getBlockName,
    getComponents,
    getDomNodes,
    getGlue,
    getModifiers,
    getModuleName,
    isValidSelector,
    parents,
    stripModifiers,
    getOptions,
    setDomNodeAttributes
} from './utilities';

export {
    getBlockName,
    getComponents,
    getDomNodes,
    getGlue,
    getModifiers,
    getModuleName,
    isValidSelector,
    stripModifiers,
    component,
    modifier
};

/**
 * Synergy Module
 * 
 * @author @esr360 <http://twitter.com/esr360>
 * 
 * @module Synergy
 * @access public
 * 
 * @param {(String|HTMLElement|NodeList)} els - Synergy selector to match elements
 * @param {Function} [callback] - function to call on matched elements
 * @param {Object} [config] - config to use when calling the function
 * @param {Object} [custom] - custom config to use in callback
 * @param {Object} [parser] - custom parser to use for configuration
 */
export default function Synergy(els, callback, config, custom, parser) {

    let methods = {};

    const componentGlue = getGlue('component', custom);
    const modifierGlue  = getGlue('modifier', custom);
    const module        = getModuleName(els, config);
    const domNodes      = getDomNodes(els, module, modifierGlue);
    const components    = getComponents(domNodes, module, componentGlue);
    const modifiers     = getModifiers(domNodes, module, modifierGlue);
    const options       = getOptions({config, parser, custom});

    const isModuleElement = () => {
        if (domNodes instanceof NodeList) {
            domNodes.forEach(node => {
                if (parents(node, '[data-module]').length) {
                    return false;
                }
            });

            return true;
        }
        if (domNodes instanceof HTMLElement && !parents(domNodes, '[data-module]').length) {
            return true;
        }
        if (typeof els === 'string' && els.match(/^[a-zA-Z]*$/)) {
            return true;
        }

        return false;
    }

    if (isModuleElement()) {
        setDomNodeAttributes({ domNodes, module });

        // @TODO create utility function for this
        if (window.UI && window.UI.config) {
            window.UI.config[module] = window.UI.config[module] || {};

            if (!window.UI.config[module].initialised) {
                window.UI.config[module] = Object.assign(window.UI.config[module], options, { 
                    initialised: true 
                });
            }
        }
    }

    // Elements found by the Synergy query
    methods.query = domNodes;

    methods.modifier = (query, operator, target = domNodes) => modifier({
        glue: modifierGlue,
        target,
        module,
        modifiers,
        query,
        operator
    });

    methods.component = (query, operator, target = domNodes) => component({
        target,
        module,
        components,
        query,
        operator,
        componentGlue,
        modifierGlue
    });

    if (callback && typeof domNodes !== 'string') {
        if (domNodes instanceof NodeList) {
            domNodes.forEach(el => callback(el, options, methods));
        } else {
            return callback(domNodes, options, methods);
        }
    }

    return methods;
}

if (typeof window !== 'undefined' && !window.Synergy) {
    window.Synergy = Synergy;
}