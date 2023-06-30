from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import (
    StaticFiles,
)  # astapi.staticfiles 이라는 라이브러리에서  StaticFiles 이걸 쓸께 라는 의미네


app = FastAPI()

answer = "KUMON"


# 클라이언트 요청시 정답을 알려주는
# 다음 단계는 서버 정답 요청시 받는 answer의 값과 js에 내장 되어 있는 정답의 값이 같은지 확인해봐야겠네?
@app.get("/answer")
def get_answer():
    return answer


app.mount(
    "/", StaticFiles(directory="static", html=True), name="static"
)  # 왜 staticfiles를 해야하지? 파일들을 가져와야하니깐 그렇지! 즉, 이걸 쓰면 어떤 경로에 어떤 html,css,java를 보여줄지 결정할 수 있음
