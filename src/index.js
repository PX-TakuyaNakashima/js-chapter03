import faker from "faker";

const initialCount = 10;
/**
 * generate dammy users
 * @returns {object} name,email,job
 */
export const generateUsers = (count = initialCount) => {
  return [...Array(count)].map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    job: faker.name.jobTitle()
  }));
};

export const showMessage = function () {
  window.alert(`My Address is ${this.email}`);
};

/**
 * DOM周りがよくわからず全然解けませんでした…
 */

/**
 * buttonのtype属性がsubmitの状態でQ2以降を解く方法が思いつかなかったので
 * JSから変えちゃいました。すみません。。
 */
const changeAttribute = () => {
  const btn = document.getElementById("search-btn");
  btn.type = "button";
};

/**
 * A3:
 */
const btnTriger = () => {
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", () => {
    const targetName = document.querySelector(".form-control").value;
    replaceTarget(targetName);
  });
};

/**
 * A1:ユーザの名前一覧を画面にリスト表示する
 */
const showUserList = () => {
  const userList = generateUsers();
  const wrapNode = document.createElement("div");
  wrapNode.className = "row row-cols-1 row-cols-md-3";
  const divNode = document.createElement("div");
  divNode.className = "col";

  const ulNode = document.createElement("ul");
  ulNode.className = "list-group";
  const liNode = document.createElement("li");
  liNode.className = "list-group-item";

  const userlistNode = userList.map((n) => {
    let cloneDivNode = divNode.cloneNode(true);
    let cloneUlNode = ulNode.cloneNode(true);
    let nameLiNode = liNode.cloneNode(true);
    let emailLiNode = liNode.cloneNode(true);
    let jobliNode = liNode.cloneNode(true);

    nameLiNode.innerText = n.name;
    emailLiNode.innerText = n.email;
    jobliNode.innerText = n.job;
    cloneUlNode.appendChild(nameLiNode);
    cloneUlNode.appendChild(emailLiNode);
    cloneUlNode.appendChild(jobliNode);
    cloneDivNode.appendChild(cloneUlNode);
    return cloneDivNode;
  });

  wrapNode.append(...userlistNode);
  const targetNode = document.getElementById("app");
  targetNode.appendChild(wrapNode);
};

/**
 * A2: 名前で検索し、要素を置き換える
 */
const replaceTarget = (targetName) => {
  const userList = [...document.querySelectorAll(".list-group-item")];
  const result = userList.filter((n) => n.innerHTML === targetName);
  const parent = document.getElementById("app");
  const targetNode = parent.querySelector(".row .row-cols-1 .row-cols-md-3");

  const wrapNode = document.createElement("div");
  wrapNode.className = "row row-cols-1 row-cols-md-3";
  const divNode = document.createElement("div");
  divNode.className = "col";
  const ulNode = document.createElement("ul");
  ulNode.className = "list-group";
  ulNode.append(...result);
  divNode.appendChild(ulNode);
  wrapNode.appendChild(divNode);

  parent.replaceChild(ulNode, targetNode);
};

changeAttribute();
showUserList();
btnTriger();
