const main = document.querySelector("#main"); //querySelector(): css의 선택자에 대응되는 것을 선택해줌
const qna = document.querySelector("#qna"); // html의 id가 qna인 부분에 이 상수에 담기게 됨
const result = document.querySelector("#result");
const endPoint = 12; //total q


function goResult() {
    qna.style.WebkitAnimation = 'fadeOut 1s';//keyframes 적용
    qna.style.animation = 'fadeOut 1s';
    // main영역이 절반쯤 안보일 때 qna 등장시키기
    setTimeout(() => { 
        result.style.WebkitAnimation = 'fadeIn 1s';
        result.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
})
}


function addAnswer(answerText, qIdx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //지정한 태그('button')에 맞게 새로운 요소를 만들어 반환
    answer.classList.add('answerList');//<button>에 'answerList' 클래스 추가
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer); //<div><button></button></div>
    answer.innerHTML = answerText; //각 n번 째 버튼마다 a의 n번 째 대답이 들어갈 수 있게

    //answer is clicked
    //답변 선택 > 질문 비활성화, 다음 질문으로 : addEventListener()로 함수 지정
    answer.addEventListener('click', function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';//keyframes 적용
            children[i].style.animation = 'fadeOut 0.5s';
            
            
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';//hide btns
            }
            goNext(++qIdx);//next q 
        }, 450);//버튼이 다 사라지고 난 후(950초쯤) display 설정 변경
    
    }, false); 
}

function goNext(qIdx){
    //last q
    if(qIdx+1 === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');//html의 class가 qBox인 태그를 선택
    q.innerHTML = qnaList[qIdx].q; //1번 째 질문 ([0].q). 1번 질문 끝나면 2번 질문이 나와야 하므로 goNext() 호출
    for(let i in qnaList[qIdx].a) {//a는 3가지  요소를 가짐, 3번 반복
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    //질문이 진행될 때마다 상태바도 변화
    var status= document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

// 시작하기 버튼이 눌렸을 때 : main은 천천히 사라지고(1s동안) qna 영역만 보이도록
//setTimeout() : 타이머가 만료된 뒤 지정된 코드를 실행하는 타이머를 설정
function begin(){
    main.style.WebkitAnimation = 'fadeOut 1s';//keyframes 적용
    main.style.animation = 'fadeOut 1s';
    // main영역이 절반쯤 안보일 때 qna 등장시키기
    setTimeout(() => { 
        
        qna.style.WebkitAnimation = 'fadeIn 1s';
        qna.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);

        let qIdx = 0;
        goNext(qIdx);
    }, 450); //1000ms = 1s
}

