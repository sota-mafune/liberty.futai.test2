ZOHO.embeddedApp.init().then(function() {
    runChallenge();
});

async function runChallenge() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    statusEl.innerText = "🔥 最終検証：nullを除外して3月分を狙い撃ち中...";

    // 【重要】まず is not null で空データを除外してから、日付の範囲を指定する
    const coql = {
        "select_query": "select nousyayoteibi, ClosingDay from Services where (nousyayoteibi is not null and (nousyayoteibi >= '2026-03-01T00:00:00+09:00' and nousyayoteibi <= '2026-03-31T23:59:59+09:00')) limit 10"
    };

    try {
        const res = await ZOHO.CRM.API.coql(coql);
        if (res && res.data) {
            statusEl.innerText = "🎊 成功しました！";
            consoleEl.innerHTML = "<b>取得成功！3月のデータ件数: " + res.data.length + "件（一部表示）</b>" +
                                "<pre style='color:#00ff00;'>" + JSON.stringify(res.data, null, 2) + "</pre>";
        } else {
            statusEl.innerText = "⚠️ エラーは出ませんでしたが、データが0件です。";
            consoleEl.innerHTML = "<pre>" + JSON.stringify(res, null, 2) + "</pre>";
        }
    } catch (e) {
        statusEl.innerText = "❌ やはり沈黙しました。null除外でもダメなようです。";
        consoleEl.innerHTML = "<pre style='color:#ff4444;'>" + JSON.stringify(e) + "</pre>";
    }
}
