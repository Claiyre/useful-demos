/**
 * Created by dell on 2016/12/16.
 */
$(function(){
    var show = $('.pop-show'),
        pop = $('.pop'),
        popClose =  $('.pop-close');
    for(let i = 0;i < show.length; i++){
        $(pop[i]).click(() =>{
            $('#pop-bg').show();
            $(show[i]).show(400);
        });
        $(popClose[i]).click(() =>{
            $('#pop-bg').hide();
            $(show[i]).hide(400);
        })
    }
});