import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HTMLTags from 'html-tags';

import getModifiersFromProps from './utilities/getModifiersFromProps';
import renderModifiers from './utilities/renderModifiers';

/**
 * Construct a Synergy module
 */
export class Constructor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.config = (global.UI && global.UI.config) ? global.UI.config[this.props.name] : null;
        this.methods = this.config ? (this.config.methods || []) : [];

        this.methods.forEach(method => {
            this[method] = Synergy.modules[this.props.name].methods[method];
        });
    }
}

/**
 * Render a Synergy module
 *
 * @extends React.Component
 */
export default class Module extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.tag = this.props.tag || (HTMLTags.includes(this.props.name) ? this.props.name : 'div');
        this.propModifiers = renderModifiers(getModifiersFromProps(this.props, Synergy.CssClassProps));
        this.passedModifiers = renderModifiers(this.props.modifiers);
        this.modifiers = this.propModifiers + this.passedModifiers;
        this.classes = this.props.className ? ' ' + this.props.className : '';
        this.classNames = this.props.name + this.modifiers + this.classes;

        if (Synergy.modules) {
            // determine if any passed prop is a module - if so, add it to `classes`
            Object.entries(this.props).forEach(prop => {
                if (prop[0][0] === prop[0][0].toUpperCase()) {
                    if (Object.keys(Synergy.modules).includes(prop[0].toLowerCase())) {
                        const module = prop[0].toLowerCase();

                        let modifiers = '';

                        if (prop[1].constructor === Array) {
                            modifiers = '-' + prop[1].join('-');
                        } else if (typeof prop[1] === 'string') {
                            modifiers = '-' + prop[1];
                        }

                        this.classes = this.classes + ' ' + module + modifiers;
                    }
                }
            });

            if (Synergy.CssClassProps) Synergy.CssClassProps.forEach(prop => {
                if (Object.keys(this.props).includes(prop)) {
                    this.classNames = this.classNames + ' ' + prop
                }
            });
        }
    }

    /**
     * Content to pass to children components
     */
    getChildContext() {
        return { 
            module: this.props.name,
            config: (global.UI && global.UI.config) ? global.UI.config[this.props.name] : null
        };
    }

    /**
     */
    componentDidMount() {
        if (Synergy.modules[this.props.name] && Synergy.modules[this.props.name].methods) {
            if (Synergy.modules[this.props.name].methods.init) {
                Synergy.modules[this.props.name].methods.init(ReactDOM.findDOMNode(this), this.config);
            }
        }
    }

    /**
     * @param {*} properties 
     */
    getEventHandlers(properties) {
        let eventHandlers = {};

        for (let prop in properties) {
            if (Object.keys(window).includes(prop.toLowerCase())) {
                if (prop !== 'name') {
                    eventHandlers[prop] = properties[prop];
                }
            }
        }

        return eventHandlers;
    }

    /**
     * Render the module
     */
    render() {
        return (
            <this.tag
                id={this.props.id}
                className={this.classNames}
                data-module={this.props.name}
                href={this.props.href}
                
                {...this.getEventHandlers(this.props)}
            >
                {this.props.children}
            </this.tag>
        );
    }
}

Module.childContextTypes = {
    module: PropTypes.string,
    config: PropTypes.object
};