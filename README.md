[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/esr360/Synergy/blob/master/LICENSE)
[![GitHub license](https://api.travis-ci.org/esr360/Synergy.svg)](https://travis-ci.org/esr360/Synergy)
[![Bower version](https://badge.fury.io/bo/Synergy.svg)](https://badge.fury.io/bo/Synergy)
[![npm version](https://badge.fury.io/js/Synergy.svg)](https://badge.fury.io/js/Synergy)
[![npm version](https://img.shields.io/npm/dm/synergy.svg)](https://badge.fury.io/js/Synergy)

[![Synergy](https://raw.githubusercontent.com/esr360/Synergy/gh-pages/logo-small.png "Synergy Logo")](https://github.com/esr360/Synergy)

#### Table of Contents

* [Overview](#overview)
* [Installation](#installation)
* [Documentation - Sass](#documentation---sass)
* [Documentation - JS](#documentation---js)
* [Creating a Theme](#creating-a-theme)
* [Changelog](#changelog)

## Overview

> A front-end framework for creating modular, configurable and scalable UI components.

Synergy is predominantly a Sass framework but also has an optional JS add-on.

[View SassDoc Documentation](http://esr360.github.io/Synergy/docs/sass)

#### Why Use Synergy?

For three reasons:

##### 1. Smarter Selectors

Using BEM ([example source](http://eu.battle.net/heroes/en/)):

```
panels-list__item panels-list__item--blog panels-list__item--featured panels-list__item--no-summary panels-list__item--image
```

Using Synergy:

```
panelsList_item-blog-featured-noSummary-image
```

Using Synergy with original BEM syntax:

```
panels-list__item--blog--featured--no-summary--image
```

Synergy takes advantage of CSS attribute wildcard selectors. By looking for classes which contain certain strings as opposed to looking for specific classes, your markup can be much more flexible, allowing you to chain modifiers and components, removing the need for any repetition (i.e. no more 'button button--large button--round').

##### 2. Configurable Modules

Configure your modules without touching the source code. Call the mixin and pass your options to it, leaving the module's source code untouched, allowing you to easily change options and styles.

```scss
@mixin buttons($custom: ()) {
    
    // Default module configuration
    $buttons: config((
        'padding': 8px,
        'radius' : 6px
    ), $custom);
    
    @include module('button') {
        display: inline-block;
        padding: this('padding');
        border-radius: this('radius');
    }

}

@include buttons((
    'padding': 0.75em,
    'radius' : 3px
));
```

###### CSS Output

```css
.button, [class*="button-"] {
    display: inline-block;
    padding: 0.75em;
    border-radius: 3px;
}
```

##### 3. Share Configuration with JavaScript

Given a folder structure similar to the following:

```
|-- modules
|   |-- grid
|   |   |-- _grid.scss
|   |   |-- grid.js
|   |   |-- grid.json
```

Inside `grid.json`:

```json
{
    "grid": {
        "breakpoints": {
            "break-0" : "0px",
            "break-1" : "460px",
            "break-2" : "720px",
            "break-3" : "940px",
            "break-4" : "1200px",
            "break-5" : "1400px"            
        }
    }
}
```

Inside `_grid.scss`:

```scss
@import 'grid.json'; // config is now accessible under the `$grid` variable

$breakpoint_tablet: map-get-deep($grid, 'breakpoints', 'break-3');

@media (min-width: $breakpoint_tablet) {
    // do something when screen width is at least 940px
}
```

Inside `grid.js`:

```js
import config from './grid.json';

const breakpoint_tablet = config.grid.breakpoints['break-3'];

if (window.matchMedia(`(min-width: ${breakpoint_tablet})`).matches) {
    // do something when screen width is at least 940px
}
```

## Installation

###### Requirements

* [Sass 3.4+](http://sass-lang.com/install)
* [Sass JSON Vars](https://github.com/vigetlabs/sass-json-vars)<sup>[1]</sup>
* [Node.js](https://nodejs.org/en/)<sup>[1]</sup>

<sup>[1]</sup>This is only required if you intend on using JSON files to store configuration (i.e. you wish to share config between JS and Sass).

> Ensure your paths are correct as they may differ from below

##### Via Yarn

```
yarn add Synergy
```

```css
@import '../node_modules/Synergy/dist/synergy';
```

##### Via NPM

```
npm install Synergy --save
```

```css
@import '../node_modules/Synergy/dist/synergy';
```

##### Via Bower

```
bower install Synergy --save
```

```css
@import '../bower_components/Synergy/dist/synergy';
```

##### Via Git Clone

```
git clone https://github.com/esr360/Synergy.git
```

```css
@import '../Synergy/dist/synergy';
```

##### As Git Submodule

```
git submodule add https://github.com/esr360/Synergy.git vendor
```

```css
@import '../vendor/Synergy/dist/synergy';
```

##### Download

> [Download _synergy.scss](dist/_synergy.scss)

```css
@import 'PATH/TO/synergy';
```

> [(Optional) Download synergy.js](dist/synergy.js)

---

##### If using synergy.js/JSON config

Install the [Sass JSON Vars](https://github.com/vigetlabs/sass-json-vars) Ruby Gem:

```
gem install sass-json-vars
```

Require/import the Synergy module into your project's JS (the below assumes you have installed Synergy using either NPM or Yarn):

```js
import Synergy from 'synergy';
```

Or:

```js
var Synergy = require('synergy');
```

> N.B you will need a module bundler like [Webpack](https://babeljs.io/) in order to require/import modules.

You will also need to configure your Sass compiler to use [Sass JSON Vars](https://github.com/vigetlabs/sass-json-vars) as the importer:

###### CLI

sass /PATH/TO/app.scss -r sass-json-vars

###### Grunt

> N.B Synergy requires Ruby Sass, so if using Grunt you should use the [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) compiler.

```js
sass: {
    dist: {
        options: {
            require: 'sass-json-vars'
        },
        files: {...}
    }
}
```

###### Gulp

> N.B Synergy requires Ruby Sass, so if using Gulp you should use the [Gulp Ruby Sass](https://github.com/sindresorhus/gulp-ruby-sass) compiler.

```js
gulp.task('sass', function () {
 return gulp.src('/PATH/TO/app.scss ')
   .pipe(sass({require: 'sass-json-vars'}).on('error', sass.logError))
   .pipe(gulp.dest('./css'));
});
```

## Documentation - Sass

* [60 Second Example](#60-second-example)

### Mixins

* [Module](#module)
* [Component](#component)
* [Modifier](#modifier)
* [Extend Modifiers](#extend-modifiers)
* [Context](#context)
* [Option](#bool-options)
* [Value](#hybrid-options)

### Module Configuration

* [Bool Options](#bool-options)
* [Non-Bool Options](#non-bool-options)
* [Hybrid Options](#hybrid-options)
* [Nested Options](#nested-options)
* [Including Your Module](#including-your-module)
* [Passing Custom CSS to Your Module](#pass-custom-css-to-modules)
* [Global Configuration](#global-configuration)

#### 60 Second Example

Inside `_header.scss`

```scss
@mixin header($custom: ()) {
    // Merge default config with custom values
    $header: config((
        'name'          : 'header',
        'fixed'         : false,
        'background'    : #000000,
        'wrapper-width' : 960px
    ), $custom);
    
    @include module {
        
        background: this('background');
        
        @include modifier('noLogo') {
            @include module('logo') {
                display: none;   
            }    
        }
        
        @include component('wrapper') {
            width: this('wrapper-width'); 
        }
        
        @include option('fixed') {
            position: fixed;
        }
        
    }
}
```

Wherever you want to output the CSS, in the same or another file...

```scss
@include header();
```

To modify the default options, pass them to the mixin with the new value:

```scss
@include header((
    'background'    : blue,
    'wrapper-width' : 90%
));
```

###### CSS Output

```css
.header, [class*="header-"] {
    background: blue;
}

[class*="header-"][class*="-noLogo"] .logo,
[class*="header-"][class*="-noLogo"] [class*="-logo"] {
    display: none;
}

.header_wrapper
[class*="header_wrapper-"] {
    width: 90%;   
}

[class*="header-"][class*="-fixed"] {
    position: fixed;
}
```

Your markup for the above module may now look something like the following:

```html
<div class="header">
    <div class="header_wrapper">
        <div class="logo">...</div>
        ...
    </div>    
</div>
```

If you want to hide the logo, you can add the `noLogo` modifier to the header:

```html
<div class="header-noLogo">
    ...   
</div>
```

If you want to set the header's position to `fixed`, there are two ways you can do this. Firstly, you can again add the appropriate modifier to the markup:

```html
<div class="header-fixed">
    ...   
</div>
```

N.B. Modifiers can be chained in any order:

```html
<div class="header-fixed-noLogo">
    ...   
</div>
```

Or you can set the header to be fixed (without the need of a modifier) by passing the option to the mixin when calling it:

```scss
@include header((
    'fixed' : true
));
```

Then just:

```html
<div class="header">
    ...
</div>
```

#### Module

The `module()` mixin is what generates the selectors for your module. The mixin accepts 2 parameters:

* `$modules` {string|list} - the name of your module(s) (optional)
* `$type` {string} - this defines how the mixin generates the selectors for your component(s) ['flex'] (optional)

```scss
@include module('header') {
	...
}
```

If `$modules` is not defined, it will look for a `name` value in your module's config. This is an alternative way of using the `module()` mixin:

```scss
@mixin header($custom: ()) {
    
    $header: config((
        'name' : 'header'
    ), $custom);
    
    @include module {
        ...   
    }
        
}
```

`$modules` is usually a single value but can also be a list, eg. `('header', 'footer')`, should you wish to apply styles to more than one module. For such instances, an *alias* mixin of `modules()` is available:

```scss
@include modules(('header', 'footer')) {
	...
}
```

`$type` can be one of three values: `flex` (default), `chain` and `static`. By default, `flex` is enabled for all componenets. To globally change the default type from `flex` to something else, use the `$selector-type` variable with the value you desire in your Sass before importing Synergy.

```scss
// Re-define default selector type
$selector-type: 'chain';

// Import Synergy
@import "path/to/synergy"

/* Your Modules */
```

##### Flex

```scss
@include module('header', 'flex') {
	...
}
```

This is the default value for a module; it creates selectors for both `.module` and `[class*="module-"]`, allowing you to use both the naked module as well as modifiers. Whilst this is the most flexible option, it does mean the generated CSS is slightly greater, which is what the other 2 options are for.

###### CSS Output

```css
.header, [class*="header-"] {
    ...
}
```

> If using the global default `$type` value of `flex`, you do not need to pass a second parmeter here to achieve the `flex` option

##### Chain

```scss
@include module('header', 'chain') {
	...
}
```

###### CSS Output

```css
[class*="header-"] {
    ...
}
```

The chain option should be used if you are looking to optimise your CSS output, and you know your module will not exist as a naked selector without modifiers. Ie - this option outputs only `[class*="module-"]`, thefore you cannot use `.module` to achieve any styles.

##### Static

```scss
@include module('header', 'static') {
	...
}
```

###### CSS Output

```css
.header {
    ...
}
```

The static option creates only the naked selector for your module; ie - `.selector`, meaning no modifiers or components can be used. This option is only available for consistency; it could make more sense to just write `.module` instead of using the mixin in this case - I'll let you think about that one.

##### Advanced Example

```scss
@include modules(('header', 'footer'), 'static') {
	...
}

@include module('header', 'static') {
	...
}

@include module('footer') {
	...
}
```

###### CSS Output

```css
.header, .footer {
    ...
}
.header {
    ...
}
.footer, [class*="footer-] {
    ...
}
```

#### Component

Because of how the selectors are generated, it is not possible to create relating modules which begin with the same namespace. For example, if you have a `header` module with the default `$type` of `flex`, any classes which contain `header-` will receive the core header styles, so if you were to create a `header-button` element, this would inherit the `header` styles. There are several options to get around this, including:

* camelCase (headerButton)
* reversed wording (button-header)
* underscore (header_button)

To keep things as similar to BEM as possible, Synergy provies an easy way to create relating components using underscores, eg - `header_wrapper`. The `component` mixin accepts 2 parameters:

* `$components` {string|list} - the name of your component(s) [null] (optional)
* `$glue` {string} - the glue to chain components to modules ['_'] (required)

```scss
@include module('header') {
	
    ...

	@include component('wrapper') {
		...	
	}	
	
}
```

```html
<div class="header_wrapper">...</div>
```

###### CSS Output

```css
.header, [class*="header-"] {
    ...
}
[class*="header_wrapper"] {
    ...
}
```

Components work like regular modules, in the sense that you can add modifiers:

```scss
@include module('header') {

    ...
	
	@include component('wrapper') {
        ...
		@include modifier('fullscreen') {
			...
		}
	}
		
}
```

```html
<div class="header_wrapper-fullscreen">...</div>
```

###### CSS Output

```css
.header, [class*="header-"] {
    ...
}
[class*="header_wrapper"] {
    ...
}
[class*="header_wrapper-fullscreen"] {
    ...
}
```

##### Alias Mixin For Multiple Components

```scss
@include module('footer') {

    ...
	
	@include components(('nav', 'copyright')) {
		...	
	}	
	
}
```

```html
<div class="footer">
    <div class="footer_nav">...</div>
    <div class="footer_copyright">...</div>
</div>
```

###### CSS Output

```css
.footer, [class*="footer-"] {
    ...
}
[class*="footer_nav"] {
    ...
}
[class*="footer_copyright"] {
    ...
}
```

##### Global Component Styles

By not passing a parameter to the `component()` mixin, you can apply styles to all components of the parent module:

```scss
@include module('widget') {

	@include component {
		@include modifier('inline') {
			...
		}	
	}
	
	@include component('icon') {
		...
	}
	
	@include component('header') {
		...
	}
	
}
```

```html
<div class="widget">
	<div class="widget_icon-inline">...</div>
	<div class="widget_header-inline">...</div>
</div>
```

###### CSS Output

```css
[class*="widget_"][class*="-inline"] {
    ...
}
[class*="widget_icon"] {
    ...
}
[class*="widget_header"] {
    ...
}
```

##### Custom Glue

If you want to use a different string to chain components to modules, you can pass the `$glue` parameter when including the module:

```scss
@include module('header') {
    @include component('wrapper', $glue: '__') {
        ...	
    }	
}
```

###### CSS Output

```css
[class*="header__wrapper"] {
    ...
}
```

To globally change the component glue, pass the `$component-glue` variable with before importing Synergy.

```scss
// Set custom component glue
$component-glue: '__';

// Import Synergy
@import "path/to/synergy"

/* Your Modules */
```

#### Modifier

The `modifier()` mixin generates the selector for any modifiers for your module, for example a **small** or **large** modifier. This mixin accepts the following paramters:

* `$modifiers` {string|list} - the name of the desired modifier(s) (required)
* `$special` {string} - set a special operator (optional)
* `$glue` {string} - the glue to chain components to modules ['_'] (required)


```scss
@include module('button') {
	
	...
	
	@include modifier('small') {
		font-size: 0.75em;
	}
	
	@include modifier('large') {
		font-size: 1.5em;
	}
	
}
```

```html
<div class="button">Button</div>
<div class="button-small">Button</div>
<div class="button-large">Button</div>
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button-"][class*="-small"] {
    font-size: 0.75em;
}
[class*="button-"][class*="-large"] {
    font-size: 1.5em;
}
```

The `modifier()` mixin is infinitely nestable allowing you to require more than one modifier for styles to take effect:

```scss
@include module('header') {
	
	...
	
	@include modifier('side') {
        position: absolute;
		@include modifier('left') {
            left: 0;
        }
		@include modifier('right') {
            right: 0;
        }
	}
	
}
```

```html
<div class="header-side-left">...</div>
```

###### CSS Output

```css
.header, [class*="header-"] {
    ...
}
[class*="header-"][class*="-side"] {
    position: absolute;
}
[class*="header-"][class*="-side"][class*="-left"] {
    left: 0;
}
[class*="header-"][class*="-side"][class*="-right"] {
    right: 0;
}
```

You can use any number of modifiers on a single element in the HTML, and in any order, for example:

```html
<div class="button-large-round-primary">...</div>
<div class="button-primary-large-round">...</div>
```

##### Alias Mixin For Multiple Modifiers

```scss
@include module('button') {
	
	...
	
	@include modifiers(('buy-now', 'add-to-basket')) {
		text-transform: uppercase;
	}
	
	@include modifier('buy-now') {
		...
	}
	
	@include modifier('add-to-basket') {
		...
	}
	
}
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button-"][class*="-buy-now"], 
[class*="button-"][class*="-add-to-basket"] {
    text-transform: uppercase;
}
[class*="button-"][class*="-buy-now"] {
    ...
}
[class*="button-"][class*="-add-to-basket"] {
    ...
}
```

##### Custom Glue

If you want to use a different string to chain modifiers to modules/components, you can pass the `$glue` parameter when including the modifier:

```scss
@include module('button') {
    @include modifier('large', $glue: '--') {
        ...	
    }	
}
```

###### CSS Output

```css
[class*="button--"][class*="--large"] {
    ...
}
```

To globally change the modifier glue, pass the `$modifier-glue` variable with before importing Synergy.

```scss
// Set custom modifier glue
$modifier-glue: '--';

// Import Synergy
@import "path/to/synergy"

/* Your Modules */
```

#### Extend Modifiers

This mixin allows you to extend multiple modifiers into a new, seperate modifer, essentially combining several modifiers into one.

```scss
@include module('button') {

    ...

	@include modifier('round')   {border-radius: 6px}
	@include modifier('large')   {font-size: 2em}
	@include modifier('success') {color: green}

	@include modifier('primary') {
		@include extend(('round', 'large', 'success'))
	}	

}
```

```html
<div class="button-primary">...</div>
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button-"][class*="-round"], 
[class*="button-"][class*="-primary"] {
    border-radius: 6px;
}
[class*="button-"][class*="-large"], 
[class*="button-"][class*="-primary"] {
    font-size: 2em;
}
[class*="button-"][class*="-success"], 
[class*="button-"][class*="-primary"] {
    color: green;
}
```

#### Context

The `context()` mixin allows you to apply styles to your module when certain conditions are met. This mixin accepts 1 parameter:

* `$context` - the name of the predefined condition you wish to be met (required)

The following conditions can be passed to the mixin:

* `parent-hovered` - apply styles to a component when the parent module is hovered
* *more coming soon*

##### Parent-Hovered

```scss
@include module('widget') {

	@include component('icon') {
		color: blue;
		@include context('parent-hovered') {
			color: white;
		}	
	}
	
//	This is equivilent to:
//
//	@include component('icon') {
//		color: blue;
//	}
//
//	&:hover {
//		@include overwrite-component('icon') {
//			color: white;
//		}
//	}

}
```

###### CSS Output

```css
[class*="widget_icon"] {
    color: blue;
}
.widget:hover [class*="widget_icon"], 
[class*="widget-"]:hover [class*="widget_icon"] {
    color: white;
}
```

### Module Configuration

As outlined in the [overview](#overview) section, Synergy allows you to configure your modules with customizable options.

```scss
@mixin header($custom: ()) {

	$header: config((
		'bg-color' : black,
		'top'      : 50px
	), $custom);

	@include module('header') {
		background-color: this('bg-color');
		margin-top: this('top');
	}
		
}
```

###### CSS Output

```css
.header, [class*="header-"] {
  background-color: black;
  margin-top: 50px;
}
```

For all intents and purposes, there are 2 types of options; bools and non-bools. A bool option is one whose value determines whether or not some code should be applied. A non-bool option is one whose value is used as a value for a CSS property. In the below example there is one of each.

```scss
@mixin header($custom: ()) {

	$header: config((
		'dark' : false,
		'top'  : 50px
	), $custom);

	@include module('header') {
		
		margin-top: this('top');
		
		@include option('dark') {
			background-color: black;
		}
		
	}
		
}
```

###### CSS Output

```css
.header, [class*="header-"] {
  margin-top: 50px;
}
[class*="header-"][class*="-dark"] {
  background-color: black;
}
```

Your configuration can be infinitely nested, like so:

```scss
@mixin global($custom: ()) {

	$global: config((
		
		// Options
		'typography': (
			'sizes': (
				'size-1'      : 1em,
				'size-2'      : 1.2em,
				'size-3'      : 1.6em
			),
			'colors': (
				'primary'     : red,
				'secondary'   : blue,
                'validation'  : (
                    'valid'   : #19d36d,
                    'invalid' : #d32828
                )
			)
		)
		
	), $custom) !global;
	
	...
		
}
```

#### Bool Options

If your option is a bool, you can use the `option()` mixin. The styles added within this mixin will automatically be applied to the module if the option is set to **true**. 

```scss
@mixin header($custom: ()) {

	$header: config((
		
		// Options
		'dark' : false,
		'top'  : 50px
		
	), $custom);
	
    // styles will be applied if 'dark' is set to 'true'
	@include option('dark') {
        ...   
    }
		
}
```

You can alternatively pass the bool value to your option like so:

```scss
@mixin header($custom: ()) {

	$header: config((
		
		'dark':(
            'enabled': false
        ),
		'side':(
            'enabled': left,
            'background': black
        ),
		'top': 50px
		
	), $custom);
	
    ...
		
}
```

This allows you to pass other options to the setting.

Since by default adding a setting will also create a modifier for the setting, you can apply the styles by adding the modifier to your HTML tag, regardless of the setting's value:

```html
<div class="header-dark">
	...
</div>
```

If you are watching your CSS output, you may wish to remove these modifiers (and related selectors) from the generated styles and only use them conditionally. To do so, you can pass the `extend-options` option to your module's config, and set it to **false**:

```scss
@mixin header($custom: ()) {

	$header: config((
		
		// Options
		'extend-options': false,
		'dark' : false,
		'top'  : 50px
		
	), $custom);
	
	...
		
}
```

To set this option globally for all modules, use the `$extend-options` variable before importing Synergy:

```scss
// Disable creation of modifiers for module settings
$extend-options : false;

// Import Synergy
@import "path/to/synergy"

/* Your Modules */
```

#### Non-Bool Options

If your option is a CSS property, to call the option in your module the `this()` *function* is used, like so:

```scss
margin-top: this('top');
```

which will generate:

```scss
margin-top: 50px;
```

#### Hybrid Options

In some cases, you may require a hybrid of the above 2 options. You may have a set of styles you wish to use conditionally, and you may wish for these styles to vary depending on the value passed. Let's look at the following example - imagine your website has a side header, and you want to easily change whether it appears on the left or right hand side:

```scss
@mixin header($custom: ()) {

	$header: config((
		
		// Options
		'side' : false; // left or right
		
	), $custom);
	
	@include module('header') {
		
		@include option('side') {
			// core side header styles
			@include value('left') {
				// left side styles
			}
			@include value('right') {
				// right side styles
			}
		}
		
	} // module('header')
		
} // @mixin header
```

The above example inserts an optional set of styles if `side` is set to anything other than **false**. Depending on the value of your option, we can choose to include additional styles by using the `value()` mixin. Again, by default these options are extended as modifiers so you can use them regardless of the setting's value:

```html
<div class="header-side-left">..</div>
```

```html
<div class="header-side-right">..</div>
```

If you've completely followed this documentation so far you may have already picked up on the fact you can also use:

```html
<div class="header-left-side">..</div>
```

```html
<div class="header-right-side">..</div>
```

And just to reiterate, with the `side` option set to either left or right in the above example, you don't need to pass any modifiers to the HTML, we just use:

```html
<div class="header">...</div>
```

##### Getting Creative

In some circumstances, we can achieve the same thing without having to use the `option()` mixin. Consider the above example; "left" and "right" are both also CSS properties, so we can pass the setting's value as a CSS property:

```scss
@mixin header($custom: ()) {

	$header: config((
		
		// Options
		'side' : left;
		
	), $custom);
	
	@include module('header') {
		
		@include setting('side') {
			// Side-Header Styles
			...
			#{this('side')}: 0; // left: 0;
		}
		
	} // module('header')
	
} // @mixin header
```

The above example is assuming we have a setup where the header's position is controlled via:

* `left: 0;` for a left header
* `right: 0;` for a right header

#### Including Your Module

Our module is now ready to be included; to include the module with the default settings you have created, all that's required is:

```scss
@include header;
```

To include your header with customised options, this is done like so:

```scss
@include header((
	'dark' : true,
	'side' : left,
	'top'  : 0
));
```

And that's it, you now have a completely custoimzable header which can be modified with extreme ease.

#### Pass Custom CSS to Modules

If you want to pass custom CSS properties to a module, component or modifier, but don't want to add these properties to the source file, you can do this by passing your styles to the `CSS` option when including your module:

```scss
@include buttons((
    ...
    'CSS': (
        'letter-spacing': -1px,
        'text-transform': uppercase
    )
));
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
    letter-spacing: -1px;
    text-transform: uppercase;
}
```

##### Pass CSS to a Component

If you need to pass styles to a component of a module, preprend the key of your property with the component glue (default is '_'):

```scss
@include buttons((
    ...
    'CSS': (
        '_wrapper': (
            'overflow': hidden,
            'margin-bottom': 10px
        )
    )
));
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button_wrapper"] {
    overflow: hidden;
    margin-bottom: 10px;
}
```

##### Pass CSS to a Modifier

If you need to pass styles to a modifer of a module or component, preprend the key of your property with the modifier glue (default is '-'):

```scss
@include buttons((
    ...
    'CSS': (
        '-foo': (
            'text-transform': uppercase
        )
    )
));
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button-foo"] {
    text-transform: uppercase
}
```

You can target modules and components to an infinite depth:

```scss
@include buttons((
    ...
    'CSS': (
        '_foo': (
            'content': 'alpha' ,
            '-bar': (
                'content': 'beta',
                '-baz': (
                    'content': 'gamma'
                )
            )
        )
    )
));
```

###### CSS Output

```css
.button, [class*="button-"] {
    ...
}
[class*="button_foo"] {
    content: 'alpha';
}
[class*="button_foo-bar"] {
    content: 'beta';
}
[class*="button_foo-bar-baz"] {
    content: 'gamma';
}
```

#### Global Configuration

What if you want to create a module whose options can be accessed by other modules? For example, say you have a module for your grid system and have configured some breakpoint values - you then may wish to access these values from throughout your project:

```scss
@mixin grid($custom: ()) {
	
	$grid: ((
		'breakpoints': ((
			'break-1': 420px,
			'break-2': 740px,
			'break-3': 960px,
			'break-4': 1200px
		));
	), $custom);
	
	...
	
} // @mixin grid
```

This is entirely possible, and requires the addition of the `!global` flag:

```scss
@mixin grid($custom: ()) {
	
	$grid: ((
		'breakpoints': ((
			'break-1': 420px,
			'break-2': 740px,
			'break-3': 960px,
			'break-4': 1200px
		));
	), $custom) !global;
	
	...
	
} // @mixin grid

// Mixin to easily access breakpoints map
@function breakpoint($breakpoint) {
	@return option($grid, 'breakpoints', $breakpoint);
}
```

The `option()` function is used to get values from another module's configuration, like so:

```scss
width: option($grid, 'breakpoints', 'break-3'); // will return 960px
```

As long as your other modules are included after this one, we can now access the breakpoint values using:

```scss
width: breakpoint('break-3');
```

## Documentation - JS

* [60 Second Example](#60-second-example-1)
* [Parameters](#parameters)
* [Methods](#methods)

#### 60 Second Example

Inside `header.js`

```js
import synergy from './path/to/synergy';

export function header(els, custom) {

    const defaults = {
        fixed: false,
        background: '#000000',
        wrapper-width : '960px'
    }

    synergy(els, function(el, options) {
        const wrapper = el.component('wrapper');
        const fixed = options.fixed || el.modifier('fixed');

        if (fixed) {
            console.log('header is fixed');
        }

        if (el.modifier('noLogo')) {
            console.log('header has the "noLogo" modifier');
        }

        wrapper.doSomething();
    }, defaults, custom);

}
```

Call the function on the header element:

```html
<div class="header" id="header"></div>
```

```js
// Any of the following would work - continue reading to learn more
header(document.getElementByID('header'));
header(document.querySelectorAll('.header'));
header('header');
```

To modify the default options, pass them to the function with the new value:

```js
header('header', {
    fixed: true
});
```

### Parameters

#### `Synergy([Where](What){How}{?})`

The `synergy()` function accepts 4 parameters:

* `els` {String|NodeList|HTMLElement} - The element(s) to call the function on
* `callback` {function} - The function to call on each element in `els`
* `config` {Object} - Default confiuration to use for the function
* `custom` {Object} - Custom configuration to use when calling the function

```js
synergy(els, callback, config, custom);
```

#### Parameter - `els`

The `els` parameter is either a single HTML Element or a NodeList. If a NodeList is passed, the callback function will iterate on each element in the NodeList.

##### Examples

```html
<div class="foo" id="bar">...</div>
```

The below examples would all target the above HTML element:

```js
synergy(document.getElementByID('bar'), function() {...});
synergy(document.querySelectorAll('.foo'), function() {...});
synergy('foo', function() {...});
```

#### Parameter - `callback`

The callback parameter is a callback function with 3 paramaters available: `function(el, options, exports)`

##### Paramater - `el`

This will be a single HTML Element - if you passed a NodeList to the main function the callback will iterate through each element, accessed by this parameter.

##### Paramater - `options`

This returns a merged object of the objects retreived by the original `config` and `custom` parameters.

##### Paramater - `exports`

This returns the available [exports](#methods) of the Synergy module (currently ['modifier'](#method---modifiermodifier-set) and ['component'](#method---componentcomponent-set)).

##### Examples

```html
<div class="foo-buzz" id="bar">...</div>
```

```js
const defaults = {
    foo: 'fizz',
    bar: 2
};

synergy('foo', function(el, options, exports) {

    console.log(options.foo); // returns 'qux'
    console.log(options.bar); // returns 2
    console.log(el.id); // returns 'bar'
    console.log(el.modifier('buzz')); // returns true

}, defaults, {foo: 'qux'});
```

#### Parameter - `config`

This is a JavaScript object containing any default configuration to use for the callback, which will get merged with the `custom` object.

#### Parameter - `custom`

This is a JavaScript object containing any default configuration to use for the callback, which will get merged with the `config` object.

### Methods

#### Method - `modifier(modifier, set)`

##### Parameter - `modifier`

String - the modifier of interest

##### Parameter - `set`

If this parameter is passed as a truthy value, the method will set a new modifier instead of returning the existance of one.

##### Examples

```html
<div class="foo-fizz-buzz">...</div>
```

```js
synergy('foo').modifier('fizz'); // returns true
synergy('foo').modifier('buzz'); // returns true
synergy('foo').modifier('qux'); // returns false
synergy('foo').modifier(); // returns ['fizz', 'buzz']
synergy('foo').modifier('baz', true); // sets new modifier of 'baz'
```

#### Method - `component(component, set)`

##### Parameter - `modifier`

String - the component of interest

##### Parameter - `set`

If this parameter is passed as a truthy value, the method will set a new component on the selected element instead of returning the existance of one.

##### Examples

```html
<div id="foo">
    <div class="foo_fizz" id="fooFizz"></div>
    <div class="foo_buzz" id="fooBuzz">...</div>
</div>
```

```js
const el_1 = document.getElementByID('foo');
const el_2 = document.getElementByID('fooFizz');

synergy(el_1).component('fizz'); // returns HTML Element
synergy(el_1).component('buzz'); // returns HTML Element
synergy(el_1).component('qux'); // returns false
synergy(el_2).component(); // returns ['fizz']
synergy(el_1).component('baz', true); // sets new component of 'baz'
```

## Creating a Theme

All JavaScript for this example will be written in ES6 using imports and exports. The project will consit of 4 modules and 1 theme. The complete folder structure will be as follows:

```
|-- modules
|   |-- buttons
|   |   |-- _buttons.scss
|   |-- grid
|   |   |-- _grid.scss
|   |   |-- grid.js
|   |   |-- grid.json
|   |-- header
|   |   |-- _header.scss
|   |   |-- header.js
|   |   |-- header.json
|   |-- typography
|   |   |-- _typography.scss
|-- themes
|   |-- Buzz
|   |   |-- buzz.scss
|   |   |-- buzz.js
|   |   |-- buzz.json
|-- app.scss
|-- app.js
```

The goal is to be able to configure all modules via `themes/Buzz/buzz.json`. From the above structure it can be seen that not all modules have a `.json` file, which is where a module's default configuration is stored. This is only required if access to the configuration is required in both the app's JavaScript and Sass realms. Otherwise, the default configuration can be contained within the module's `.scss` file.

### Inside app.scss

Firstly, Synergy is imported, followed by each module.

```scss
// Synergy
@import 'src/scss/synergy';

// Modules
@import 'modules/typography/typography';
@import 'modules/buttons/buttons';
@import 'modules/grid/grid';
@import 'modules/header/header';
```

### Inside app.js

```js
import synergy from 'synergy';

import { grid } from './modules/grid/grid';
import { header } from './modules/header/header';

const config = {};

export { config, synergy, grid, header }
```

### Inside buzz.scss

The first thing to do is import the app. Then the theme's config is imported (which, thanks to Sass Json Vars, will be accessible via the `$app` variable) and each module is included to output the CSS in-line with the config from `buzz.json` (the [`custom()`](#TODO) function seen below retreives the module's custom config from the `$app` variable).

```scss
@import '../../app';
@import './buzz.json';

@include typography(custom('typography'));

@include buttons(custom('typography'));

@include grid(custom('typography'));

@include header(custom('typography'));
```

### Inside buzz.js

The theme's config is imported as well as the `app.js` exports. Each module's main function is called, passing the values from `buzz.json` as parameters.

```js
import * as app from '../../app';
import config from './buzz.json';

app.grid('grid', config.grid);

app.header('header', config.header);
```

### Inside buzz.json

Each module must live under the parent `app` object. This is where custom config will be passed to each module later on (when this file is imported into a Sass file, the values will be accessible from the `$app` variable).

```json
{
    "app": {
        "typography": {},
        "buttons": {},
        "grid": {},
        "header": {},
    }
}
```

### Typography Module

#### Inside _typography.scss

Because we don't need to access these values in the JavaScript, the default configuration for this module will be stored in this file.

```scss
@mixin typography($custom: ()) {

    $typography: config((
        'colors':(
            'primary'   : blue,
            'secondary' : green
        ),
        'sizes':(
            'small'     : 0.8em,
            'regular'   : 1em,
            'large'     : 1.4em           
        )
    ), $custom) !global;

} // @mixin typography

@function color($color) {
    @return option($typography, 'colors', $color);
}

@function size($size) {
    @return option($typography, 'sizes', $size);
}
```

### Buttons Module

#### Inside _buttons.scss

Because we don't need to access these values in the JavaScript, the default configuration for this module will be stored in this file.

```scss
@mixin buttons($custom: ()) {

    $buttons: config((
        'line-height'  : 1.4,
        'side-spacing' : 0.5em,
        'background'   : grey,
        'color'        : white,
        'round-radius' : 0.4em
    ), $custom);

    @include module('button') {

        // Core Styles
        //*********************************************************

        display: inline-block;
        line-height: this('line-height');
        padding: 0 this('side-spacing');
        background: this('background');
        color: this('color');

        // Modifiers
        //*********************************************************

        // Patterns
		
        @include modifier('round') {
            border-radius: this('round-radius');
        }

        @include modifier('block') {
            display: block;
        }

        // Colors

        @include modifier('primary') {
            background: color('primary');
        }

        @include modifier('secondary') {
            background: color('secondary');
        }

        // Sizes

        @include modifier('small') {
            font-size: size('small'); 
        }

        @include modifier('large') {
            font-size: size('large'); 
        }

        // Semantic Styles

        @include modifier('purchase') {
            @include extend(('round', 'primary', 'large'));
        }

    } // module(button)

}
```

### Grid Module

#### Inside grid.json

```json
{
    "grid": {
        "name": "grid",
        "breakpoints": {
            "break-0" : "0px",
            "break-1" : "460px",
            "break-2" : "720px",
            "break-3" : "940px",
            "break-4" : "1200px",
            "break-5" : "1400px"            
        }
    }
}
```

#### Inside _grid.scss

Perhaps in a real project this file may serve more purpose, but for this example it's only use is to globally expose the breakpoint values to other modules.

```scss
@import '../../modules/grid/grid.json'; // path is relative to `themes/Buzz/`
// Default config is now accessible via the $grid variable

@mixin grid($custom: ()) {
    $grid: config($grid, $custom) !global;
}

@function breakpoint($breakpoint) {
    @return map-get-deep($grid, 'breakpoints', $breakpoint);
}
```

This now means other modules can access the theme's breakpoint values via the `breakpoint()` function defined above:

```scss
@media (min-width: breakpoint('break-3')) {
    ...
}
```

#### Inside grid.js

And likewise for the corresponding JavaScript file, there is little more going on than merging the default config with custom values and exposng the new breakpoint values to be used by other modules.

```js
import * as app from '../../app';
import defaults from './grid.json';

export function grid(els, custom) {
    app.config.grid = Object.assign(defaults.grid, custom);
};
```

This now means other modules can access the theme's breakpoint values:

```scss
import * as app from '../../app';

const breakpoint_tablet = app.config.grid.breakpoints['break-3'];
```

### Header Module

#### Inside header.json

This is where the default configuration for the header module will be stored.

> Notice how we can use the earlier defined color() function from the typography module as a value

```json
{
    "header" {
        "name": "header",
        "background" : "color('primary')",
        "top": "50px",
        "disable-top" "break-5",
        "dark": false,
        "dark-color": "rgba(black, 0.8)",
        "side": {
            "enabled": false,
            "width": "100%"
        }
    }
}
```

#### Inside _header.scss

```scss
@import '../../modules/header/header.json'; // path is relative to `themes/Buzz/`
// Default config is now accessible via the $header variable

@mixin header($custom: ()) {

    $header: config($header, $custom);

    // Module
    //*************************************************************

    @include module() {

        // Core Styles
        //*********************************************************

        background: this('background');

        @media (max-width: this('disable-top')) { 
            margin-top: this('top');
        }

        // Settings
        //*********************************************************

        @include option('dark') {
            background: this('dark-color');   
        }

        @include option('side') {
            @media (min-width: breakpoint('break-3')) {
                // Core Side-Header Styles
                position: fixed;
                top: 0;
                width: this('side', 'width');
                z-index: 99;
                @include value('left') {
                    left: 0;
                }
                @include value('right') {
                    right: 0;
                }
            }
        }

    } // module('header')

}
```

#### Inside header.js

This example doesn't really provide any UI effects for the header, it's just to demonstrate how to set up the JS file for a module, and how to access and export the config.

```js
import * as app from '../../app';
import defaults from './header.json';

export function header(els, custom) {

    app.synergy(els, function(header, options) {
        const offest = options.top

        if (options.side.enabled) {
            console.log('Side header is enabled');
        }

        if (options.dark) {
            console.log('Header is dark');
        }

        if (app.synergy(header).modifier('dark')) {
            console.log('header element has "dark" modifier');
        }

    }, defaults, custom);

    app.config.accordions = Object.assign(
        defaults.accordions, custom
    );

};
```

### Returning to buzz.json

With all the files setup, `buzz.scss` and `buzz.js` can be sent to their respective compilers/transpilers to be (pre)processed. Each module will have their default values. In order to pass custom configuration to the theme, the values are passed to `buzz.json`:

```json
{
    "app": {
        "typography": {
            "colors": {
                "primary": "purple",
                "secondary": "blue"
            }
        },
        "buttons": {
            "line-height": "24px"
        },
        "grid": {
            "breakpoints": {
                "break-3": "980px",
                "break-6": "1860px"
            }
        },
        "header": {
            "dark": true,
            "top": "20px",
            "disable-top": "break-6",
            "side": {
                "enabled": "left"
            }
        }
    }
}
```

The values are merged recursively, meaning you only have to re-define the values you are changing.

### CSS Output

Passing buzz.scss through our Sass compiler yields the following CSS:

```css
.button, [class*="button-"] {
    display: inline-block;
    line-height: 24px;
    padding: 0 0.5em;
    background: grey;
    color: white;
}
[class*="button-"][class*="-round"], 
[class*="button-"][class*="-primary"], 
[class*="button-"][class*="-purchase"] {
    border-radius: 0.4em;
}
[class*="button-"][class*="-block"] {
    display: block;
}
[class*="button-"][class*="-primary"], 
[class*="button-"][class*="-purchase"] {
    background: purple;
}
[class*="button-"][class*="-secondary"] {
    background: blue;
}
[class*="button-"][class*="-small"] {
    font-size: 0.8em;
}
[class*="button-"][class*="-large"], 
[class*="button-"][class*="-purchase"] {
    font-size: 1.4em;
}

.header, [class*="header-"] {
    background: purple;
}

@media (max-width: 1860px) {
    .header, [class*="header-"] {
        margin-top: 0;
    }
}

.header, [class*="header-"], 
[class*="header-"][class*="-dark"] {
    background: rgba(0, 0, 0, 0.8);
}

@media (min-width: 980px) {
    .header, [class*="header-"], 
    [class*="header-"][class*="-side"] {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
    }
    .header, [class*="header-"], 
    [class*="header-"][class*="-side"][class*="-left"] {
        left: 0;
    }
    [class*="header-"][class*="-side"][class*="-right"] {
        right: 0;
    }
}
```

Every configurable aspect of your project can now quickly and easily be changed from just one file, whilst retaining a completely modular architecture.

#### Media Query Based Example

A popular, practical example of how to use this might be to access your style's breakpoint values to conditionally apply scripts.

Consider the following `grid` module:

```scss

@mixin grid($custom: ()) {
	
	$grid: config((
        // Options
		'name'              : 'grid',
		'output-json'       : true,
        // Breakpoints
		'breakpoints': (
			'break-0'       : 0px,
			'break-1'       : 460px,
			'break-2'       : 720px,
			'break-3'       : 940px,
			'break-4'       : 1200px,
			'break-5'       : 1400px
		)
	), $custom) !global;
    
    ...
	
} // @mixin grid
```

Let's create a function which allows us to do this in our JavaScript:

```js
if(breakpoint('min-width', 'break-3')) {
    // do something   
}
```

This can be achieved with the following code:

```js
function breakpoint(media, value) {
	return window.matchMedia('(' + media + ':' + _modules['grid']['breakpoints'][value] + ')').matches;
}
```

They key part of the above code is `_modules['grid']['breakpoints'][value]`, which fetches the value from the JSON.

## Credits & Notes

* [Sassy Maps](https://github.com/at-import/sassy-maps)
* [Advanced Sass List Functions](http://hugogiraudel.com/2013/08/08/advanced-sass-list-functions/)
* [Bringing Configuration Objects To Sass](http://hugogiraudel.com/2014/05/05/bringing-configuration-objects-to-sass/)

## Changelog

#### Version 3.5.0

Released: 11th November 2016

###### Release Notes

* [#6](https://github.com/esr360/Synergy/issues/6) adding ability to customize module:component:modifier glue
* [#10](https://github.com/esr360/Synergy/issues/10) adding ability to pass custom CSS when including module
* general grooming of source code

#### Version 3.4.1

Released: 21st October 2016

###### Release Notes

* fixing issue with commit hash used in bower install

#### Version 3.4.0

Released: 21st October 2016

###### Release Notes

* removing custom functions and adding [Sass-Boost](https://github.com/esr360/Sass-Boost) dependency
* added as npm package
* added unit tests

#### Version 3.3.0

Released: 5th August 2016

###### Release Notes

* recoded using vanilla JS, removing jQuery as a dependency
* removing `isModifier()` JS function
* improving `_option()` JS function
* renaming global `_module` variable to `_modules`
* adding new `data` option to `module` mixin for data-attributes
* improving `component` mixin logic and functionality
* improving `modifier` mixin logic and functionality
* improving JSON output by removing superfluous keys
* adding SassDoc compatibility
* re-adding bower support

#### Version 3.2.0

Released: 14th February ♥ 2016

###### Release Notes

* separating source code into individual files
* allow creation of modules without configuration
* removing `nested-modifier()` mixin - no longer needed as regular `modifier()` mixin now more intelligent
* adding ability to extend entire module + modifiers within another
* adding 'this' function to access current modules config
* renaming `default` to more semantic `enabled` for option mixin
* adding `at-root` option to `overwrite()` mixin
* renaming `stylesConfigJSON` selector to `modulesConfigJSON`
* bower support dropped

#### Version 3.1.0

Released: 18th November 2015

###### Release Notes

* adding `$is` and `$not` options to `overwrite-component` mixin (previously `overwrite-sub`)
* renaming `component()` mixin to `module()`
* renaming `sub-component()` mixin to `component()`
* renaming `overwrite-sub()` mixin to `overwrite-component()`

#### Version 3.0.0

Released: 22nd October 2015

###### Release Notes

* new **modular.js** extension - talk betwen CSS and JS
* removing the need to define component name when including `component()`
* more intelligent `overwrite()` mixin with more options
* more intelligent `modifier()` mixin with more options
* adding `$parent` option to `extend()` mixin
* removing media query option from `context()` mixin
* renaming 'setting' & 'option' mixins to 'option' and 'value' 
* general improvements to code and performance

#### Version 2.7.0

Released: 10th August 2015

###### Release Notes

* adding ability to add basic media queries via `context()` mixin

#### Version 2.6.0

Released: 9th August 2015

###### Release Notes

* adding `context()` mixin (with 1 predefined contextual helper)
* adding `$special` paremeter to `overwrite()` mixins (with 1 predefined parameter)
* removing the need to define `$config` variable in each module
* renaming `$config` parameter to `$custom`

#### Version 2.5.0

Released: 9th August 2015

###### Release Notes

* adding ability to apply global sub-component styles

#### Version 2.4.0

Released: 8th August 2015

###### Release Notes

* adding ability to overwrite components from any main component

#### Version 2.3.0

Released: 8th August 2015

###### Release Notes

* adding ability for modifier mixins to accept multiple parameters

#### Version 2.2.0

Released: 8th August 2015

###### Release Notes

* adding ability to accept multiple components per mixin

#### Version 2.1.0

Released: 7th August 2015

###### Release Notes

* adding `overwrite-component()` mixin

#### Version 2.0.0

Released: 7th August 2015

###### Release Notes

* removing `nested-component()` mixin
* adding `overwrite()` mixin
* adding `sub-component()` mixin
* re-coded `modifier()` mixin to work on nested objects