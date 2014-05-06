var _body = $("body"),
	link = $('link')[0],
	main = $("#main"),
	header = $("header"),
	container = header.find('.container'),
	icon_menu = header.find('.icon-menu'),
	icon_close = header.find('.icon-close'),
	select_bg = $("#select-bg"),
	li_h = header.find("li"),
	li_a = li_h.find("a"),
	page = $(".page"),
	page1 = $("#page1"),
	page2 = $("#page2"),
	page3 = $("#page3"),
	page4 = $("#page4"),

	page_now = 1,
	ex_cl = 1;

var isFirefox = navigator.userAgent.indexOf("Firefox") != -1,
	isIE = navigator.userAgent.toLowerCase().search(/(msie\s|trident.*rv:)([\w.]+)/) != -1,
	isWebki = navigator.userAgent.toLowerCase().search(/(webkit)[ \/]([\w.]+)/) != -1,
	mousewheel = isFirefox ? "DOMMouseScroll" : "mousewheel";
_body.bind(mousewheel + " keydown", function(e) {
	if (page.hasClass("page-moving")) {
		return false;
	}
	var delta = isFirefox ? (-e.originalEvent.detail) : e.originalEvent.wheelDelta;
	if (delta < 0 || 40 == e.which) {
		if (4 == page_now) {
			return false;
		} else {
			container.removeClass('active' + page_now);
			icon_menu.removeClass('active' + page_now);
			icon_close.removeClass('active' + page_now);
			select_bg.removeClass('active' + page_now);
			page_now += 1;
		}
		page_move();
	} else
	if (delta > 0 || 38 == e.which) {
		if (1 == page_now) {
			return false;
		} else {
			container.removeClass('active' + page_now);
			icon_menu.removeClass('active' + page_now);
			icon_close.removeClass('active' + page_now);
			select_bg.removeClass('active' + page_now);
			page_now -= 1;
		}
		page_move();
	}
	e.preventDefault();
});
icon_menu.on('click', function() {
	if (1 == ex_cl) {
		menu_expand();
	} else {
		menu_close();
	}
})
icon_close.on('click', function() {
	menu_close();
})
li_h.each(function() {
	$(this).on('click', function() {
		if (page.hasClass("page-moving")) {
			return false;
		}
		container.removeClass('active' + page_now);
		icon_menu.removeClass('active' + page_now);
		icon_close.removeClass('active' + page_now);
		select_bg.removeClass('active' + page_now);
		page_now = $(this).index() + 1;
		page_move();
	})
})

function page_move() {
	// li_h.removeClass("active");
	// header.find('li:nth-child(' + page_now +')').addClass("active");
	link.href = 'creative/img/icos/favicon'+ page_now + '.ico';
	container.addClass('active' + page_now);
	icon_menu.addClass('active' + page_now);
	icon_close.addClass('active' + page_now);
	select_bg.addClass('active' + page_now).css('transform', 'translateX(' + (page_now - 1) * 90 + 'px)');
	page.addClass("page-moving").css('transform', 'translateY(-' + (page_now - 1) * 100 + '%)');
	setTimeout(function() {
		page.removeClass("page-moving");
	}, 1000)
}

function menu_expand() {
	icon_menu.addClass('header-ex');
	select_bg.css({
		opacity: 1
	});
	li_h.css({
		width: 90
	});
	setTimeout(function() {
		li_a.css({
			opacity: 1
		});
		icon_close.css({
			display: 'block'
		});
	}, 300)
	ex_cl = 0;
}

function menu_close() {
	icon_menu.removeClass('header-ex');
	select_bg.css({
		opacity: 0
	});
	setTimeout(function() {
		li_h.css({
			width: 0
		});
		icon_close.css({
			display: 'none'
		});
	}, 300)
	li_a.css({
		opacity: 0
	});
	ex_cl = 1;
}