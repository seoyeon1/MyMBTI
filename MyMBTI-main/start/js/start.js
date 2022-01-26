const main = document.querySelector("#main"); //querySelector(): css의 선택자에 대응되는 것을 선택해줌
const qna = document.querySelector("#qna"); // html의 id가 qna인 부분에 이 상수에 담기게 됨

// 시작하기 버튼이 눌렸을 때 : main은 천천히 사라지고(1s동안) qna 영역만 보이도록
//setTimeout() : 타이머가 만료된 뒤 지정된 코드를 실행하는 타이머를 설정
function begin(){
    main.style.WebkitAnimation = 'fadeOut 1s';
    main.style.animation = 'fadeOut 1s';
    // main영역이 절반쯤 안보일 때 qna 등장시키기
    setTimeout(() => { 
        
        qna.style.WebkitAnimation = 'fadeIn 1s';
        qna.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
    }, 450); //1000ms = 1s
}

