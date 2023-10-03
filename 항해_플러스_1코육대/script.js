// 행맨 게임 로직을 구현할 JavaScript 코드
const words = ["APPLE", "BANANA", "CHERRY", "DOG", "ELEPHANT"]; // 게임 단어 목록
let selectedWord = ""; // 선택된 단어
let guessedWord = ""; // 추측한 단어
let attempts = 0; // 시도 횟수
const maxAttempts = 6; // 최대 시도 횟수

// HTML 엘리먼트 가져오기
const wordContainer = document.querySelector(".word-container .word");
const letterButtons = document.querySelectorAll(".letter");
const message = document.querySelector(".message");
const hangmanImage = document.querySelector(".hangman img");

// 게임 초기화 함수
function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = "_".repeat(selectedWord.length);
    attempts = 0;
    updateDisplay();
    resetButtons();
}

// 알파벳 버튼 활성화 함수
function resetButtons() {
    for (const button of letterButtons) {
        button.disabled = false;
    }
}

// 다시하기 버튼 생성 함수
function createReplayButton() {
    const replayButton = document.createElement("button");
    replayButton.textContent = "다시하기";
    replayButton.classList.add("replay-button");
    replayButton.addEventListener("click", () => {
        // 다시하기 버튼 클릭 시 게임 초기화
        initializeGame();
        const replayButtonElement = document.querySelector(".replay-button");
        if (replayButtonElement) {
            replayButtonElement.remove(); // 기존 다시하기 버튼 제거
        }
    });
    return replayButton;
}

// 게임 종료 함수
function endGame(messageText) {
    const messageElement = document.querySelector(".message");
    messageElement.textContent = messageText;
    messageElement.style.color = "red"; // 텍스트 색상을 빨간색으로 설정
    messageElement.style.fontWeight = "bold"; // 폰트 굵기를 두꺼운체로 설정
    // 기타 스타일 속성 설정 가능
    for (const button of letterButtons) {
        button.disabled = true;
    }
    // 다시하기 버튼 추가
    const replayButton = createReplayButton();
    message.appendChild(replayButton);
}

// 게임 상태 업데이트 함수
function updateDisplay() {
    wordContainer.textContent = guessedWord;
    message.textContent = `남은 시도: ${maxAttempts - attempts}`;
    hangmanImage.src = `hangman-${attempts}.jpg`; // 이미지 파일 이름에 따라 변경
}

// 알파벳 버튼 클릭 이벤트 핸들러
function letterButtonClick(event) {
    const letter = event.target.textContent;
    if (selectedWord.includes(letter)) {
        // 정답일 경우
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
            }
        }
        event.target.classList.add("correct"); // 버튼 클래스를 "correct"로 변경
        event.target.disabled = true; // 버튼 비활성화
    } else {
        // 오답일 경우
        attempts++;
    }

    if (attempts >= maxAttempts) {
        // 패배 조건
        message.textContent = "Game Over! 정답은 " + selectedWord + " 였습니다.";
        endGame("Do you want to replay?")
        for (const button of letterButtons) {
            button.disabled = true;
        }
    } else if (guessedWord === selectedWord) {
        // 승리 조건
        endGame("축하합니다! 정답을 맞췄습니다. 다시 하시겠습니까?");
        for (const button of letterButtons) {
            button.disabled = true;
        }
    } else {
        updateDisplay();
    }
}

// 알파벳 버튼에 클릭 이벤트 리스너 추가
for (const button of letterButtons) {
    button.addEventListener("click", letterButtonClick);
}

// 게임 초기화 및 첫 화면 업데이트
initializeGame();
updateDisplay();
