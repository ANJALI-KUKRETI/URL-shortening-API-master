const shortenBtn = document.querySelector(".shortenBtn");
const input = document.querySelector(".inp");
const stickers = document.querySelector(".stickers");
const navbarSmall = document.querySelector(".navbarSmall");
const navBarLater = document.querySelector(".navBarLater");

navbarSmall.addEventListener("click", () => {
  navBarLater.classList.toggle("hidden");
});

async function shortenLink(oldLink) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${oldLink}`);
  const data = await res.json();
  return data.result.full_short_link;
}

shortenBtn.addEventListener("click", async () => {
  const oldLink = input.value;
  const newLink = await shortenLink(oldLink);
  input.value = "";
  //   console.log(newLink);
  const html = ` <div class="sticker">
  <div class="oldLink">${oldLink}</div>
  <div class="newLink">
    <div class="link">${newLink}</div>
    <div class="copy btn">Copy</div>
  </div>
</div>`;
  stickers.insertAdjacentHTML("beforeend", html);
  const link = document.querySelectorAll(".link");
  const copyBtn = document.querySelectorAll(".copy");
  copyBtn.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      navigator.clipboard.writeText(link[i].innerText);
      btn.style.backgroundColor = "hsl(257, 27%, 26%)";
      btn.style.pointerEvents = "none";
      btn.innerText = "Copied!";
    });
  });
});
