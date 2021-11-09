<!-- 学得快 -->

<!-- Vue -->

<!-- mvp模式 -->

<!-- 用户行为修改modal，然后modal作用于view上 -->

function presenter() {
    $.ajax(data)
        .then(data => {
            $('div').html(data);
        })
}

div.onclick = () => {
    presenter();
}