import React from 'react';
import { render } from 'react-dom';
import { Site } from './imports/core/index';
import { Popup, Newsletter } from './imports/components/index';
import $ from 'jquery-slim';

const css = require("./main.less");

class Module {
  constructor(Component) {
        this.Component = Component;
        this.element = Component.props.target;

        this.renderToDOM(Component);
  }
  renderToDOM(Component) {
    if(Component.props.target.length > 0) {
        render(
            Component, Component.props.target[0]
        );
    }
  }
}

class App_Build {
    constructor() {
        this.site = Site;
        
        this.newsletter();
        this.popup();
    }
    newsletter() {
        //<Popup html={DOM} target={DOM} cookies={bool} targetUrl={href} delay={NUM} customFunction={func} auto={bool}/>         
        const html = $('.sqs-block.newsletter-block.sqs-block-newsletter');
        const target = $('.app-module.popup.newsletter > .js-target');

        this.newsletterPopup = new Module(
            <Newsletter
                html={html}
                target={target}
                cookies={true}
                delay={1000}
            />
        );
    }
    popup() {
        //if user selects product that is out of stock lightbox appears
        const productPage = $(".ProductItem");

        if (productPage.length > 0) {

            const targetUrl = this.site.host + '/out-of-stock-form';
            const target = $('.app-module.out-of-stock > .js-target');

            this.productpagePopup = new Module(
                <Popup
                    targetUrl={targetUrl}
                    target={target}
                    delay={100}
                    displayName={'Out of Stock Popup'}
                /> 
            );
        };
    }
};

$(window).on("load", () => {
    const App = new App_Build();
    window._App = App;  
});



