import React from 'react';
import $ from 'jquery-slim';
import { HTTP } from '../core/index';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = this.props.displayName;
        this.state = {
            html : undefined
        }

        if(this.html !== undefined) {
            this.state.html = { __html : this.props.html[0].innerHTML };
            this.className = this.props.html[0].className;
        }

        this.target = this.props.target[0];
        this.getForm();

        //console.log(this);
    }
    getForm() {
        //get data from form 
        const request = HTTP.get(this.props.targetUrl, {format: "json"});

        $.when(request).then( (data) => {
            this.setState({html: {__html: data.mainContent} });
        });
    }
    stockListen(){

        $(".product-variants select").on("change", () => {

            const selected = $('.product-variants').attr("data-selected-variant");

            if(selected !== undefined){

                const data = JSON.parse(selected);
                const title = $('.ProductItem-details-title').html();
               
                if(data.qtyInStock == 0){
                   //send title value to hidden input form field
                   const hiddenItemField = $('input[name="SQF_STORE_ITEM"]');

                   $(hiddenItemField).val(title);

                   this.makeVisible();
                }
            }
        });            

    }
    makeVisible() {
        setTimeout( () => {
            $('.app-module.out-of-stock').addClass("is-rendered");
        }, this.props.delay);  
    }
    closePopupWhenClicked(){
    	$(".close").on("click", () => {
    		$(".app-module.out-of-stock").removeClass("is-rendered");
    	});
    }
    componentWillMount() {
    	this.closePopupWhenClicked();
        this.stockListen();   	     
    }
    render() {
        return <div className={this.className} dangerouslySetInnerHTML={this.state.html} />;
    }
}

export default Popup;
