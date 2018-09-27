
    // 1.获取当前城市的天气信息
    let tianqi;
    $.ajax({
        type:'get',
        url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=呼和浩特',
        dataType:'jsonp',
        success:function (obj) {
            console.log(obj);
            tianqi = obj.data;
            update(tianqi);
        }
    });
    function update(tianqi) {
        //获取当前的城市
        $('.address .cityc').html(tianqi.city);
        //获取当前城市的天气状况
        $('.kong .down').html(tianqi.weather.quality_level);
        //获取当前城市的温度
        $('.zero').html(tianqi.weather.current_temperature+'°');
        //获取当前城市的天气状况
        $('.qing').html(tianqi.weather.current_condition);
        //获取当前城市的风向
        $('.shi').html(tianqi.weather.wind_direction);
        let level = tianqi.weather.wind_level;
        $(".shi").html(tianqi.weather.wind_direction+level+"级");

        //今天的天气
        $('.second-left .two .high').html(tianqi.weather.dat_high_temperature+'/');
        $('.second-left .two .low').html(tianqi.weather.dat_low_temperature+'°');
        $('.second-left .condation').html(tianqi.weather.data_condition);
        $('.second-left .two img').attr('src','img/'+tianqi.weather.dat_weather_icon_id+'.png');

        //明天的天气
        $('.second-right .two .high').html(tianqi.weather.tomorrow_high_temperature+'/');
        $('.second-right .two .low').html(tianqi.weather.tomorrow_low_temperature+'°');
        $('.second-right .one .conda').html(tianqi.weather.tomorrow_condition);
        $('.second-right .two img').attr('src','img/'+tianqi.weather.tomorrow_weather_icon_id+'.png');

        //未来24小时天气
        let weather = tianqi.weather.hourly_forecast;
        weather.forEach(function (v,i) {
            // console.log(v,i);
            let str = ` <li>
                    <p class="one">${v.hour}:00</p>
                    <img src="img/${weather[i].weather_icon_id}.png" alt="">
                    <p class="two">${v.temperature}°C</p>
                </li>`;
            $('.third ul').append(str);
        });

        //未来15天的天气情况
        // let weathers = tianqi.weather.forecast_list;
        // weathers.forEach(function (v,i) {
        //     let str1 = `<li>
        //                    <p class="one">昨天</p>
        //                    <p class="two">${v.date}</p>
        //                    <p class="three">${data1}</p>
        //                    <img src="img/${v.weather_icon_id}.png" alt="">
        //                </li>`
        // })
    }


    //获取城市
    let city;
    $.ajax({
        type:'get',
        url:'https://www.toutiao.com/stream/widget/local_weather/city/',
        dataType:'jsonp',
        success:function (obj) {
            city = obj.data;
            updateCity(city);
        }
    });
    //获取每一个城市的信息
    function updateCity(city) {
        for(let i in city){
            let str = `<div class="informations">${i}</div>
            `;
            $('.b').append(str);
            console.log(i);
            for(let j in city[i]){
                console.log(j);
                let str1 = `
                <li class = 'city'>${j}</li>
                `;
                $('.b').append(str1);
            }
        }
    }


   
    //点击每个城市，获取当前城市的天气信息
    window.onload = function(){
            $('.city').click(function () {
            $('.wrap').css({'display':'block'});
            $('.citys').css({'display':'none'});
            let con = $(this).html();
            console.log(con);
            ajaxs(con);
        });
    //获取某个城市的天气信息
    function ajaxs(tianqi1) {
        // let url1 'https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}';
        let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`;

        $.ajax({
            type:"get",
            url:url1,
            dataType:"jsonp",
            success:function (obj) {
                let tianqi2 = obj.data;
                update(tianqi2);
            }
        })
    }
     $('.address .cityc').click(function () {
        $('.wrap').css({'display':'none'});
        $('.citys').css({'display':'block'});
        $('.search p').click(function () {
            $('.wrap').css({'display':'block'});
            $('.citys').css({'display':'none'});
        });
    });
     
    //在搜索框内输入内容，可以搜索当前城市的天气情况
    $(".search input").focus(function(){
        $(".search > p").html("搜索");
    })
    //点击搜索时，获取input中输入的的内容
    $(".search > p").click(function(city){      
        let text=$(".search input").val();
        ajaxs(text);
        text=$(".search input").val("");        
    })

       

}


//1.获取默认城市的天气信息
//2.获取所有城市信息
//3.点击每个城市考科一获取当前城市的天气信息
//4.在搜索狂内输入要搜索的城市，几点搜索按钮进行搜索