import React from 'react';
import $ from 'jquery';

class OutOfStockPopup extends React.Component {
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
    }
    getForm() {
        //get data from form
        $.ajax({
            data: {format: "json"},
            url: this.props.targetUrl,
            dataType: "jsonp",
            success: (result) => {
                this.setState({html: {__html: result.mainContent} });            
            },
            error: () => {
                this.getForm();
            }
        });
    }
    stockListen() {

        $(".product-variants select").on("change", (e) => {

            const selectedSize = $(e.currentTarget).val();
            const selected = $('.product-variants').attr("data-selected-variant");

            if(selected !== undefined) {

                const data = JSON.parse(selected);
                const title = $('.ProductItem-details-title').html();
               
                if(data.qtyInStock == 0) {
                   //send title value to hidden input form field
                   const hiddenSizeField = $('input[name="SQF_SIZE"]');                  
                   const hiddenItemField = $('input[name="SQF_STORE_ITEM"]');

                   $(hiddenItemField).val(title);
                   $(hiddenSizeField).val(selectedSize);

                   $(".form-wrapper").before("<div id='stockInfo'></div>");
                   $("#stockInfo").html("<p>" + title + " (" + selectedSize + ")</p>");

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
        $("#stockInfo").html("");
        
    	$(".close").on("click", () => {
    		$(".app-module.out-of-stock").removeClass("is-rendered");
    	});
    }
    componentWillMount() {
        this.getForm(); 	     
    }
    componentDidMount() {
        this.closePopupWhenClicked();
        this.stockListen();   
    }
    render() {
        const html = this.state.html;

        return <div className={this.className} dangerouslySetInnerHTML={html} />;
    }
}

export default OutOfStockPopup;
