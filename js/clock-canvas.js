!(function($, window, document, undefined) {
	var Clock = function(elem, ctx, opts) {
		this.$element = elem, this.context = ctx, this.defaults = {
			hCol: '#000',
			mCol: '#999',
			sCol: 'red',
			isNumCol: '#000',
			noNumCol: '#ccc',
			dCol: '#fff',
		}, this.options = $.extend({}, this.defaults, opts)
	};
	Clock.prototype = {
		drawBackground: function(_ctx, r, rem, isNumCol, noNumCol) {
			_ctx.save();
			_ctx.translate(r, r);
			_ctx.beginPath();
			_ctx.lineWidth = 10 * rem;


			// _ctx.arc(0, 0, r - _ctx.lineWidth / 2, 0, 2 * Math.PI, false);
			_ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
			_ctx.fillStyle = "#fff";
			_ctx.fill();

			_ctx.beginPath();
			_ctx.arc(0, 0, r - _ctx.lineWidth - 40 * rem, 0, 2 * Math.PI, false);
			var grd = _ctx.createLinearGradient(0, 0, 200, 0);
			grd.addColorStop(0, "#ececec");
			grd.addColorStop(1, "#fbfbfb");
			_ctx.fillStyle = grd;
			_ctx.fill();

			var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
			_ctx.font = 18 * rem + 'px Arial';
			_ctx.textAlign = 'center';
			_ctx.textBaseline = 'middle';
			hourNumbers.forEach(function(number, i) {
				var rad = 2 * Math.PI / 12 * i;
				var x = Math.cos(rad) * (r - 30 * rem);
				var y = Math.sin(rad) * (r - 30 * rem);
				// _ctx.fillText(number, x, y)
				_ctx.fillStyle = '#f90021';
				(number == 3 || number == 6 || number == 9 || number == 12) && _ctx.fillText(number, x, y)

			});
			for (var i = 0; i < 60; i++) {
				var rad = 2 * Math.PI / 60 * i;
				var x = Math.cos(rad) * (r - 16 * rem);
				var y = Math.sin(rad) * (r - 16 * rem);
				_ctx.beginPath();
				// if (i % 5 == 0) {

				if (i % 15 == 0) {
					_ctx.fillStyle = isNumCol;
					_ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
				}

				//  else {
				// 	_ctx.fillStyle = noNumCol;
				// 	_ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
				// }
				_ctx.fill()
			}
		},
		drawHour: function(_ctx, r, rem, hour, minute, hCol) {
			var radH = 2 * Math.PI / 12 * hour;
			var radM = 2 * Math.PI / 12 / 60 * minute;
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(radH + radM);
			_ctx.strokeStyle = hCol;
			_ctx.lineWidth = 6 * rem;
			_ctx.lineCap = "round";
			_ctx.moveTo(0, 10 * rem);
			_ctx.lineTo(0, -r / 2);
			_ctx.stroke();
			_ctx.restore()
		},
		drawMinute: function(_ctx, r, rem, minute, mCol) {
			var rad = 2 * Math.PI / 60 * minute;
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(rad);
			_ctx.strokeStyle = mCol;
			_ctx.lineWidth = 3 * rem;
			_ctx.lineCap = "round";
			_ctx.moveTo(0, 10 * rem);
			_ctx.lineTo(0, -r + 25 * rem);
			_ctx.stroke();
			_ctx.restore()
		},
		drawSecond: function(_ctx, r, rem, second, sCol) {
			var rad = 2 * Math.PI / 60 * second;
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(rad);
			_ctx.fillStyle = sCol;
			_ctx.moveTo(-2 * rem, 20 * rem);
			_ctx.lineTo(2 * rem, 20 * rem);
			_ctx.lineTo(1, -r + 20 * rem);
			_ctx.lineTo(-1, -r + 20 * rem);
			_ctx.fill();
			_ctx.restore()
		},
		drawDot: function(_ctx, r, rem, dCol) {
			_ctx.beginPath();
			_ctx.fillStyle = dCol;
			_ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
			_ctx.fill()
		},
		draw: function() {
			var width = this.$element.width(),
				height = this.$element.height(),
				_ctx = this.context,
				r = width / 2,
				rem = width / 200,
				isNumCol = this.options.isNumCol,
				noNumCol = this.options.noNumCol,
				hCol = this.options.hCol,
				mCol = this.options.mCol,
				sCol = this.options.sCol,
				dCol = this.options.mCol;
			var date = new Date(),
				hour = date.getHours(),
				minute = date.getMinutes(),
				second = date.getSeconds();
			_ctx.clearRect(0, 0, width, height);
			this.drawBackground(_ctx, r, rem, isNumCol, noNumCol);
			this.drawHour(_ctx, r, rem, hour, minute, hCol);
			this.drawMinute(_ctx, r, rem, minute, mCol);
			this.drawSecond(_ctx, r, rem, second, sCol);
			this.drawDot(_ctx, r, rem, dCol);
			_ctx.restore()

		}
	};
	$.fn.drawClock = function(options) {
		var _self = this;
		var ctx = this.get(0).getContext('2d');

		function draw() {
			var clock = new Clock(_self, ctx, options);
			clock.draw()
		}
		draw()
		setInterval(function() {
			draw()
		}, 1000)
	}
})(jQuery, window, document);