import React from 'react';
import { Cookie } from '../core/index';
import $ from 'jquery';

class NewsletterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Newsletter';

        if(this.props.html !== undefined){
            this.html = { __html : this.props.html[0].innerHTML };   
            this.className = this.props.html[0].className;           
        }

        this.target = this.props.target[0];
    }
    componentWillMount() {
        const hasBeenVisible = Cookie.get(this.displayName);

        if(!hasBeenVisible == true) {
            this.makeVisible(); 
        }
    }
    componentDidMount(){
        this.closePopupWhenClicked();
    }
    closePopupWhenClicked(){
        $(".close").on("click", () => {
            this.setCookies();
            $(".app-module.popup.newsletter").removeClass("is-rendered");
        });
    }
    makeVisible() {
        setTimeout( () => {
            $('.app-module.newsletter').addClass("is-rendered");
        }, this.props.delay);
    }
    setCookies() {
    	if(this.props.cookies){
    		Cookie.set(this.displayName, true, 365);
    	}
    }
    render() {
        return <div className={this.className} dangerouslySetInnerHTML={this.html} />;
    }
}

export default NewsletterPopup;
