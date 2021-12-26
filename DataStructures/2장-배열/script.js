/**
 * 1번
 */
class Grade {
  $scores = [];

  constructor(scores) {
    this.$scores = scores;
  }

  setState(newState) {
    let newScores = [...this.$scores, newState];
    this.$scores = newScores;
  }

  // 점수 추가
  addScore(score) {
    this.setState(score);
  }

  // 평균 출력 함수
  getAverage() {
    let sum = 0;
    let average = 0;

    this.$scores.forEach((score) => (sum += score));
    average = sum / this.$scores.length;

    console.log(average);
  }
}

let grade = new Grade([10, 20, 30, 40]);
grade.addScore(50);
console.log("after add 50: ", grade.$scores);
grade.getAverage();
console.log("-------------------------------------");

/**
 * 2번
 */
const getArray = (array) => array;

const getArrayReverse = (array) => array.reverse();

console.log("array: ", getArray(grade.$scores));
console.log("reversed array: ", getArrayReverse(grade.$scores));
