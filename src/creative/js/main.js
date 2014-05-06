(function(){
	var arr_jin_nang_regexp = [/^【过河拆桥.{2}】$/, /^【顺手牵羊.{2}】$/, /^【无中生有.{2}】$/, /^【无懈可击.{2}】$/, /^【南蛮入侵.{2}】$/, /^【决斗.{2}】$/, /^【借刀杀人.{2}】$/, /^【五谷丰登.{2}】$/, /^【万箭齐发.{2}】$/, /^【桃园结义.{2}】$/, /^【乐不思蜀.{2}】$/, /^【兵粮寸断.{2}】$/],
	arr_zhuang_bei_regexp = [/^【诸葛连弩.{2}】$/, /^【雌雄双股剑.{2}】$/, /^【青钢剑.{2}】$/, /^【寒冰剑.{2}】$/, /^【贯石斧.{2}】$/, /^【青龙偃月刀.{2}】$/, /^【丈八蛇矛.{2}】$/, /^【方天画戟.{2}】$/, /^【麒麟弓.{2}】$/, /^【八卦阵.{2}】$/, /^【仁王盾.{2}】$/, /^【的卢.{2}】$/, /^【赤兔.{2}】$/, /^【爪黄飞电.{2}】$/, /^【绝影.{2}】$/, /^【大宛.{2}】$/, /^【紫骍.{2}】$/],
	arr_ji_ben_regexp = [/^【杀.{2}】$/, /^【闪.{2}】$/, /^【桃.{2}】$/];


	var zhi_heng_regexp = /“制衡”/,
		qing_nang_regexp = /“青囊”/,
		jie_yin_regexp = /“结姻”/, //制衡,青囊,结姻的重复描述
		ren_de_regexp = /“仁德”/, //仁德给可见视角
		wugu_regexp = /【五谷丰登】/, //五谷拿牌

		sb_equiped = /([\u4e00-\u9fa5]){2,3}装备了/, //装备区的装备不算入弃牌
		sb_huo_de = /[\u4e00-\u9fa5]{2,3}\(*[\u4e00-\u9fa5]*\)*获得/, //突袭,顺手获得可见视角的手牌				
		sb_mo_pai = /[\u4e00-\u9fa5]{2,3}\(*[\u4e00-\u9fa5]*\)*从牌/; //可见视角从牌堆摸牌

	var arr_jin_nang_py = ['ghcq', 'ssqy', 'wzsy', 'wxkj', 'nmrq', 'jd', 'jdsr', 'wgfd', 'wjqf', 'tyjy', 'lbss', 'blcd'],
		arr_zhuang_bei_py = ['zgln', 'cxsgj', 'qgj', 'hbj', 'gsf', 'qlyyd', 'zbsm', 'fthj', 'qlg', 'bgz', 'rwd', 'plus1', 'minus1'],
		arr_ji_ben_py = ['sha', 'shan', 'tao'];

	var jin_nang = $("#jin-nang"),
		zhuang_bei = $("#zhuang-bei"),
		ji_ben = $("#ji-ben"),
		len_jin_nang = arr_jin_nang_py.length,
		len_zhuang_bei = arr_zhuang_bei_py.length,
		len_ji_ben = arr_ji_ben_py.length;

	var num_jin_nang = new Array(),
		num_zhuang_bei = new Array(),
		num_ji_ben = new Array(),

		jin_nang_append = new Array(),
		zhuang_bei_append = new Array(),
		ji_ben_append = new Array();

	for (var i = 0, il = len_jin_nang; i < il; i++) {
		num_jin_nang[i] = 0;
		jin_nang_append[i] = '<li class="sgs-cards-used"><canvas class="canvas" width="50" height="70" data-name=' + arr_jin_nang_py[i] + '></canvas>' + '<span class="cards-num-' + arr_jin_nang_py[i] + '">X' + 0 + '</span>' + '</li>';
	}
	for (var i = 0, il = len_zhuang_bei; i < il; i++) {
		num_zhuang_bei[i] = 0;
		zhuang_bei_append[i] = '<li class="sgs-cards-used"><canvas class="canvas" width="50" height="70" data-name=' + arr_zhuang_bei_py[i] + '></canvas>' + '<span class="cards-num-' + arr_zhuang_bei_py[i] + '">X' + 0 + '</span>' + '</li>';
	}
	for (var i = 0, il = len_ji_ben; i < il; i++) {
		num_ji_ben[i] = 0;
		ji_ben_append[i] = '<li class="sgs-cards-used"><canvas class="canvas" width="50" height="70" data-name=' + arr_ji_ben_py[i] + '></canvas>' + '<span class="cards-num-' + arr_ji_ben_py[i] + '">X' + 0 + '</span>' + '</li>';
	}

	$(document).ready(function() {
		sgs_note_init();
		get_img();
		sgs_cards_used();
	})

	function sgs_cards_used() {
		var file_select = document.getElementById("file-select"),
			file_drag = document.getElementById("file-drag"),
			body = document.getElementById("body"),
			the_body = $("body");
		//	file_drag.addEventListener("drop", show, false);
		file_select.addEventListener("change", show, false);
		body.addEventListener("drop", function() {
			show();
			the_body.find(".no-select").removeClass('no-select-css').remove();
		}, false);
		body.addEventListener("change", show, false);
	}

	function sgs_note_init() {
		for (var i = 0, il = len_jin_nang; i < il; i++) {
			jin_nang.find('ul').append(jin_nang_append[i]);
		}
		for (var i = 0, il = len_zhuang_bei; i < il; i++) {
			zhuang_bei.find('ul').append(zhuang_bei_append[i]);
		}
		for (var i = 0, il = len_ji_ben; i < il; i++) {
			ji_ben.find('ul').append(ji_ben_append[i]);
		}
	}

	function show() {
		setTimeout(function() {
			$('font[color="#ffff00"]').each(function() {
				if (zhi_heng_regexp.test($(this).text())) {
					$(this).parent().remove();
				}
				if (qing_nang_regexp.test($(this).text())) {
					$(this).parent().remove();
				}
				if (jie_yin_regexp.test($(this).text())) {
					$(this).parent().remove();
				}
				if (ren_de_regexp.test($(this).text())) {
					$(this).parent().remove();
				}
			})
			$('font[color="#FFFF00"]').each(function() {
				if (wugu_regexp.test($(this).text())) {
					$(this).parent().remove();
				}
			})
			$('font[color="#f6de9c"]').each(function() {
				if (sb_equiped.test($(this).text())) {
					$(this).remove();
				}
				if (sb_huo_de.test($(this).text())) {
					$(this).remove();
				}
				if (sb_mo_pai.test($(this).text())) {
					$(this).remove();
				}
			})


			var cards_used = $('font[color="#FFFF00"]').find('font[color="#FFFF00"]');
			cards_used.each(function() {
				for (var i = 0, il = len_jin_nang; i < il; i++) {
					if (arr_jin_nang_regexp[i].test($(this).text())) {
						num_jin_nang[i] += 1;
					}
					var $num_cards_jin_nang = $('.cards-num-' + arr_jin_nang_py[i]);
					$num_cards_jin_nang.html('X' + num_jin_nang[i]);
					if (num_jin_nang[i] !== 0) {
						$num_cards_jin_nang.addClass("have-used");
					} else {
						$num_cards_jin_nang.removeClass("have-used");
					}
				}
				//+1 and -1
				for (var i = len_zhuang_bei; i < len_zhuang_bei + 2; i++) {
					if (arr_zhuang_bei_regexp[i].test($(this).text())) {
						num_zhuang_bei[len_zhuang_bei - 2] += 1;
					}
				}
				for (var i = len_zhuang_bei + 2; i < len_zhuang_bei + 4; i++) {
					if (arr_zhuang_bei_regexp[i].test($(this).text())) {
						num_zhuang_bei[len_zhuang_bei - 1] += 1;
					}
				}
				for (var i = 0, il = len_zhuang_bei; i < il; i++) {
					if (arr_zhuang_bei_regexp[i].test($(this).text())) {
						num_zhuang_bei[i] += 1;
					}
					var $num_cards_zhuang_bei = $('.cards-num-' + arr_zhuang_bei_py[i]);
					$num_cards_zhuang_bei.html('X' + num_zhuang_bei[i]);
					if (num_zhuang_bei[i] !== 0) {
						$num_cards_zhuang_bei.addClass("have-used");
					} else {
						$num_cards_zhuang_bei.removeClass("have-used");
					}
				}
				for (var i = 0, il = len_ji_ben; i < il; i++) {
					if (arr_ji_ben_regexp[i].test($(this).text())) {
						num_ji_ben[i] += 1;
					}
					var $num_cards_ji_ben = $('.cards-num-' + arr_ji_ben_py[i]);
					$num_cards_ji_ben.html('X' + num_ji_ben[i]);
					if (num_ji_ben[i] !== 0) {
						$num_cards_ji_ben.addClass("have-used");
					} else {
						$num_cards_ji_ben.removeClass("have-used");
					}
				}
			})

			//clear for next

			for (var i = 0, il = len_jin_nang; i < il; i++) {
				num_jin_nang[i] = 0;
			}
			for (var i = 0, il= len_zhuang_bei; i < il; i++) {
				num_zhuang_bei[i] = 0;
			}
			for (var i = 0, il = len_ji_ben; i < il; i++) {
				num_ji_ben[i] = 0;
			}
		}, 10)
	}

	function equip_zhuang_bei() {

	}

	function get_img() {
		var canvas = $(".canvas"),
			ctx,
			img_name;
		canvas.each(function() {
			img_name = $(this).data("name");
			var self = this,
				img = new Image();
			img.addEventListener('load', function() {
				ctx = self.getContext("2d");
				ctx.drawImage(this, 0, 0, self.width, self.height);
			})
			img.src = "creative/img/" + img_name + ".jpg";
		})
	}
})()
