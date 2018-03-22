$(document).keydown(function (event) {

    switch (event.keyCode) {
        //left
        case 37: MoveLeft(); break;
        //up
        case 38: MoveUp(); break;
        //right
        case 39: MoveRight(); break;
        //down
        case 40: MoveDown(); break;
    }
})


/**
 * 开始游戏
 */
function StartGame() {
    $('.cell').html("").css('background-color', '#ccc0b3');
    $('.cell').css('color', '#776e65');
    $(".cell:eq(0)").html('2').css('color', '#776e65');
    $('.number').html("0");
}



/**
*设置单元格颜色
*/
function SetCellColor(number) {
    switch (number) {
        case 2:
            return "#ccc0b3";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
        default:
            return "#ccc0b3";
            break;
    }

}

/**
*设置字体颜色
*/
function SetCellFontColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

/**
*向左移动事件
*/
function MoveLeft() {
    if (IsGameOver()) {
        layer.msg("Game Over!", { icon: 2 });
        return false;
    }

    var result = LoadResult(); 
    if (result.length != 4) {
        layer.msg("获取数据失败！");
        return false;
    }

    for (var i = 0; i < result.length; i++) {
        result[i] = GetData(result[i], 'left');
    }

    CreateNumber(result);
}

/**
*向右移动事件
*/
function MoveRight() {
    if (IsGameOver()) {
        layer.msg("Game Over!", { icon: 2 });
        return false;
    }

    var result = LoadResult();
    if (result.length != 4) {
        layer.msg("获取数据失败！");
        return false;
    }

    for (var i = 0; i < result.length; i++) {
        result[i] = GetData(result[i], 'right');
    }

    CreateNumber(result);
}

/**
*向上移动事件
*/
function MoveUp() {
    if (IsGameOver()) {
        layer.msg("Game Over!", { icon: 2 });
        return false;
    }

    var result = LoadResult();
    if (result.length != 4) {
        layer.msg("获取数据失败！");
        return false;
    }

    for (var i = 0; i < 4; i++) {

        var arr = GetData([result[0][i], result[1][i], result[2][i], result[3][i]], 'left');
        result[0][i] = arr[0];
        result[1][i] = arr[1];
        result[2][i] = arr[2];
        result[3][i] = arr[3];
        
    }
    CreateNumber(result);
}


/**
*向下移动事件
*/
function MoveDown() {
    if (IsGameOver()) {
        layer.msg("Game Over!", { icon: 2 });
        return false;
    }

    var result = LoadResult();
    if (result.length != 4) {
        layer.msg("获取数据失败！");
        return false;
    }

    for (var i = 0; i < 4; i++) {

        var arr = GetData([result[0][i], result[1][i], result[2][i], result[3][i]], 'right');
        result[0][i] = arr[0];
        result[1][i] = arr[1];
        result[2][i] = arr[2];
        result[3][i] = arr[3];

    }

    CreateNumber(result);
}

/**
 * 传入一个数组，返回移动后的数组
 * @param {any} arr 目标数组
 * @param {any} temp 移动方向
 */
function GetData(arr,temp)
{
    //数组中不为0的索引
    if (temp == "left") {
        for (var i = 0; i < arr.length; i++) {
            var index = -1;
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[j] != 0) {
                    index = j;
                    break;
                }
            }

            //存在不为0的点
            if (index != -1) {
                //当前位置为0，则与不为0的位置交换
                if (arr[i] == 0) {
                    arr[i] = arr[index];
                    arr[index] = 0;
                }
                //当前位置与不为0点相等，当前位置*2，不为0的点重置为0
                else if (arr[i] == arr[index]) {
                    arr[i] = arr[i] * 2;
                    arr[index] = 0;
                }
            }
        }
    }
    else if (temp == "right")
    {
        for (var i = arr.length-1; i > -1; i--){
            var index = -1;
            for (var j = i-1; j > -1; j--) {
                if (arr[j] != 0) {
                    index = j;
                    break;
                }
            }

            //存在不为0的点
            if (index != -1) {
                //当前
                if (arr[i] == 0) {
                    arr[i] = arr[index];
                    arr[index] = 0;
                }
                else if (arr[i] == arr[index]) {
                    arr[i] = arr[i] * 2;
                    arr[index] = 0;
                }
            }
        }
        //alert(arr.join(','));
    }

    return arr;
}

/**
 * 判断游戏是否结束
 */
function IsGameOver() {
    var bool = false;

    var result = LoadResult();
    if (result.length != 4) {
        layer.msg("获取数据失败！");
        bool = true;
        return false;
    }

    //判断每一行时候可以移动或者相加
    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].length - 1; j++) {
            //0 表示还有空值
            if ($.inArray(0, result[i]) > -1) {
                bool = false;
                return false;
            }

            if (result[i][j] == result[i][j + 1]) {
                bool = false;
                return false;
            }


            bool = true; 

        }
    }


    //判断每一列时候可以移动或者相加
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (result[j][i] == result[j + 1][i]) {
                bool = false;
                return false;
            }

            bool = true; 
        }
    }

    return bool;

}


/**
 * 获取当前4*4的表格值，返回数组
 */
function LoadResult() {
    var result = [];
    $('.content>div').each(function () {
        var row = [];
        $(this).find('.cell').each(function () {

            var value = ($(this).html() == "" ? 0 : parseInt($(this).html()));
            row.push(value);
        });
        result.push(row);
    });
    return result;
}


/**
 * 每次移动后重新生成矩阵
 */
function CreateNumber(arrResult) {
    var emptyArr = []; 
    var source = 0;
    if (arrResult.length == 4) {
        for (var i = 0; i < arrResult.length; i++) {
            for (var j = 0; j < arrResult[i].length; j++) {
                source += arrResult[i][j];
                var value = arrResult[i][j] == 0 ? "" : arrResult[i][j];
                if (value== "") {
                    //记录为空的坐标
                    emptyArr.push([i, j]);

                }
                $('.content>div:eq(' + i + ')').find('.cell:eq(' + j + ')').html(value);
                $('.content>div:eq(' + i + ')').find('.cell:eq(' + j + ')').css('background-color', SetCellColor(value));
                $('.content>div:eq(' + i + ')').find('.cell:eq(' + j + ')').css('color', SetCellFontColor(value));
            }
        }
        $('.number').html(source);

        if (emptyArr.length > 0) {
            var random = parseInt(Math.random() * emptyArr.length);
            var randomNum = (Math.random() > 0.5 ? 2 : 4);
            $('.content>div:eq(' + emptyArr[random][0] + ')').find('.cell:eq(' + emptyArr[random][1] + ')').html(randomNum);
        }
        

    }
    else {
        layer.msg('计算失败！', { icon: 2 });
        return false;
    }
}




