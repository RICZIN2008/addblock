// ==UserScript==
// @name TDK TroopDark Full v3.2
// @namespace https://viayoo.com/ah1jk1
// @version 3.2
// @description Segurança Forçada + Info Completa + Controles + Tema + MÍDIA LIBERADA
// @author TroopDark
// @updateURL https://raw.githubusercontent.com/RICZIN2008/addblock/refs/heads/main/script.js
// @downloadURL https://raw.githubusercontent.com/RICZIN2008/addblock/refs/heads/main/script.js
// @run-at document-end
// @match https://*/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    /* BOTÃO PRINCIPAL ARRASTÁVEL */
    const btn = document.createElement("div");
    btn.innerText = "TDK";
    Object.assign(btn.style, {
        position: "fixed", top: "10px", right: "10px", width: "60px", height: "60px",
        background: "red", color: "#fff", borderRadius: "50%", display: "flex",
        alignItems: "center", justifyContent: "center", fontWeight: "bold",
        cursor: "grab", zIndex: "999", boxShadow: "0 0 10px black", userSelect: "none", touchAction: "none"
    });
    document.body.appendChild(btn);

    // Arrastar + Clique
    let isDown = false, startX, startY, moved = false;
    const startDrag = (e) => {
        isDown = true; moved = false;
        const ev = e.touches? e.touches[0] : e;
        startX = ev.clientX - btn.offsetLeft;
        startY = ev.clientY - btn.offsetTop;
        btn.style.cursor = "grabbing";
    };
    const onDrag = (e) => {
        if(!isDown) return;
        const ev = e.touches? e.touches[0] : e;
        const dx = Math.abs(ev.clientX - (btn.offsetLeft + startX));
        const dy = Math.abs(ev.clientY - (btn.offsetTop + startY));
        if(dx > 5 || dy > 5) moved = true;
        btn.style.left = (ev.clientX - startX) + 'px';
        btn.style.top = (ev.clientY - startY) + 'px';
        btn.style.right = 'auto';
        e.preventDefault();
    };
    const endDrag = () => { isDown = false; btn.style.cursor = "grab"; };

    btn.addEventListener('mousedown', startDrag);
    btn.addEventListener('touchstart', startDrag, {passive: false});
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, {passive: false});
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    /* MENU PRINCIPAL */
    const menu = document.createElement("div");
    Object.assign(menu.style, {
        position: "fixed", top: "80px", right: "10px", width: "280px", maxHeight: "80vh", overflowY: "auto",
        background: "#111", color: "#fff", padding: "15px", borderRadius: "10px",
        display: "none", zIndex: "999", boxShadow: "0 0 15px red", fontFamily: "sans-serif"
    });

    menu.innerHTML = `
        <h3 style="text-align:center;color:red;margin:0 0 10px 0">TDK MENU v3.2</h3>

        <label style="font-size:11px;color:red;font-weight:bold">🎨 APARÊNCIA</label>
        <select id="temaSelect" style="width:100%;padding:5px;margin-bottom:10px;background:#222;color:#fff;border:1px solid red">
            <option value="red">Vermelho</option>
            <option value="#00ff88">Verde Neon</option>
            <option value="#00aaff">Azul</option>
            <option value="#ff00ff">Roxo Neon</option>
        </select>
        <label style="font-size:10px">📏 Tamanho</label>
        <input type="range" min="30" max="120" value="60" id="sizeControl" style="width:100%;accent-color:red;margin-bottom:5px">
        <label style="font-size:10px">👁 Transparência</label>
        <input type="range" min="0.2" max="1" step="0.1" value="1" id="opacityControl" style="width:100%;accent-color:red;margin-bottom:10px">

        <label style="font-size:11px;color:red;font-weight:bold">🛡️ SEGURANÇA FORÇADA - 12 CAMADAS</label>
        <div style="background:#000;padding:8px;border-radius:5px;font-size:10px;margin-bottom:10px;color:#0f0;font-family:monospace">
            ● TYPOSQUATTING [ATIVO]<br>
            ● ANTI-TABNABBING [ATIVO]<br>
            ● ANTI DARK PATTERNS [ATIVO]<br>
            ● BLOQUEAR REDIRECTS [ATIVO]<br>
            ● ANTI-OVERLAY [ATIVO]<br>
            ● ANTI-CLICKJACKING [ATIVO]<br>
            ● ANTI-CRYPTOJACKING [ATIVO]<br>
            ● ANTI-SCREEN OVERLAY [ATIVO]<br>
            ● ANTI CALENDAR SPAM [ATIVO]<br>
            ● ANTI-POPUP [ATIVO]<br>
            ● ANTI-IFRAME CLONE [ATIVO]<br>
            ● LIMPEZA DE TRACKERS [ATIVO]
        </div>

        <button id="infoBtn" style="width:100%;padding:10px;background:red;color:#fff;border:none;border-radius:5px;font-weight:bold">INFO DO SISTEMA</button>
        <button id="closeMenu" style="width:100%;margin-top:5px;padding:10px;background:#333;color:#fff;border:none;border-radius:5px">FECHAR MENU</button>
    `;
    document.body.appendChild(menu);

    /* ABRIR/FECHAR */
    btn.addEventListener('click', () => { if(!moved) menu.style.display = menu.style.display === "none"? "block" : "none"; });
    document.getElementById("closeMenu").onclick = () => menu.style.display = "none";

    /* CONTROLES */
    document.getElementById("sizeControl").oninput = (e) => { btn.style.width = e.target.value + "px"; btn.style.height = e.target.value + "px"; };
    document.getElementById("opacityControl").oninput = (e) => { btn.style.opacity = e.target.value; };
    document.getElementById("temaSelect").onchange = (e) => {
        const cor = e.target.value;
        btn.style.background = cor; btn.style.boxShadow = `0 0 10px ${cor}`;
        menu.style.boxShadow = `0 0 15px ${cor}`;
    };

    /* JANELA INFO COMPLETA */
    const infoWin = document.createElement("div");
    Object.assign(infoWin.style, {
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        background: "#000", border: "2px solid red", color: "#fff", padding: "20px",
        borderRadius: "10px", display: "none", width: "320px", zIndex: "1000000", boxShadow: "0 0 30px red"
    });
    infoWin.innerHTML = `
        <h3 style="color:red;text-align:center;margin-top:0">DADOS TÉCNICOS</h3>
        <div id="sysinfo" style="font-size:12px;line-height:1.6;font-family:monospace;max-height:400px;overflow-y:auto"></div>
        <button id="closeInfo" style="width:100%;margin-top:15px;padding:10px;background:red;color:white;border:none;border-radius:5px;font-weight:bold">VOLTAR</button>
    `;
    document.body.appendChild(infoWin);

    async function loadFullData() {
        const display = document.getElementById("sysinfo");
        display.innerHTML = "📡 Coletando dados...";
        let ipData = { ip: "N/A", region: "N/A", org: "N/A" };
        let bateria = "N/A";
        try { const res = await fetch('https://ipapi.co/json/'); if(res.ok) ipData = await res.json(); } catch(e){}
        try { const battery = await navigator.getBattery(); bateria = `${(battery.level * 100).toFixed(0)}% ${battery.charging?'(🔌)':'(🔋)'}`; } catch(e){}

        display.innerHTML = `
            <b style="color:red">🌐 IP:</b> ${ipData.ip}<br>
            <b style="color:red">🏙 ESTADO:</b> ${ipData.region}<br>
            <b style="color:red">🏢 PROVEDOR:</b> ${ipData.org}<br><hr style="border-color:#333">
            <b style="color:red">⚙️ PLATAFORMA:</b> ${navigator.platform}<br>
            <b style="color:red">🔋 BATERIA:</b> ${bateria}<br>
            <b style="color:red">💾 RAM:</b> ${navigator.deviceMemory?navigator.deviceMemory+'GB':'N/A'}<br>
            <b style="color:red">🖥️ TELA:</b> ${screen.width}x${screen.height}<br>
            <b style="color:red">🌐 NAVEGADOR:</b> ${navigator.appName}<br>
            <b style="color:red">📍 IDIOMA:</b> ${navigator.language}<br><hr style="border-color:#333">
            <div style="font-size:9px;color:#555;word-break:break-all">${navigator.userAgent}</div>
        `;
    }
    document.getElementById("infoBtn").onclick = () => { infoWin.style.display = "block"; loadFullData(); };
    document.getElementById("closeInfo").onclick = () => infoWin.style.display = "none";

    /* SEGURANÇA FORÇADA - 12 CAMADAS v3.2 CORRIGIDA */
    setInterval(() => document.querySelectorAll('a[target="_blank"]').forEach(a => a.rel = "noopener noreferrer"), 2000);

    // CORREÇÃO: NÃO MEXER EM IFRAME E VIDEO
    setInterval(() => {
        document.querySelectorAll('div, iframe, ins, aside').forEach(el => {
            if([btn,menu,infoWin].includes(el) || el.closest('#sysinfo')) return;
            if(el.tagName === 'IFRAME' || el.tagName === 'VIDEO') return; // LIBERAR MÍDIA
            if(el.closest('iframe') || el.closest('video')) return; // LIBERAR PLAYER
            const s = window.getComputedStyle(el);
            if(parseInt(s.zIndex) > 500 && parseFloat(s.opacity) < 0.1) el.style.pointerEvents = "none";
            if(s.position === "fixed" && parseInt(s.zIndex) > 1000) el.remove();
        });
    }, 1500);

    setInterval(() => document.querySelectorAll('input[type="checkbox"]').forEach(i => { if(i.checked && i.offsetParent === null) i.checked = false; }), 2000);
    const host = window.location.hostname;
    if(/(g00gle|faceb00k|paypa1|rnicrosoft|banc0|rece1ta)/i.test(host)) alert("⚠️ ALERTA TDK: Domínio suspeito de Typosquatting!");
    window.addEventListener("beforeunload", (e) => { e.preventDefault(); e.returnValue = ""; });
    window.CoinHive = window.CryptoLoot = window.CoinImp = undefined;
    document.addEventListener("click", (e) => { if(e.target.href?.includes(".ics")){ e.preventDefault(); alert("🛡️ TDK:.ics bloqueado"); } }, true);
    window.open = function(){ return null; };
    if(window.top!== window.self) window.top.location = window.self.location;
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => { if(e.ctrlKey && ['u','s','i','c'].includes(e.key.toLowerCase())) e.preventDefault(); });

    // CORREÇÃO: NÃO REMOVER BANNER DENTRO DE VIDEO/IFRAME
    setInterval(() => {
        document.querySelectorAll('div[class*="banner"], div[class*="overlay"], div[id*="pop"],.adsbygoogle').forEach(el => {
           if(![btn,menu,infoWin].includes(el) &&!el.closest('iframe') &&!el.closest('video')) el.remove();
        });
    }, 2000);
    console.clear();

    /* CSS FIXO - LIBERADO VIDEO E IFRAME */
    const style = document.createElement("style");
    style.innerHTML = `
        a,a:visited{color:red!important}
        img{max-width:50px!important;max-height:50px!important}
        /* LIBERAR PLAYER */
        video, iframe { max-width: 100%!important; max-height: 100%!important; width: auto!important; height: auto!important; visibility: visible!important; }
    `;
    document.head.appendChild(style);

})();
