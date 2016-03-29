---
---

var subjects = [
	{% for page in site.pages %}
		{% if page.title %}
			{
				title:"{{ page.title }}",
				permalink:"{{ page.permalink }}",
			},
		{% endif %}
	{% endfor %}
];

var lastSubject = null;
function getRandomSubject() {
	var candidate = subjects[Math.floor(Math.random() * subjects.length)];
	return candidate;
	/*
	while(true) {
		if(JSON.stringify(candidate) != JSON.stringify(lastSubject)) {
			lastSubject = candidate;
			return candidate;
		}
	}
	*/
}

function updateCard() {
	var subjectNode = document.getElementById("subject");
	var subjectObj = getRandomSubject();
	subjectNode.innerHTML = subjectObj.title.toLowerCase();
	var qrCodeNode = document.getElementById("qrcode");
	while(qrCodeNode.firstChild) {
		qrCodeNode.removeChild(qrCodeNode.firstChild);
	}
	$('#qrcode').qrcode("{{ site.url }}" + subjectObj.permalink);
}

function clickCallback() {
	$('#spinner').fadeOut(200, updateCard);
	$('#spinner').fadeIn(200);
}

document.addEventListener("click", clickCallback);
document.body.click();
