ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "✅ SDK初期化完了。全件から5件リクエスト中...";

    // 条件を一切入れず、とにかく5件持ってくるだけのクエリ
    const coql = {
        "select_query": "select nousyayoteibi, ClosingDay, ServiceStore from Services limit 5"
    };

    ZOHO.CRM.API.coql(coql).then(function(res) {
        let div = document.createElement('div');
        div.className = "log";

        if(res.data) {
            statusEl.innerText = "🎉 通信成功！データを受信しました。";
            div.innerHTML = "<span class='success'>[SUCCESS] 取得成功！データの中身:</span><br><pre>" + JSON.stringify(res.data, null, 2) + "</pre>";
        } else {
            statusEl.innerText = "❌ データが1件もありません、またはエラーです。";
            div.innerHTML = "<span class='error'>[RESPONSE ERROR]</span><br><pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
        consoleEl.appendChild(div);
    }).catch(function(err) {
        statusEl.innerText = "🚫 通信エラー（例外）が発生しました。";
        consoleEl.innerHTML = "<div class='error'>[EXCEPTION] " + JSON.stringify(err) + "</div>";
    });
});
