import $ from 'jquery';

class Ajax_$ {
	constructor(){
		this.get = this.get;
	}
	get(url, options){
        return $.ajax({
            data: options,
            url: url,
            dataType: "jsonp",
            success: (result) => {
                return result;
                console.log(result);
            }
        });
	}
};

const HTTP = new Ajax_$();

export default HTTP;