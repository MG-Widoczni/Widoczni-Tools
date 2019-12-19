
// Skrypt 1. Podświetlenie domen klientów w wynikach wyszukiwania.

function getResults() {

const domains = new Array();
const urls = new Array();

	document.querySelectorAll('div.r').forEach(function (results) {
		var link = results.childNodes[0];
		var href = link.getAttribute("href");
		var url = href.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
		var domain = href.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
		domains.push(domain);
		urls.push(url);
	});	
	     	$.ajax({
	            type: "POST",
	            url: "https://mgabryel.com/enhanced-results.php",
	            data: {'domena':domains, 'url':urls},
	            success: function(data){
					 document.querySelectorAll('div.r').forEach(function (enhance) {
						 var links = enhance.childNodes[0];
				 		 var hrefs = links.getAttribute("href");
				 		 var hrefs = hrefs.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
						 if (data.includes(hrefs)) {
							var enhanceParent = enhance.parentNode;
						 	enhanceParent.setAttribute("style", "box-shadow: 1px 1px 10px 1px green; padding: 10px;");
						 } else {
						 	// do nothing
						 }
				  	  });
	            }
	            });
}

// Skrypt 2. Rozszerzenie GAKPT'a o funkcję kopiowania i sprawdzenia frazy w Google.

function onScroll() {
    document.querySelectorAll('div.particle-table-row').forEach(function (copyElement) {
         if (copyElement.className != 'particle-table-row group-header') {
            var button = document.createElement('button');
            button.id = 'copy';
            button.type = 'button';
            button.innerText = 'Kopiuj';
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.id = "keywordCheck";
            var googleIcon = document.createElement('span');
            googleIcon.id = 'google-icon';

            var essCellKeyword = copyElement.childNodes[1];
            var keywordText = essCellKeyword.childNodes[0];
            var divKeyword = keywordText.childNodes[0];
            var spanKeyword = divKeyword.childNodes[0];
            var keywordContent = spanKeyword.textContent;
            if (!spanKeyword.contains(spanKeyword.querySelector('button'))) {
                spanKeyword.appendChild(button);
                spanKeyword.insertBefore(checkbox, spanKeyword.firstChild);
                spanKeyword.appendChild(googleIcon);
                googleIcon.innerHTML = '<a target="_blank" href="https://www.google.com/search?q=' + keywordContent + '"><img src="https://mgabryel.com/search-icon.png"></a>';
            }
            else {
            }
			
            var essCellPopularity = copyElement.childNodes[2];
            var popularityValue = essCellPopularity.childNodes[0];
            var toClipboard = keywordContent + '	' + popularityValue.textContent;

            button.addEventListener('click', function () {
                copyStringToClipboard(toClipboard);
                button.blur();
                button.innerText = 'Skopiowane!';
                setTimeout(function () {
                    button.innerText = 'Kopiuj';
                }, 2000);
            });
        }
    });
}

function start() {
	window.addEventListener('scroll', onScroll());
    setTimeout(function() { document.querySelector('div.ideas-card').click(); }, 1000);
    setTimeout(function() { document.querySelector('.input-container').addEventListener("keypress", function (e) {
        if (e.key === 'Enter' && (!document.body.contains(document.getElementById('copy-all') || document.getElementById('copy-selected')) )) {
            createButtons();
            onScroll()
        }
    }); }, 3000);
    setTimeout(function() { document.querySelector('.get-results-button').onclick = createButtons; onScroll; }, 4000);
    	document.addEventListener("keypress", function (y) {
        if (y.keyCode == 32) {
            onScroll();
            if (!document.body.contains(document.getElementById('copy-all') || document.getElementById('copy-selected')) ) {
                createButtons();
            }
        }
    });
}

function createButtons() {
    var rightPanel = document.querySelector('div.right-panel');
    var allButton = document.createElement('div');
    var selectedButton = document.createElement('div');
    allButton.innerHTML = '<button id="copy-all" type="button">Kopiuj Wszystkie</button>';
    selectedButton.innerHTML = '<button id="copy-selected" type="button">Kopiuj Zaznaczone</button>';
    rightPanel.insertBefore(allButton, rightPanel.firstChild);
    rightPanel.insertBefore(selectedButton, rightPanel.firstChild);
    allButton.addEventListener('click', function () {
        copyAll();
        var copyAllButton = document.getElementById('copy-all');
        copyAllButton.innerText = 'Skopiowane!';
        setTimeout(function () {
            copyAllButton.innerText = 'Kopiuj Wszystkie';
        }, 2000);
    });
    selectedButton.addEventListener('click', function () {
        copySelected();
        var copySelectedButton = document.getElementById('copy-selected');
        copySelectedButton.innerText = 'Skopiowane!';
        setTimeout(function () {
            copySelectedButton.innerText = 'Kopiuj Zaznaczone';
        }, 2000);
    });
}

function copyStringToClipboard (str) {
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
}

function copySelected() {
    var keywords = document.querySelectorAll(".particle-table-row");
    if (!document.body.contains(document.querySelector('textarea.fakediv'))) {
        var textarea = document.createElement('textarea');
        textarea.className = "fakediv";
        document.body.appendChild(textarea);
    }
    else {
    }
        for (var i = 0; i < keywords.length; i++) {
            var text = keywords[i].querySelector("span.keyword");
            var popularity = keywords[i].querySelector("span.value-text");
            var checkbox = keywords[i].querySelector("input#keywordCheck");
            if (text != null && popularity != null && checkbox.checked) {
                var textNode = text.childNodes[1];
                textarea.textContent += textNode.textContent + "	" + popularity.textContent + '\r\n';
            }
        }
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

function copyAll() {
    var keywords = document.querySelectorAll(".particle-table-row");
    var textarea = document.createElement('textarea');
    textarea.className = "fakediv";
    document.body.appendChild(textarea);
    for (var i = 0; i < keywords.length; i++) {
        var text = keywords[i].querySelector("span.keyword");
        var popularity = keywords[i].querySelector("span.value-text");
        if (text != null && popularity != null) {
            if (text.childNodes[2].textContent == 'Kopiuj') {
                var textNode = text.childNodes[1];
                textarea.textContent += textNode.textContent + "	" + popularity.textContent + '\r\n';
            } else {
                textarea.textContent += text.textContent + "	" + popularity.textContent + '\r\n';
            }
        }
    }
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// Skrypt 3. Oko Tools

function createAddonOko(){
    var dTools = document.createElement('div');
    dTools.setAttribute('id','oko_tools');
    document.getElementsByTagName('body')[0].appendChild(dTools);
    var dLeft = document.createElement('div');
    dLeft.setAttribute('id','toolsBox');
    document.getElementsByTagName('body')[0].appendChild(dLeft);
    var dRight = document.createElement('div');
    dRight.setAttribute('id','okoBox');
    document.getElementById('oko_tools').appendChild(dRight);

}

function toolsBox(){
    charsCounter();
}

function charsCounter(){
    var chars = document.createElement('div');
    chars.setAttribute('id','chars');

    $(document.body).on('mouseup', function(){
    var text = document.getSelection().toString();
    if (text){
        var length = document.getSelection().toString().length;
        if (length > 0) {
            document.getElementById('toolsBox').appendChild(chars);
            chars.innerHTML = '<p>Chars:<br><span>'+length+'</span></p>';
        }
    } else {
        chars.innerHTML = '';
        document.getElementById('toolsBox').removeChild(chars);
    }
});
}

function okoBox(){

    var items = [
        ['Widok klienta','Klient','http://oko.widoczni.pl/url.php?url='+window.location.hostname+'&szukajpost=1&Submit=Szukaj+URL'],
        ['Frazy klienta','Frazy','http://oko.widoczni.pl/frazy.php?url='+window.location.hostname+'&typ=-historia-'],
        ['CM Klienta','CM K','http://oko.widoczni.pl/cm-zlecenia.php?typ=klient&domena='+window.location.hostname],
		['Dzienniczek','Dzien','http://oko.widoczni.pl/dzienniczek.php'],
        ['Moi klienci','M K','http://oko.widoczni.pl/url.php?typ=my'],
		['Brief','Brief','http://oko.widoczni.pl/plug.php?domena='+window.location.hostname+'&zapytanie=brief'],
        ['Link Building Klient','Linki1','http://oko.widoczni.pl/urll-sz.php?url='+window.location.hostname+'&sort=data'],
        ['Link Building Klient2','Linki2','http://oko.widoczni.pl/zapleczestrona.php?url='+window.location.hostname],
        ['Macierz','Macierz','http://oko.widoczni.pl/plug.php?domena='+window.location.hostname+'&zapytanie=macierz'],
        ['GA','GA','http://oko.widoczni.pl/plug.php?domena='+window.location.hostname+'&zapytanie=ga'],
        ['Nowa Macierz','N Macierz','http://oko.widoczni.pl/plug.php?domena='+window.location.hostname+'&zapytanie=new_macierz'],
        ['CRM Klienta','CRM','http://oko.widoczni.pl/plug.php?domena='+window.location.hostname+'&zapytanie=crm']
    ];

    var dWelcome = document.createElement('p');
    dWelcome.innerHTML = 'OKO Tools <span class="iks">X</span>';
    document.querySelector('#okoBox').appendChild(dWelcome);

    $(".iks").click(function () {
        $("#oko_tools").css("display", "none");
    });

    var arr = new Array(items.lenght);
    for(var i=0;i<items.length;i++){
        arr[i] = document.createElement('input');
        arr[i].setAttribute('onclick',"window.open('"+items[i][2]+"','_blank');");
        arr[i].setAttribute('value',items[i][1]);
        arr[i].setAttribute('type','button');
        arr[i].setAttribute('title',items[i][0]);
        document.getElementById('okoBox').appendChild(arr[i]);
    }
}

function okoTools() {
    createAddonOko();
    toolsBox();
    okoBox();
}


// Skrypt 4. Seo Tools

function createAddonSeo(){
    var dTools = document.createElement('div');
    dTools.setAttribute('id','tools');
    document.getElementsByTagName('body')[0].appendChild(dTools);
    var dLeft = document.createElement('div');
    dLeft.setAttribute('id','toolsBox');
    document.getElementsByTagName('body')[0].appendChild(dLeft);
    var dRight = document.createElement('div');
    dRight.setAttribute('id','seoBox');
    document.getElementById('tools').appendChild(dRight);
}

function toolsBox(){
    charsCounter();
}

function seoBox(){

    var items = [
		['GSC Wybrany URL','GSC URL','http://oko.widoczni.pl/plug.php?zapytanie=gsc_url&domena='+document.location],
 	    ['GSC','GSC','http://oko.widoczni.pl/plug.php?zapytanie=gsc&domena='+window.location.hostname],
        ['Ahrefs','Ahrefs','https://ahrefs.com/site-explorer/overview/v2/subdomains/recent?target='+window.location.hostname],
        ['Senuto','Senuto','https://app.senuto.com/visibility-analysis?domain='+window.location.hostname.replace("www.","")+'&fetch_mode=subdomain'],
 	    ['Cache','C','http://webcache.googleusercontent.com/search?q=cache%3A'+document.location],
        ['TXT Cache','CT','http://webcache.googleusercontent.com/search?strip=1&q=cache%3A'+document.location],
        ['PageSpeed','PS','https://developers.google.com/speed/pagespeed/insights/?hl=pl&url='+document.location],
	    ['Schema Test','MD','https://search.google.com/structured-data/testing-tool/u/0/?hl=pl#url='+window.location],
        ['Robots.TXT','Robots',window.location.protocol+'//'+window.location.hostname+'/robots.txt'],
        ['Mobile Test','Mobile','https://search.google.com/test/mobile-friendly?hl=pl&url='+document.location],
        ['WhoIs','WhoIs','http://whois.domaintools.com/'+window.location.hostname],
        ['WebArchive','Arch','https://web.archive.org/web/*/'+window.location.hostname],
		['Siteliner','SiteLine','http://www.siteliner.com/'+window.location.hostname+'?siteliner=site-dashboard&siteliner-sort=scan_time&siteliner-from=1&siteliner-message='],
		['SemStorm','Sem S','https://app.semstorm.com/explorer/dashboard?competitor_0='+window.location.hostname.replace("www.","")+'&op=and&cc=pl'],
        ['Site100 F0','Site','https://www.google.pl/search?filter=0&num=100&q=site:'+window.location.hostname.replace("www.","")],
		['Raport skutecznosci CM','Rap CM', 'http://oko.widoczni.pl/plug.php?zapytanie=raportcm&domena='+window.location.hostname]
		    ];

    var dWelcome = document.createElement('p');
    dWelcome.innerHTML = 'SEO Tools <span class="yks">X</span>';
    document.querySelector('#seoBox').appendChild(dWelcome);

    $(".yks").click(function () {
        $("#tools").css("display", "none");
    });

    var arr = new Array(items.lenght);
    for(var i=0;i<items.length;i++){
        arr[i] = document.createElement('input');
        arr[i].setAttribute('onclick',"window.open('"+items[i][2]+"','_blank');");
        arr[i].setAttribute('value',items[i][1]);
        arr[i].setAttribute('type','button');
        arr[i].setAttribute('title',items[i][0]);
        document.getElementById('seoBox').appendChild(arr[i]);
    }
}

function seoTopGenerator(enabl){

    var dTop = document.createElement('div');
    var topContent = document.createElement('div');

    var description,canonical;
    var metas = document.getElementsByTagName('meta');
    var erro = 0;
    var descClass = "", canoClass = "";

    for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("name") == "description") {
            description = metas[i].getAttribute("content");
            erro++;
        }

    }
    if(erro > 1 || description.length > 320){
        descClass = " red";
    }
    erro = 0;

    var links = document.getElementsByTagName('link');
    for (var j=0; j<links.length; j++) {
        if (links[j].getAttribute('rel') == 'canonical') {
            canonical = links[j].getAttribute('href');
            erro = 0;
        }
    }
    if(erro > 1){
        canoClass = " red";
    }
    erro = 0;

    if(enabl === true){

        dTop.setAttribute('id','seoTop');
        document.getElementsByTagName('body')[0].appendChild(dTop);
        topContent.setAttribute('id','seoTopContent');
        document.getElementById('seoTop').appendChild(topContent);

        topContent.innerHTML = '<span>Tytuł ('+document.title.length+'): '+document.title+'</span><hr><span class="desc '+descClass+'">Opis ('+description.length+'): '+description+'</span><hr><span style="'+canoClass+'">Canonical: '+canonical+'</span>';

        document.getElementsByTagName("body")[0].style["margin-top"] = "82px";
        document.getElementsByTagName("body")[0].style.position = "relative";
    } else if(enabl === false){
        document.getElementById('seoTop').removeChild(document.getElementById('seoTopContent'));
        document.getElementsByTagName("body")[0].removeChild(document.getElementById('seoTop'));
        document.getElementsByTagName("body")[0].style["margin-top"] = "0px";
    }
}

function mouseTrap(){
    var topEnable = false;
    Mousetrap.bind('alt+q', function(e) {
        topEnable = !topEnable;
        seoTopGenerator(topEnable);
    });
}

function seoTools() {
    createAddonSeo();
    seoBox();
}


// Skrypt 5. SERP Count

function serpCount(){
	
    var start;
    var url = new URL(document.location);
    const params = new URLSearchParams(url.search); 

    if(params.get('start') !== null){
        start = parseInt(params.get('start'))+1;
    }else{
        start = 1;
    }

      var serp = document.getElementsByClassName("g"), len = serp !== null ? serp.length : 0, i = 0;   
      for(i; i < len; i++) {
          var lp = document.createElement('span');
          if(lp === null){
          } else {
              lp.innerHTML = ' - '+parseInt(i+start);
              if($(".iUh30")[i] === null) {
              } else {
                  $(".iUh30")[i].append(lp);
              }
          }
      }
}


// Funkcja startowa

function init() {
    if (window.location.hostname == 'www.google.com') { 
		getResults();
		serpCount()
	};
	
	if (window.location.hostname == 'ads.google.com') {
		window.onload = function(){
		   setTimeout(function(){
		       start();
			   
		   }, 2000);
		};
	};
	
	if ( (window.location.hostname != 'oko.widoczni.com') && (window.location.hostname != 'www.google.com') && (window.location.hostname != 'app.asana.com') ) {
		 seoTools();
	     okoTools();
	};
	

}

document.addEventListener("DOMContentLoaded", init());
