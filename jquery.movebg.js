(function($){
	$.fn.movebg=function(options){
		var defaults={
		width:120,/*�ƶ���Ĵ�С*/
		speed:300/*���ƶ����ٶ�*/
		};
	var defaultser=$.extend(defaults,options);
	return this.each(function(){
		var _this=$(this);
		var _item=_this.children("ul").children("li").children("a");/*�ҵ��������黬����Ԫ��*/
		var origin=_this.children("ul").children("li.cur").index();/*��õ�ǰ����������*/
		var _mover=_this.find(".move-bg");/*�ҵ�����*/
		var hidden;/*����һ��������html��û�й涨curʱ������Ƴ���������ʧ*/
		if (origin==-1){origin=0;hidden="1"} else{_mover.show()};/*���û�ж���cur,��Ĭ�ϴӵ�һ����������*/
		var cur=prev=origin;/*��ʼ����ǰ������ֵ������һ������ʼֵ;*/
		_mover.css({left:""+defaultser.width*origin+"px"});/*���û��鵱ǰ��ʾ��λ��*/
		
		//������꾭���¼�
		_item.each(function(index,it){
			$(it).mouseover(function(){
				timeoutId = setTimeout(function () {
					cur=index;/*�Ե�ǰ����ֵ���и�ֵ*/
					move();
					prev=cur;/*������ɶ��ϸ�����ֵ���и�ֵ*/
				},200);
			}).mouseout(function(){
				clearTimeout(timeoutId);
			})
		});
		_this.mouseleave(function(){
			timeoutId = setTimeout(function(){
				cur=origin;//����뿪����ʱ��ǰ����ֵ�����������ֵ
				move();
				if(hidden==1){_mover.stop().fadeOut();}/*��html��û�й涨curʱ������Ƴ���������ʧ*/
			},300);
		});
		
		//��������
		function move(){
			_mover.clearQueue();
			_mover.queue(
				function(){
					$(this).show().stop(true,true).animate({left:""+Number(cur*defaultser.width)+""},defaultser.speed),
					function(){$(this).dequeue()}
				}
			);
			_mover.queue(
				function(){
					$(this).stop(true,true).animate({left:""+cur*defaultser.width+""},defaultser.rebound_speed),
					function(){$(this).dequeue()}
				}
			);
		};
	})
	}
})(jQuery);