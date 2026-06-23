
const API_URL =
"https://api.github.com/users/Innafews/repos?sort=updated";

const container =
document.getElementById("projectGrid");

async function loadProjects(){

if(!container) return;

try{

container.innerHTML =
"<p>加载中...</p>";

const TOKEN = "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";

const res = await fetch(
"https://api.github.com/users/Innafews/repos?sort=updated",
{
headers: {
Authorization: `Bearer ${TOKEN}`
}
}
);

if(!res.ok){

throw new Error(
"GitHub API 请求失败：" + res.status
);

}

const repos =
await res.json();

/* =========================
   API限流检测
========================= */

if(repos.message){

throw new Error(
repos.message
);

}

/* =========================
   数据过滤 + 排序
========================= */

const filtered =
repos

.filter(r => !r.fork) // 去掉fork项目（可删）

.sort((a,b)=>

new Date(b.updated_at) -
new Date(a.updated_at)

);

container.innerHTML = "";

/* =========================
   渲染卡片
========================= */

filtered.forEach(repo => {

/* 防御式处理 */

const name =
repo.name || "Unknown";

const desc =
repo.description || "暂无描述";

const stars =
repo.stargazers_count ?? 0;

const forks =
repo.forks_count ?? 0;

const updated =
repo.updated_at
? new Date(repo.updated_at)
.toLocaleDateString("zh-CN")
: "未知时间";

/* 卡片 */

const card =
document.createElement("div");

card.className =
"project-card";

card.innerHTML = `

<h2>${name}</h2>

<p>${desc}</p>

<div class="project-meta">

<span>⭐ ${stars}</span>

<span>🍴 ${forks}</span>

</div>

<div class="project-meta">

<span>${updated}</span>

</div>

<a href="${repo.html_url}"
target="_blank">

查看项目 →

</a>

`;

container.appendChild(card);

});

}catch(error){

console.error("GitHub Error:", error);

/* =========================
   错误 UI
========================= */

container.innerHTML = `

<div class="project-card">

<h2>加载失败</h2>

<p>${error.message}</p>

<p style="opacity:.6;margin-top:10px">

请检查：用户名 / 网络 / GitHub API限制

</p>

</div>

`;

}

}

/* =========================
   搜索功能（可选）
========================= */

function initSearch(){

const input =
document.getElementById("searchProject");

if(!input) return;

input.addEventListener(
"input",
e=>{

const keyword =
e.target.value.toLowerCase();

document.querySelectorAll(
".project-card"
).forEach(card=>{

const text =
card.innerText.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

}

);

}

/* =========================
   初始化
========================= */

loadProjects();
initSearch();