let attempts = 0;
let index = 0;
let timer;


function appStart() {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.classList.add('end');
        div.innerText = "정답~!"
        document.body.appendChild(div);
    }

    const displayLoosegame = () => {
        const div = document.createElement("div")
        div.classList.add('loose'); 
        div.innerText = "틀렸습니다~! 다시 도전하세요~!";
        document.body.appendChild(div);
    }


    const nextLine = () => {
        if( attempts === 6) return gameover();
        attempts +=1;
        index= 0;
    };

    const gameover = () => {
        window.removeEventListener("keydown",handleKeydown);
        displayGameover();
        clearInterval(timer);

    };

    const handleBackspace = () => {
        if(index > 0){
        const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index -1}']`);
        preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;

    };

    const loosegame = () => {
        window.removeEventListener("keydown",handleKeydown);
        displayLoosegame();
        clearInterval(timer);
    }


    const handleEnterKey = async() => {
        let 맞은_갯수 = 0;
        const 응답 = await fetch('/answer'); //fetch라는건 자바스크립가 서버에 요청을 보낸다는거임!! 
        const 정답 = await 응답.json();
        for(let i=0; i<5; i++){
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if( 입력한_글자 === 정답_글자) {
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";
            }else if ( 정답.includes(입력한_글자)) block.style.background = "#C9B458";
            else  block.style.background = "#787C7E";
            block.style.color = "white";
        }
        if( 맞은_갯수 === 5) {
            gameover();
        } else if( attempts === 5) {
            loosegame();
        }else  {
            nextLine();
        }
    };
    //로직들
    const handleKeydown = (event) => {// 값을 반화하고 종료 
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        
        if(event.key === 'Backspace') handleBackspace();

        else if(index === 5) {
            if(event.key === "Enter") handleEnterKey();
            else return;
        }else if(65<=keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index ++;
        }
        
    }


    const handleClick = (event) => {
        const key = event.target.getAttribute('data-key');
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        
        if(key === 'BACK') handleBackspace();

        else if(index === 5) {
            if(key === "ENTER") handleEnterKey();
            else return;
        }else if(key !== null && key !== 'ENTER'){
            thisBlock.innerText = key;
            index ++;
        }
        
    }

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 일 = new Date().getDate().toString();
            const 월 = (new Date().getMonth() +1).toString();
            const 연도 = new Date().getFullYear().toString();
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2,"0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2,"0");
            const timeH1 = document.querySelector(".time");
            timeH1.innerText = `${연도}년 ${월}월 ${일}일 ${분}:${초}`;
        }
       timer = setInterval(setTime,1000);
    };

    startTimer();
    window.addEventListener("keydown",handleKeydown);
    window.addEventListener("click",handleClick);
}

appStart();