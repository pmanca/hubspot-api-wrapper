var hubCache = new Map()

exports.init = obj => {
	if(Object.keys(obj)[0] == "type" && Object.keys(obj)[1] == "value" && Object.keys(obj).length == 2){
		hubCache.set("config",obj)
		return true
	}else{
		return false
	}

}

exports.hubCache = hubCache