const title = "GDPR consent";
const url = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";
let vendors = [];

window.onload = function () {
  const root = document.getElementById("root");
  let backgroundImage = initBackgroundImageContainer();
  root.appendChild(backgroundImage);
  if (!getCookie("vendorsNames")) {
    let popup = initPopupContainer();
    let ul = initList();
    root.appendChild(popup);
    popup.appendChild(ul);
    blurBackground();
    /*render vendors*/
    fetchAPIDataJSON().then((res) => {
      return Object.values(res).map(function (vendor) {
        let li = createNode("li");
        li.appendChild(initVendorItem(vendor));
        ul.appendChild(li);
      });
    });
  }
};

async function fetchAPIDataJSON() {
  const response = await fetch(url);
  const data = await response.json();
  const vendors = data.vendors;
  return vendors;
}

createNode = (element) => {
  return document.createElement(element);
};
initBackgroundImageContainer = () => {
  backgroundImage = createNode("div");
  backgroundImage.classList.add("background-image");
  return backgroundImage;
};
initList = () => {
  let ul = createNode("ul");
  ul.classList.add("vendors-list");
  ul.style.cssText =
    "height:100%; width: 100%; overflow:auto;padding: 0 2vw 0 10vw;";
  return ul;
};
initPopupContainer = () => {
  popup = createNode("div");
  popup.classList.add("popup");
  popup.innerHTML = title;
  popup.style.cssText =
    "display: flex;flex-direction:column; justify-content:center;align-items:center; position: absolute;width:50vw;height:80vh;background:#fff;z-index:999; padding: 5vh 0";
  return popup;
};
initVendorItem = (vendor) => {
  const { name, policyUrl } = vendor;
  vendorItem = createNode("div");
  vendorItem.style.cssText =
    "display:flex;align-items: center;justify-content: space-between;";
  vendorButtonsContainer = initItemOptions(policyUrl);
  vendorText = createNode("span");
  vendorText.style.cssText = "max-width:50%;";
  vendorText.classList.add("vendor-name");
  vendorText.innerHTML = name;
  vendorItem.appendChild(vendorText);
  vendorItem.appendChild(vendorButtonsContainer);
  return vendorItem;
};
initItemOptions = (policyUrl) => {
  vendorButtonsContainer = createNode("div");
  vendorButtonsContainer.classList.add("vendor-options");
  vendorButtonsContainer.innerHTML = `<button onClick=acceptVendor(event) class='accept-btn'>Accept</button> <button class='reject-btn'>Reject</button><a target='_blank' href=${policyUrl}>Policy URL</a>`;
  return vendorButtonsContainer;
};
blurBackground = () => {
  const backgroundImage = document.getElementsByClassName(
    "background-image"
  )[0];
  backgroundImage.style.cssText = "filter: blur(8px);";
};
function acceptVendor(event) {
  let acceptBtn = event.target;
  var closestSpan = acceptBtn.parentNode.parentNode.firstElementChild;
  var name = closestSpan.textContent;
  var prevName = getCookie("vendorsNames") || undefined;
  setCookie("vendorsNames", [name, prevName], 1);
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
