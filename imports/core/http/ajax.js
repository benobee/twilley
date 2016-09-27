import $ from 'properjs-hobo';

class Ajax_$ {
	constructor(){
		this.get = this.get;
	}
	get(url, options){
        return $.ajax({
            // String url
            url: url,

            // Object hash to pass to endpoint
            data: options,

            // This can be "html", "json" or "jsonp"
            dataType: "jsonp",

            // The request method type, "POST" etc...
            method: "GET",

            // This is for passing headers
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }

        }).then(( response ) => {
            return response;

        }).catch(( error ) => {
            return error;
        });
	}
};

const HTTP = new Ajax_$();

export default HTTP;