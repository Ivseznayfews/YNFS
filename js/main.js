/* ===================================
   Ivseznayfews Website
   Main Script
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initTheme();
    initTyping();
    initReveal();
    initCursorGlow();
    initNavbar();
    initScrollTop();
    initPageFade();
    initCounters();

});


/* ===================================
   Loader
=================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add(
                "loader-hidden"
            );

        }, 1200);

    });

}


/* ===================================
   Theme System
=================================== */

function initTheme() {

    const toggle =
        document.getElementById(
            "themeToggle"
        );

    if (!toggle) return;

    const saved =
        localStorage.getItem(
            "theme"
        );

    if (saved === "light") {

        document.body.classList.add(
            "light"
        );

        toggle.innerHTML = "☀️";

    }

    toggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );

            const isLight =
                document.body.classList.contains(
                    "light"
                );

            localStorage.setItem(
                "theme",
                isLight
                    ? "light"
                    : "dark"
            );

            toggle.innerHTML =
                isLight
                    ? "☀️"
                    : "🌙";

        }
    );

}


/* ===================================
   Typing Effect
=================================== */

function initTyping() {

    const typing =
        document.getElementById(
            "typing"
        );

    if (!typing) return;

    const texts = [

        "以代码构筑想法，以创造连接未来。",
        "Founder of Yufeng Studio.",
        "Web Developer & Open Source Creator.",
        "Build. Create. Innovate."

    ];

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {

        const current =
            texts[textIndex];

        if (!deleting) {

            typing.textContent =
                current.substring(
                    0,
                    charIndex++
                );

            if (
                charIndex >
                current.length
            ) {

                deleting = true;

                setTimeout(
                    typeLoop,
                    1800
                );

                return;
            }

        } else {

            typing.textContent =
                current.substring(
                    0,
                    charIndex--
                );

            if (charIndex < 0) {

                deleting = false;

                textIndex =
                    (textIndex + 1) %
                    texts.length;

            }

        }

        setTimeout(
            typeLoop,
            deleting ? 40 : 80
        );

    }

    typeLoop();

}


/* ===================================
   Reveal Animation
=================================== */

function initReveal() {

    const reveals =
        document.querySelectorAll(
            ".reveal"
        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    reveals.forEach(item => {

        observer.observe(item);

    });

}


/* ===================================
   Cursor Glow
=================================== */

function initCursorGlow() {

    const glow =
        document.querySelector(
            ".cursor-glow"
        );

    if (!glow) return;

    document.addEventListener(
        "mousemove",
        e => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";

        }
    );

}


/* ===================================
   Navbar Effect
=================================== */

function initNavbar() {

    const navbar =
        document.querySelector(
            ".navbar"
        );

    if (!navbar) return;

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 80
            ) {

                navbar.style.padding =
                    "12px 24px";

                navbar.style.backdropFilter =
                    "blur(35px)";

            } else {

                navbar.style.padding =
                    "18px 32px";

            }

        }
    );

}


/* ===================================
   Scroll To Top
=================================== */

function initScrollTop() {

    const btn =
        document.createElement(
            "button"
        );

    btn.className =
        "scroll-top";

    btn.innerHTML = "↑";

    document.body.appendChild(
        btn
    );

    btn.style.cssText = `

        position:fixed;
        right:25px;
        bottom:180px;

        width:55px;
        height:55px;

        border:none;
        border-radius:50%;

        cursor:pointer;

        opacity:0;
        visibility:hidden;

        z-index:999;

        font-size:20px;

        color:white;

        background:#0071e3;

        transition:.3s;
    `;

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 400
            ) {

                btn.style.opacity = 1;
                btn.style.visibility =
                    "visible";

            } else {

                btn.style.opacity = 0;
                btn.style.visibility =
                    "hidden";

            }

        }
    );

    btn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ===================================
   Page Fade
=================================== */

function initPageFade() {

    document.body.style.opacity =
        "0";

    setTimeout(() => {

        document.body.style.transition =
            "opacity .8s ease";

        document.body.style.opacity =
            "1";

    }, 100);

}


/* ===================================
   Counter Animation
=================================== */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    counters.forEach(counter => {

        let target =
            parseInt(
                counter.dataset.counter
            );

        let current = 0;

        const step =
            Math.ceil(
                target / 100
            );

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const timer =
                                    setInterval(() => {

                                        current += step;

                                        if (
                                            current >= target
                                        ) {

                                            current =
                                                target;

                                            clearInterval(
                                                timer
                                            );

                                        }

                                        counter.textContent =
                                            current;

                                    }, 20);

                            }

                        }
                    );

                }

            );

        observer.observe(
            counter
        );

    });

}


/* ===================================
   Utility
=================================== */

function debounce(
    func,
    wait = 100
) {

    let timeout;

    return (...args) => {

        clearTimeout(
            timeout
        );

        timeout = setTimeout(
            () =>
                func(...args),
            wait
        );

    };

}

/* ===================================
   PWA
=================================== */

if(
"serviceWorker"
in navigator
){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker
.register(
"/sw.js"
)
.then(()=>{

console.log(
"PWA Ready"
);

});

}
);

}

/* ===================================
   VERCEL STYLE PAGE TRANSITION
=================================== */

function initPageTransition() {

    const overlay =
        document.querySelector(
            ".page-transition"
        );

    const links =
        document.querySelectorAll(
            "a[href]"
        );

    if (!overlay) return;

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        // 忽略外链 / 锚点 / 新窗口
        if (
            href.startsWith("http") ||
            href.startsWith("#") ||
            link.target === "_blank"
        ) return;

        link.addEventListener(
            "click",
            e => {

                e.preventDefault();

                overlay.classList.add(
                    "active"
                );

                setTimeout(() => {

                    window.location =
                        href;

                }, 600);

            }
        );

    });

    window.addEventListener(
        "pageshow",
        () => {

            overlay.classList.remove(
                "active"
            );

            document.body.classList.add(
                "page-enter"
            );

            setTimeout(() => {

                document.body.classList.remove(
                    "page-enter"
                );

            }, 600);

        }
    );

}

initPageTransition();