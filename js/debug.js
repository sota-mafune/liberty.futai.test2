ZOHO.embeddedApp.init().then(function() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "✅ SDK初期化完了。データをリクエスト中...";

    // 【修正ポイント】ServicePerson.Name を ServicePerson に変更（IDだけ取る最も安全な形）
    const coql = {
        "select_query": "select nousyayoteibi, ClosingDay, ServiceStore, ServicePerson from Services where nousyayoteibi is not null limit 1"
    };

    console.log("リクエスト開始:", coql);

    ZOHO.CRM.API.coql(coql).then(function(res) {
        let div = document.createElement('div');
        div.className = "log";

        if(res.data) {
            statusEl.innerText = "🎉 通信成功！データを受信しました。";
            div.innerHTML = "<span class='success'>[SUCCESS] 受信データ:</span><br><pre>" + JSON.stringify(res.data[0], null, 2) + "</pre>";
        } else {
            statusEl.innerText = "❌ 通信はしましたが、データが空、またはエラーです。";
            div.innerHTML = "<span class='error'>[RESPONSE ERROR]</span><br><pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
        consoleEl.appendChild(div);
    }).catch(function(err) {
        statusEl.innerText = "🚫 通信エラー（例外）が発生しました。";
        consoleEl.innerHTML = "<div class='error'>[EXCEPTION] " + JSON.stringify(err) + "</div>";
    });
});
