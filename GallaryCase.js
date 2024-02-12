// integration & Data
const
    IWD = document.getElementById("imagesWrap"),
    Items = [
        { id: "IMG01", title: "Jelly fishes", src: "./Assets/IMG01.jpeg" },
        { id: "IMG02", title: "North Osean Jelly Fishes", src: "./Assets/IMG02.jpeg" },
        { id: "IMG03", title: "Japan Lake Rare Fishes", src: "./Assets/IMG03.jpeg" },
        { id: "IMG04", title: "Red Sea Octobus", src: "./Assets/IMG04.jpeg" },
        { id: "IMG05", title: "Deep Osean Jelly Fishes", src: "./Assets/IMG05.jpeg" },
        { id: "IMG06", title: "Osiana Rare Fishes", src: "./Assets/IMG06.jpeg" },
    ];
let groupD = 0,
    scrollD = 0,
    timing = 1,
    lateness = .75,
    reverse = true,
    vItems = [];

// Arrange Data to Html

const

    // Print the Elements
    init = () => {

        let collected = ``;
        Items.forEach(i => {
            let ele =
                `<div id="${i.id}" class="Item">
                        <img src="${i.src}" alt="${i.title}" loading="lazy">
                        <div class="row">
                            <p>${i.title}</p>
                            <a>Full View +</a>
                        </div>
                    </div>`;
            collected += ele;
        });
        IWD.innerHTML = collected;
        imagine();
    },

    // Pose Elements
    imagine = () => {
        timing = 0;
        window.screen.width < 300 ? groupD = scrollD + 125 : groupD = scrollD + 75;
        Items.forEach(i => {
            timing += 1;
            let ele = document.getElementById(i.id),
                vEle = {
                    id: i.id,
                    timing: timing,
                    left: groupD,
                };

            vItems.push(vEle);
            groupD += ele.clientLeft + 45;
        });
    },

    // Arrange Posed Elements List
    arrange = () => {
        (reverse == true) ? timing = Items.length : timing = 1;
        console.log(reverse == true)
        vItems.forEach(i => {
            document.getElementById(i.id).style =
                `transition: opacity 2.5s, transform ${1 + (2.45 / timing)}s cubic-bezier(.42,.59,.03,1) 0s;
                 transform: translateX(${i.left + scrollD}px); opacity: 1;`;
            (reverse == true) ? timing -= 1 : timing += 1;
        });
    },
    maxes = () => {
        
        let max = -((45 * vItems.length - 1) + (345 * (vItems.length))) + window.screen.width;

        if (scrollD > 0) {
            setTimeout(() => {
                scrollD = 0;
                reverse = true;
                arrange();
            }, 1750);
        };
        if (scrollD < max) {
            setTimeout(() => {
                scrollD = max;
                reverse = false;
                arrange();
            }, 1750);
        };

    },
    navgate = {
        // Next
        right: (amount) => {
            scrollD -= amount || 290 ;
            reverse = true;
            arrange();
            maxes();
        },
        // Previous
        left: (amount) => {
            scrollD += amount || 300 ;
            reverse = false;
            arrange();
            maxes();

        },// To
        to: (n) => {
            scrollD = n;
            groupD = 0;
            arrange();
        },
    },

    // Keyboard controll
    keyHandler = evt => {
        ('ArrowRight' == evt.key) ? navgate.right(200) : null;
        ('ArrowLeft' == evt.key) ? navgate.left(200) : null;
    }