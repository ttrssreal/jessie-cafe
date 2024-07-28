let backButton, leftBar, coffee, posts, backButtonReverse;

window.addEventListener("load", (_) => {
    backButton = document.querySelector(".back-button");
    backButtonReverse = document.querySelector(".back-button-reverse");
    leftBar = document.querySelector(".left-bar");
    coffee = document.querySelector(".jess-cafe-coffee");
    posts = document.querySelector(".blog-icon");
    backButton.addEventListener("click", toggleLeftBar)
    backButtonReverse.addEventListener("click", toggleLeftBar)
});

function toggleLeftBar(_) {
    leftBar.classList.toggle("closed");

    if (leftBar.classList.contains("closed")) {
        coffee.style.display = "none";
        posts.style.display = "none";
        backButton.style.display = "none";
        backButtonReverse.style.display = "block";
        return
    }

    coffee.style.display = null;
    posts.style.display = null;
    backButton.style.display = null;
    backButtonReverse.style.display = "none";
}