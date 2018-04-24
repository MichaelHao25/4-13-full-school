var mySwiper = new Swiper('.banner .swiper-container', {
	loop: true,
	autoplay: 3000,
	pagination: '.banner .swiper-pagination',
	paginationClickable: true,
	autoplayDisableOnInteraction: false,
})
var mySwiper = new Swiper('.hot-new .swiper-container', {
	loop: true,
	autoplay: 3000,
	direction: 'vertical',
	slidesPerView: 2,
	spaceBetween: 10,
	autoplayDisableOnInteraction: false,
})
var mySwiper = new Swiper('.notice .swiper-container', {
	loop: true,
	nextButton: '.notice .swiper-button-next',
	prevButton: '.notice .swiper-button-prev',
})

var mySwiper = new Swiper('.bb-notice .swiper-container', {
	loop: true,
	autoplay: 3000,
	direction: 'vertical',
	autoplayDisableOnInteraction: false,
})


$('#clock').attr('width', $('.bb_2 .clock .wrap').width())
$('#clock').attr('height', $('.bb_2 .clock .wrap').height())

$("#clock").drawClock({
	hCol: '#222222', // 时针颜色
	mCol: '#222222', // 时针颜色
	sCol: '#f90020', // 时针颜色
	isNumCol: '#ff3419', // 数字所在的点颜色
	noNumCol: '#fff', // 非数字所在的点颜色
	dCol: '#acacac', // 中心圈颜色
});



$('#progress').attr('width', $('.bb_2 .w50 .sign-in .progress').width());
$('#progress').attr('height', $('.bb_2 .w50 .sign-in .progress').height());



function progress_bar() {
	var _ctx = document.getElementById('progress').getContext("2d"),
		progress = parseInt($('#progress').attr('data-progress')),
		width = $('#progress').width(),
		height = $('#progress').height(),
		rem = width / 200,
		r = width / 2,
		timer = 0,
		count = 0,
		i = 0;



	_ctx.translate(r, r);

	function going(progress) {

		_ctx.clearRect(-r, -r, width, height);

		_ctx.beginPath();
		_ctx.lineWidth = 5 * rem;
		_ctx.arc(0, 0, r - _ctx.lineWidth / 2, 0, 2 * Math.PI, false);
		_ctx.strokeStyle = "#fff";
		_ctx.stroke();


		_ctx.font = 46 * rem + "px Arial bold";
		_ctx.fillStyle = '#fff'
		if (progress < 10) {
			_ctx.fillText(progress, -23 * rem, 0);
		} else {
			if (progress == 100) {
				_ctx.fillText(progress, -60 * rem, 0);
			} else {
				_ctx.fillText(progress, -46 * rem, 0);
			}
		}

		_ctx.font = 26 * rem + "px Arial";
		_ctx.fillStyle = '#fff'
		if (progress == 100) {
			_ctx.fillText("%", 23 * rem, 0);
		} else {
			_ctx.fillText("%", 10 * rem, 0);
		}



		_ctx.font = 16 * rem + "px Arial";
		_ctx.fillStyle = '#fff'
		_ctx.fillText("签到率", -16 * rem * 1.5, 1.5 * 16 * rem);
		_ctx.beginPath();

		_ctx.rotate(-90 * Math.PI / 180);

		_ctx.lineWidth = 10 * rem;
		_ctx.arc(0, 0, r - _ctx.lineWidth / 2, 0, 2 * Math.PI * progress / 100, false);
		_ctx.strokeStyle = "#ffc211";
		_ctx.stroke();

		_ctx.rotate(90 * Math.PI / 180);

	}

	function animation(progress) {
		timer = setInterval(function() {
			if (i != progress) {
				if (i < progress) {
					i++;
					going(i);
				} else {
					i--;
					going(i);
				}
			} else {
				clearInterval(timer);
			}
		}, 20, progress);

	}
	animation(progress);
	return animation;
}


var control_progress = new progress_bar()



// control_progress(50);