$(document).ready(function () {
    //  перемішування елементів пазлу лівого блоку
    mix();
    function mix() {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        let shuffledArr = arr.sort(function () {
            return Math.random() - 0.5;
        });
        for (let i = 0; i < shuffledArr.length; i++) {
            // $(".item")[i].classList.add(`p${shuffledArr[i]}`);
            $(".item")[i].className = `item p${shuffledArr[i]}`;
        }
    }
    // -------------------------------------------------
    $(".check").on(
        "click",
        (check = () => {
            openModal();
            $(".modal-text-message").text(`You still have time, you sure?  `);
            $(".modal-btn-close").on("click", closeModal);
        })
    );
    // закриття модалки--------------------------
    function closeModal() {
        $(".modal-container").css({
            "z-index": -1,
            opacity: 0,
        });
        $(".modal").css({
            top: "-200px",
            transition: "0.2s",
        });
    }
    // відкриття модалки--------------------------
    function openModal() {
        $(".modal-container").css({
            "z-index": 0,
            opacity: 0.3,
        });
        $(".modal").css({
            top: "30px",
            transition: "0.2s",
        });
    }

    // перевірка правильності складеного пазлу--------------------------
    $(".modal-btn-check").on("click", checkModal);
    let res = true;
    function checkModal() {
        for (let i = 0; i < $(".ready").length; i++) {
            if ($(".ready")[i].firstChild == null) {
                res = false;
                break;
            } else if (
                $(".ready")[i].firstChild.classList.contains(`p${i + 1}`)
            ) {
                continue;
            }
        }
        if (res === true) {
            $(".modal-text-message").text("Woohoo, well done, you did it!");
            $(".modal-container").css({
                "z-index": 0,
                opacity: 0.3,
            });
            $(".modal").css({
                top: "30px",
                transition: "0.2s",
            });
            $(".modal-btn-check").css("display", "none");
            clearInterval(intervalID);
        } else {
            $(".modal-container").css({
                "z-index": 0,
                opacity: 0.3,
            });
            $(".modal").css({
                top: "30px",
                transition: "0.2s",
            });

            $(".modal-text-message").text("It's a pity, but you lost");
            $(".t").css("display", "none");
            $(".modal-btn-check").css("display", "none");
            clearInterval(intervalID);
            $(".modal-btn-close").on("click", closeModal);
        }
    }

    //   таймер---------------------------------------

    $(".start").on("click", start);
    let intervalID;
    function start() {
        //  функція переміщення DOM елементів
        $(".piece").sortable({
            connectWith: ".item, .piece",
        });

        // активація/девктивація кнопок
        $(".check").attr("disabled", false);
        $(".new-game").attr("disabled", false);
        $(".start").attr("disabled", true);

        // -------таймер--------------------
        let second = 59;
        let minute = "00";
        intervalID = setInterval(function () {
            if (second > 9) {
                $(".minutes").text(minute);
                $(".seconds").text(second);
            }
            if (second < 10 && second > 0) {
                $(".minutes").text(minute);
                $(".seconds").text(`0${second - 1}`);
                console.log(second);
            } else if (second == 0) {
                $(".seconds").text(`00`);
                clearInterval(intervalID);
                checkModal();
            }
            second--;
        }, 1000);
    }
    // ----дії при натисканні на кнопку 'new-game'
    $(".new-game").on("click", function () {
        location.reload();
    });
});


function list(a, b, ...arg) {
    console.log(arg);
}
list(1, 2, 3, 4, 5);