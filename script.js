const shortenBtn = document.querySelector(".shortenBtn");
const input = document.querySelector(".inp");
const stickers = document.querySelector(".stickers");
const navbarSmall = document.querySelector(".navbarSmall");
const navBarLater = document.querySelector(".navBarLater");

navbarSmall.addEventListener("click", () => {
  navBarLater.classList.toggle("hidden");
});

function displayError(err) {
  console.log(err);
  input.classList.add("errInput");
  const html = `<span class="error">${err}</span>`;
  input.insertAdjacentHTML("afterend", html);
}

async function shortenLink(oldLink) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${oldLink}`);
    const data = await res.json();
    if (data.error_code === 1) {
      throw new Error("Please add a link");
    } else if (data.error_code === 2) {
      throw new Error("Please enter a valid URL");
    } else if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    return data.result.full_short_link;
  } catch (err) {
    displayError(`${err.message}`);
  }
}

shortenBtn.addEventListener("click", async () => {
  const oldLink = input.value;
  const newLink = await shortenLink(oldLink);
  if (newLink) {
    // console.log(newLink);
    input.value = "";
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
        setTimeout(() => {
          btn.style.backgroundColor = "hsl(180, 66%, 49%)";
          btn.style.pointerEvents = "all";
          btn.innerText = "Copy";
        }, 5000);
      });
    });
  }
});
