const main = document.querySelector("#main"); //querySelector(): css의 선택자에 대응되는 것을 선택해줌
const qna = document.querySelector("#qna"); // html의 id가 qna인 부분에 이 상수에 담기게 됨
const result = document.querySelector("#result");

const endPoint = 12; //total q
const select = [0,0,0,0,0,0,0,0,0,0,0,0]; //선택지(버튼) 선택할 때마다 선택한 번호를 넣는 게 아닌 해당 동물들의 인덱스를 1씩 증가


//select 배열에 값들로 결과를 연산하는 함수 : 가장 많이 선택한 타입 = 최종 결과
function calResult() {


    var result = select.indexOf(Math.max(...select));//선택한 배열을 펼쳐서(...select) 배열의 최댓값 index 반환
    return result;

}


function setResult(){
    let point = calResult();//값이 가장 큰 인덱스 번호
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;//infoList도 십이간지 순서대로 기록되어 있음

    var resultImg = document.createElement('img');//img태그 생성
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point; //'공유하기'에서 사용
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');//결과 설명 부분
    resultDesc.innerHTML= infoList[point].desc;

}



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
        }, 450)})
        setResult();
        // calResult();
}


function addAnswer(answerText, qIdx, idx){
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
    //답변(btn) 선택 > 질문 비활성화, 다음 질문으로 : addEventListener()로 함수 지정
    answer.addEventListener('click', function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';//keyframes 적용
            children[i].style.animation = 'fadeOut 0.5s';
            
            
        }
        setTimeout(() => {
            //답변 선택>  select 인덱스(선택한 답에 관련된 type들 번호) 값을 증가 
            var target = qnaList[qIdx].a[idx].type;//몇 번째 질문(qIdx)에 대해 사용자가 선택한 답과 관련되 타입들 리스트
            for (let j = 0; j < target.length; j++) { //타겟의 type에 대한 반복
                select[target[j]] += 1; 
            }
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';//hide btns
            }
            goNext(++qIdx);//next q 
        }, 450)//버튼이 다 사라지고 난 후(950초쯤) display 설정 변경
    
    }, false); 
}

function goNext(qIdx){
    //last question > 결과보기(goResult())
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');//html의 class가 qBox인 태그를 선택
    q.innerHTML = qnaList[qIdx].q; //1번 째 질문 ([0].q). 1번 질문 끝나면 2번 질문이 나와야 하므로 goNext() 호출
    for(let i in qnaList[qIdx].a) {//a는 3가지  요소를 가짐, 3번 반복, i는 n 번 째 버튼 의미
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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

