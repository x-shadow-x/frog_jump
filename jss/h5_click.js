//if the game not in iframe h5wap_5054399_comclicks is gameid
if (typeof(gameid) == 'undefined') { //iframe window
	var gameid = 0;
}
if (gameid == 0) {
	if (typeof(h5wap_5054399_comclicks) == 'undefined') { //top window
		var gameid = 0;
	} else {
		var gameid = h5wap_5054399_comclicks;
	}
}
(function() {
	var rC = function(n) {
		var c = (('; ' + document.cookie).split('; ' + n + '=')[1] || '') + ';';
		return decodeURIComponent(c.substring(0, c.indexOf(';')));
	};
	var wC = function(n, v, d, t) {
		var e;
		if (t) {
			var dt = new Date();
			dt.setTime(dt.getTime() + (t * 86400000));
			e = "; expires=" + dt.toGMTString()
		} else {
			e = ""
		}
		document.cookie = n + "=" + encodeURIComponent(v) + e + "; path=/; domain=." + d
	};
	var gI = function() {
		var now = String((new Date()).getTime());
		var data = window._4399stats || {};
		var _Pauth = rC('4399_HTML5_V2_UDB');
		data.uid = (_Pauth == '') ? '' : (_Pauth.split('|'))[0];
		var _vid = rC('_4399stats_vid');
		if (_vid == "") {
			data.vid = now + String(parseInt(Math.random() * 10000));
			wC('_4399stats_vid', data.vid, '4399.com', 9999)
		} else {
			data.vid = _vid
		}
		data.m = window.location.href.split('#')[1] || '';
		data.f = rC('_cg_flag') ? 1 : '';
		data.c = rC('_gprp_c') ? 1 : '';
		data.game = gameid;
		var gf = rC('_gprp_f');
		if (gf) {
			gf = gf.split('|');
			data.m = gf[0];
			data.g = gf[1];
		}
		data.t = now;
		data.v = 1;
		var info = [];
		for (var i in data) {
			info.push(i + '=' + encodeURIComponent(data[i]))
		}
		try {
			console.info("http://gprp.4399api.net/s?" + info.join('&'));
			new Image().src = "http://gprp.4399api.net/s?" + info.join('&')
		} catch (e) {}
	};
	gI();
})();