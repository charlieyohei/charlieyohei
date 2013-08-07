var FTHGrid = {};
$(window).load(function(){
  var timer = 9000; //シーン切り替え時間
  var cid = 0;
  var bw = 200;
  var bh = 280;
  var sw = 0;
  var sh = 0;
  var col = 0;
  var pre_col = 0;
  var pre_colArray = [];
  var row = 0;
  var count = 0;
  var pcount = 0;
  var loop = 0;
  var stage = $('#stage');
  var stageArray = [];
  var gridArray;
  var imageArray;
  var imageArraySet = [];
  var _numContents;
  var _isOpacity = jQuery.support.opacity;

  function initGrid(){
    var gridcount = $('li',stage).length;
    var removecount = 0;
    if(gridcount==0){
      setGrid();
      return;
    }
    if(!_isOpacity){
      stage.fadeOut(100,setGrid);
      return;
    }
    $('li',stage).each(function(){
      $(this).fadeOut(Math.floor(Math.random()*500)+200,function(){
        removecount ++;
        if(removecount>=gridcount){
          setGrid();
        }
      });
    });
  }

  function setGrid(){
    if(!_isOpacity){
      stage.hide();
    }
    $('li',stage).remove();

      imageArray = imageArraySet[cid] ? imageArraySet[cid] : [];

      var i = imageArray.length, j, t,
        _margin=330,
        _minColumns=3,
        _container=$('#container');

      while(i){
        j = Math.floor(Math.random()*i);
        t = imageArray[--i];
        imageArray[i] = imageArray[j];
        imageArray[j] = t;
      }

      getTopContents("SAKURA");

      sw = $(window).width()-_margin;
      col = Math.floor(sw/bw);
      col = col<=_minColumns? _minColumns : col;
      pre_col = col;
      count = 0;
      imgcount = 0;
      loop = 0;
      sh = _container.height();
      row = Math.ceil(sh/bh);
      sh = row*bh;
      cw = col*bw;
      stage.css({
        'width':cw+'px',
        'height':sh+'px'
      });
      $('#container').css('width',cw+_margin+'px');

      gridArray = [];

      // generate rows
      for(i=0; i<row; i++){
        gridArray[i] = [];
      }

      for(i=0; i<row; i++){
        for(ii=0; ii<col; ii++){
          if(gridArray[i][ii]==undefined || gridArray[i][ii]=='undefined'){
            if(i==0&&ii==0){
              size='l';
              gridArray[i][ii+1] =
              gridArray[i+1][ii] =
              gridArray[i+1][ii+1] = 'null';
            }
            else{
              var n=Math.floor(Math.random() * 30) + 1;
              if(gridArray[i][ii-1]=="s"){
                size="m";
              }
              else{
                size = n<15 ? 's' : 'm' ;
              }
            }
            gridArray[i][ii] = size;
            count ++;
          }
        }
      }
      setImage();
  }

  function getTopContents(name){
    // if you set particular contents,
    // set "_topcontens"
    var _topcontens = name;
    var _regexp = new RegExp( _topcontens );
    var _index = _regexp.test(imageArray[0]['title']) ? 0 : -1;

    if( _index > -1){
      return;
    }

    var i = 0, l = imageArray.length, t;
    for( ; i<l; i++ ){
      if( _regexp.test(imageArray[i]['title']) ){
        _index = i;
        break;
      }
    }

    if( _index < 0 ){
      return;
    }

    t = imageArray[_index];
    imageArray[_index] = imageArray[0];
    imageArray[0] = t;
  }

  function showImage(){//{{{
    for(i=0; i<stageArray[cid].length; i++){
      stage.append(stageArray[cid][i]['src']);
      $('li.'+stageArray[cid][i]['class'],stage).css({ //p class="image i0 l" style="top: left: right: bottom"
        left:stageArray[cid][i]['left']+'px',
        top:stageArray[cid][i]['top']+'px',
        width:stageArray[cid][i]['width']+'px',
        height:stageArray[cid][i]['height']+'px'
      }).hide();
      $('li.'+stageArray[cid][i]['class']+' img',stage).imagesLoaded(function(){
        if(!jQuery.support.opacity){
          stage.hide();
          $(this).closest('li').show();
          stage.fadeIn(400);
        }else{
          $(this).closest('li').fadeIn(Math.floor(Math.random()*500)+700);
        }
      });
    }
      setTimer();
  }//}}}

  function setImage(){
    var objArray = [];
    var count = 0;
    var loop = 0;
    for(i=0; i<gridArray.length; i++){
      for(ii=0; ii<gridArray[i].length; ii++){
        if(gridArray[i][ii]!='null'){
          var l = bw*ii, t = bh*i, o;

          // Sサイズだったときの処理
          if(gridArray[i][ii]=='s'){
            for(var s=0, sl, st; s<4; s++){
              if(s==0){
                sl = l;
                st = t;
              }else if(s==1){
                sl = l+bw/2;
                st = t;
              }else if(s==2){
                sl = l;
                st = t+bh/2;
              }else if(s==3){
                sl = l+bw/2;
                st = t+bh/2;
              }
              o = setHTML(count,loop,'s',bw/2,bh/2,sl,st,250,200);

              count ++;
              objArray.push(o);

              if(count-loop*imageArray.length>=imageArray.length){
                loop ++;
              }
            }
          }

          // Mサイズだったときの処理
          else if(gridArray[i][ii]=='m'){
            o = setHTML(count,loop,'m',bw,bh,l,t,250,200);
          }

          // Lサイズだったときの処理
          else if(gridArray[i][ii]=='l'){
            o = setHTML(count,loop,'l',bw*2,bh*2,l,t,250,300);
          }

          count ++;
          objArray.push(o);

          if(count-loop*imageArray.length>=imageArray.length){
            loop ++;
          }
        }
      }
    }
    stageArray[cid] = objArray;
    pre_colArray[cid] = col;
    pcount = 0;
    if(!_isOpacity){
      $('li img',stage).each(function(){
        $(this).imagesLoaded(function(){
          $(this).closest('li').show();
          pcount ++;
          if(pcount>=$('li',stage).length){
            stage.fadeIn(300);
          }
        });
      })
    }
    setTimer();
  }

  function setHTML(count,loop,size,w,h,l,t,duration,delay){
    var c = count-loop*imageArray.length;
    var img = imageArray[c];

    var $li = document.createElement('li');
    var $a = document.createElement('a');
    var $img = document.createElement('img');

    $li.className = 'i'+count+' '+size;
    $a.href = img['url'];
    $img.src = img['path']; $img.alt = img['title']; $img.width = w; $img.height = h;
    $a.appendChild($img);
    $li.appendChild($a);

    stage.append($li);

    var o = {
      'src':$li.toString(),
      'class':'i'+count,
      'left':l,
      'top':t,
      'width':w,
      'height':h
    };

    $($li)
      .hover(stopTimer,setTimer)
      .css({left:l+'px', top:t+'px', width:w+'px', height:h+'px'})
      .hide();

    if(_isOpacity){
      $($img).imagesLoaded(function(){
          $($li).fadeIn(Math.floor(Math.random()*duration)+delay);
      });
    }
    return o;
  }

  function getHolders(){
    var _wait=[], _ul=$('ul','#holder'), i, l=_ul.length, $a, $img;
    for(i=0;i<l;i++){
      imageArraySet[i] = [];
      _wait[i]=$('li',_ul[i]);
      _wait[i].each(function(){
        $a=$(this).find('a');
        $img=$(this).find('img');
        imageArraySet[i].push({
          'url' :$a.attr('href'),
          'path'  :$img.attr('src'),
          'title' :$img.attr('alt'),
          'type'  :$(this).attr('class')
        });
      });
    }
    _numContents=l;
    initGrid();
  }

  function stopTimer(){
    if(FTHGrid.rtTimer){
      clearInterval(FTHGrid.rtTimer);
    }
  }

  function setTimer(){
    stopTimer();
    FTHGrid.rtTimer = setInterval(function(){
      cid = cid==_numContents-1 ? 0 : ++cid;
      initGrid();
    },timer);
  }

  ;(function($){
    getHolders();
    $(window).resize(function(){
      sw = $(window).width()-330;
      col = Math.floor(sw/bw);
      col = col<=3? 3 : col;
      if(pre_col!=col && $(window).width()>800){
        clearInterval(FTHGrid.rtTimer);
        setTimer();
        setGrid();
      }
    });
  })($);
});
