ZOHO.embeddedApp.init().then(runMassiveDebug);

async function runMassiveDebug() {
    const statusEl = document.getElementById('status');
    const consoleEl = document.getElementById('console');
    const dataDisplay = document.createElement('div');
    dataDisplay.style.background = "#333";
    dataDisplay.style.color = "#0f0";
    dataDisplay.style.padding = "15px";
    dataDisplay.style.marginBottom = "20px";
    dataDisplay.style.border = "1px solid #555";
    dataDisplay.innerHTML = "<b>【生データ形式チェック】</b><br><span id='raw-data'>取得中...</span>";
    consoleEl.appendChild(dataDisplay);

    const test = async (title, query) => {
        const item = document.createElement('div');
        item.innerHTML = `🟡 ${title} ... 実行中`;
        item.style.margin = "5px 0";
        consoleEl.appendChild(item);

        try {
            const res = await Promise.race([
                ZOHO.CRM.API.coql({ "select_query": query }),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000))
            ]);

            if (res && res.data && res.data.length > 0) {
                // A-2のテスト時にデータを表示
                if (title.includes("A-2")) {
                    const rawVal = res.data[0].nousyayoteibi;
                    document.getElementById('raw-data').innerText = 
                        `値: "${rawVal}" (型: ${typeof rawVal})`;
                }
                item.innerHTML = `✅ ${title} ... <span style='color:lime'>成功 (${res.data.length}件)</span>`;
                return true;
            } else {
                item.innerHTML = `⚠️ ${title} ... <span style='color:yellow'>成功 (データ0件)</span>`;
                return true;
            }
        } catch (e) {
            item.innerHTML = `❌ ${title} ... <span style='color:red'>失敗 (${e.message})</span>`;
            return false;
        }
    };

    statusEl.innerText = "🚀 診断中...";

    // --- 検証グループA ---
    await test("A-1: IDのみ取得", "select id from Services limit 1");
    // ここで nousyayoteibi があるレコードを優先的に探すために is not null を使用
    await test("A-2: nousyayoteibiを取得して形式表示", "select id, nousyayoteibi from Services where nousyayoteibi is not null limit 1");

    // --- 検証グループB (WHERE) ---
    await test("B-1: is not null 検索", "select id from Services where nousyayoteibi is not null limit 1");
    await test("B-2: '=' 完全一致(Tなし)", "select id from Services where nousyayoteibi = '2026-03-01' limit 1");
    await test("B-3: '>' 大小比較(Tなし)", "select id from Services where nousyayoteibi > '2026-01-01' limit 1");
    await test("B-4: '>' 大小比較(ISO形式)", "select id from Services where nousyayoteibi > '2026-01-01T00:00:00+09:00' limit 1");

    // --- 検証グループC (集計・並び替え) ---
    await test("C-1: ORDER BY", "select id, nousyayoteibi from Services where nousyayoteibi is not null order by nousyayoteibi desc limit 1");
    await test("C-2: COUNT", "select count(id) from Services where nousyayoteibi is not null");

    // --- 検証グループD (特殊) ---
    await test("D-1: contains検索", "select id from Services where nousyayoteibi contains '2026' limit 1");

    statusEl.innerText = "🏁 全テスト完了";
}
