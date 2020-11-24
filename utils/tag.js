// 去除页面中的标签
const removeTAG = (description) => {
	description = description.replace(/(\n)/g, "");
	description = description.replace(/(\t)/g, "");
	description = description.replace(/(\r)/g, "");
	description = description.replace(/<\/?[^>]*>/g, "");
	description = description.replace(/\s*/g, "");
	description = description.replace('&nbsp;', "");
	description = description.replace('&ldquo;', "");
	description = description.replace('&rdquo;', "");
	return description.substr(0, 50);
}

export default{
	removeTAG
}